#!/bin/bash
set -e

# Configuration
CLUSTER_NAME="portfolio-cluster"
REGION="us-east-1"
VPC_NAME="portfolio-vpc"

echo "🚀 Setting up AWS ECS infrastructure..."

# Create ECS cluster
aws ecs create-cluster \
    --cluster-name $CLUSTER_NAME \
    --capacity-providers FARGATE \
    --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1 \
    --region $REGION

echo "✅ ECS cluster created: $CLUSTER_NAME"
echo "🎉 Ready for deployment!"