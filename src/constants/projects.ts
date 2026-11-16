export type ProjectType = "Full-Stack" | "DevOps" | "Frontend" | "Backend API";

export const PROJECT_TYPE_STYLES: Record<ProjectType, string> = {
    "Full-Stack": "bg-blue-500/10 text-blue-300 border-blue-400/20",
    "DevOps": "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
    "Frontend": "bg-purple-500/10 text-purple-300 border-purple-400/20",
    "Backend API": "bg-amber-500/10 text-amber-300 border-amber-400/20",
};

export interface CourseProject {
    id: string;
    title: string;
    type: ProjectType;
    description: string;
    liveUrl: string;
    githubUrl: string;
    tags?: string[];
}

export const COURSE_PROJECTS: CourseProject[] = [
    {
        id: "yelpcamp",
        title: "YelpCamp",
        type: "Full-Stack",
        description:
            "Campgrounds review platform featuring user authentication, interactive maps, and cloud image uploads.",
        liveUrl: "https://yelpcamp.deepakpun.com",
        githubUrl: "https://github.com/DeepakPun/YelpCamp",
        tags: ["Node.js", "Express", "MongoDB", "EJS"],
    },
];
