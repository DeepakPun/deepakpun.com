// src/constants/capstones.ts
export type CapstoneTier = "foundation" | "scaled" | "flagship";

export interface CapstoneProject {
    id: string;
    capstoneNumber: string;
    tier: CapstoneTier;
    highlightText: string;
    title: string;
    summary: string;
    liveLink?: string;
    liveLabel?: string;
    docsLink?: string;
    docsLabel?: string;
    githubLink?: string;
    finopsNote?: string;
    techStack: string[];
    status: "LIVE" | "ARCHIVED_FINOPS" | "IN_PROGRESS";
    resumeHighlights?: string[];
}

export const CAPSTONE_PROJECTS: CapstoneProject[] = [
    {
        id: "capstone-01",
        capstoneNumber: "01",
        tier: "foundation",
        highlightText: "Foundation // First Deployment",
        title: "Multiverse Labs",
        summary:
            "My first hands-on multi-service environment—built to get my feet wet with container virtualization, automated pipeline assertions, and decoupled architecture.",
        liveLink: "https://labs.deepakpun.com",
        liveLabel: "Launch Live Sandbox",
        docsLink: "https://notes.deepakpun.com/notes/en/microservices-architecture/",
        docsLabel: "How I Did It",
        githubLink: "https://github.com/DeepakPun/labs.deepakpun.com",
        techStack: [
            "Docker Microservices",
            "MongoDB Atlas",
            "Vitest & Supertest",
            "DigitalOcean",
            "CI/CD",
        ],
        status: "LIVE",
        resumeHighlights: [
            "Architected a decoupled microservices platform (Next.js UI, Node.js + Express REST APIs, MongoDB) containerized with Docker and Docker Compose.",
            "Engineered automated GitHub Actions CI/CD pipelines with Vitest & Supertest integration checks to block broken endpoints before deployment.",
            "Provisioned and administered a DigitalOcean Linux Droplet with Nginx reverse proxy, SSL termination, and automated container rollouts.",
        ],
    },
    {
        id: "capstone-02",
        capstoneNumber: "02",
        tier: "scaled",
        highlightText: "Serverless // AWS Cloud",
        title: "Serverless Full-Stack",
        summary:
            "A decoupled React and Express REST architecture deployed natively on AWS—combining private S3 storage, CloudFront edge routing, AWS Amplify CI/CD, and Lambda + API Gateway with strict IAM and CORS controls, followed by a full FinOps teardown.",
        docsLink: "https://notes.deepakpun.com/notes/en/aws-serverless-fullstack/",
        docsLabel: "How I Did It",
        githubLink: "https://github.com/DeepakPun/aws-fullstack-dep.git",
        techStack: [
            "AWS Lambda & API Gateway",
            "S3 & CloudFront (OAC)",
            "AWS Amplify CI/CD",
            "IAM & CORS",
            "React & Express",
        ],
        status: "ARCHIVED_FINOPS",
        resumeHighlights: [
            "Deployed a serverless Express.js REST API on AWS Lambda behind Amazon API Gateway (HTTP API) with least-privilege IAM execution roles.",
            "Secured a private S3 static React frontend behind Amazon CloudFront using Origin Access Control (OAC) and a custom CloudFront edge rewrite function.",
            "Configured AWS Amplify CI/CD, synchronized strict cross-origin (CORS) policies across API Gateway and Express, and executed a full FinOps teardown ($0.00 post-verification).",
        ],
    },
];
