import { CAPSTONE_PROJECTS } from "./capstones";

const capstoneProjects = CAPSTONE_PROJECTS.filter(
    (project) => project.resumeHighlights && project.resumeHighlights.length > 0
).map((project) => {
    const rawUrl = project.liveLink || project.docsLink || project.githubLink || "deepakpun.com";
    const cleanUrl = rawUrl.replace(/^https?:\/\//, "").replace(/\.git$/, "");

    return {
        name: `${project.title} (Capstone ${project.capstoneNumber})`,
        url: cleanUrl,
        stack: project.techStack.join(", "),
        highlights: project.resumeHighlights!,
    };
});

export const resumeData = {
    name: "DEEPAK PUN",
    title: "Full-Stack Developer & Cloud / DevOps Engineer",
    contact: {
        email: "iamdeepakpoon@gmail.com",
        location: "Parkville, MD",
        website: "deepakpun.com",
        linkedin: "www.linkedin.com/in/mrpun",
        github: "www.github.com/DeepakPun",
    },
    summary:
        "Hands-on Full-Stack Developer and Cloud/DevOps Engineer passionate about building, containerizing, and deploying resilient web applications with minimal downtime. Experienced across the full stack (React, Next.js, Node.js, MongoDB) and cloud infrastructure (Docker, GitHub Actions CI/CD, AWS, Linux). Seeking a Junior Full-Stack, DevOps, or Cloud Engineer role to deliver scalable software and reliable systems.",
    skills: {
        frontend: [
            "Next.js",
            "React",
            "Tailwind",
            "TypeScript",
            "JavaScript",
            "Bulma",
            "Bootstrap",
        ],
        backend: ["Node.js", "Express", "REST API", "EJS"],
        opsAndData: [
            "MongoDB",
            "AWS",
            "GH Actions",
            "Docker",
            "Docker Compose",
            "Linux CLI",
            "Nginx",
            "Git / GitHub",
        ],
    },
    projects: [
        ...capstoneProjects,
        {
            name: "DeepakPun.com – Personal Portfolio",
            url: "deepakpun.com",
            stack: "Next.js, TypeScript, Tailwind CSS, AWS Route53, Vercel",
            highlights: [
                "Designed, developed, and deployed a responsive developer portfolio using Next.js and Tailwind CSS.",
                "Configured custom domain routing, DNS records, and SSL certificates via AWS Route53.",
            ],
        },
        {
            name: "DeepakPun Notes – Technical Markdown Notes",
            url: "notes.deepakpun.com",
            stack: "Astro, Markdown, GitHub, Vercel",
            highlights: [
                "Built a fast, static Markdown technical note app using Astro with automated Git-push deployments via Vercel.",
            ],
        },
    ],
    cloudExperience: [
        "Provisioned, secured (IAM, Security Groups), and configured AWS EC2 Linux instances in hands-on labs while preparing for the AWS Certified Solutions Architect – Associate (SAA-C03).",
        "Created and managed AWS S3 buckets with bucket policies, versioning, and static website hosting configurations.",
        "Configured AWS Route53 hosted zones, DNS records, and custom domain routing alongside SSL/TLS management for live portfolio projects.",
        "Implemented AWS CloudWatch billing alarms and cost-monitoring budgets to track usage and prevent unexpected cloud spend.",
    ],
};
