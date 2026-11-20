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
        liveLink: "https://www.labs.deepakpun.com",
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
    },
    // Template for Capstone 02+ (No liveLink — promotes "How I Did It" to primary CTA):
    // {
    //     id: "capstone-02",
    //     capstoneNumber: "02",
    //     tier: "scaled",
    //     highlightText: "Infrastructure as Code & Security",
    //     title: "Cloud Cluster Ops",
    //     summary:
    //         "Leveling up to automated Kubernetes orchestration, Terraform provisioning, and shift-left security scanning.",
    //     docsLink: "https://deepakpun.com",
    //     docsLabel: "How I Did It",
    //     githubLink: "https://github.com...",
    //     finopsNote: "Cluster torn down post-validation (FinOps)",
    //     techStack: ["Terraform", "AWS EKS", "GitHub Actions", "Trivy", "ArgoCD"],
    //     status: "ARCHIVED_FINOPS",
    // },
];
