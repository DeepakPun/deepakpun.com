#!/bin/bash
set -e

# Get AWS Account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="us-east-1"
CLUSTER_NAME="portfolio-cluster"

echo "🚀 Setting up AWS ECS infrastructure for account: $ACCOUNT_ID"

# 1. Create ECS cluster
echo "📦 Creating ECS cluster..."
aws ecs create-cluster \
    --cluster-name $CLUSTER_NAME \
    --capacity-providers FARGATE \
    --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1 \
    --region $REGION

# 2. Create CloudWatch log group
echo "📊 Creating CloudWatch log group..."
aws logs create-log-group \
    --log-group-name "/ecs/portfolio-services" \
    --region $REGION || echo "Log group already exists"

# 3. Create IAM role for ECS task execution (if it doesn't exist)
echo "🔐 Setting up IAM roles..."
aws iam create-role \
    --role-name ecsTaskExecutionRole \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "ecs-tasks.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }' || echo "Role already exists"

# Attach the managed policy
aws iam attach-role-policy \
    --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy || echo "Policy already attached"

# 4. Create VPC and networking (basic setup)
echo "🌐 Creating VPC and networking..."
VPC_ID=$(aws ec2 create-vpc \
    --cidr-block 10.0.0.0/16 \
    --query 'Vpc.VpcId' \
    --output text)

aws ec2 create-tags \
    --resources $VPC_ID \
    --tags Key=Name,Value=portfolio-vpc

# Create Internet Gateway
IGW_ID=$(aws ec2 create-internet-gateway \
    --query 'InternetGateway.InternetGatewayId' \
    --output text)

aws ec2 attach-internet-gateway \
    --vpc-id $VPC_ID \
    --internet-gateway-id $IGW_ID

# Create subnets
SUBNET1_ID=$(aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.1.0/24 \
    --availability-zone ${REGION}a \
    --query 'Subnet.SubnetId' \
    --output text)

SUBNET2_ID=$(aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.2.0/24 \
    --availability-zone ${REGION}b \
    --query 'Subnet.SubnetId' \
    --output text)

# Create route table and routes
ROUTE_TABLE_ID=$(aws ec2 create-route-table \
    --vpc-id $VPC_ID \
    --query 'RouteTable.RouteTableId' \
    --output text)

aws ec2 create-route \
    --route-table-id $ROUTE_TABLE_ID \
    --destination-cidr-block 0.0.0.0/0 \
    --gateway-id $IGW_ID

aws ec2 associate-route-table \
    --subnet-id $SUBNET1_ID \
    --route-table-id $ROUTE_TABLE_ID

aws ec2 associate-route-table \
    --subnet-id $SUBNET2_ID \
    --route-table-id $ROUTE_TABLE_ID

# Create security group
SECURITY_GROUP_ID=$(aws ec2 create-security-group \
    --group-name portfolio-sg \
    --description "Security group for portfolio services" \
    --vpc-id $VPC_ID \
    --query 'GroupId' \
    --output text)

# Add inbound rules
aws ec2 authorize-security-group-ingress \
    --group-id $SECURITY_GROUP_ID \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
    --group-id $SECURITY_GROUP_ID \
    --protocol tcp \
    --port 3000 \
    --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
    --group-id $SECURITY_GROUP_ID \
    --protocol tcp \
    --port 3001 \
    --cidr 0.0.0.0/0

echo "✅ AWS infrastructure setup complete!"
echo "📝 Important values:"
echo "   Account ID: $ACCOUNT_ID"
echo "   VPC ID: $VPC_ID"
echo "   Subnet 1: $SUBNET1_ID"
echo "   Subnet 2: $SUBNET2_ID"
echo "   Security Group: $SECURITY_GROUP_ID"
echo ""
echo "🔐 Next step: Store your MongoDB URI in Parameter Store:"
echo "aws ssm put-parameter --name '/portfolio/db-uri' --value 'your-mongodb-connection-string' --type 'SecureString' --region $REGION"