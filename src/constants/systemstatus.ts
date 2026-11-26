export type ServiceStatus = 'operational' | 'degraded' | 'down';
// Main deployed applications to watch out for
// 1. deepakpun.com          ==> Main
// 2. labs.deepakpun.com     ==> Labs
// 3. notes.deepakpun.com    ==> Static notes
// 4. yelpcamp.deepakpun.com ==> Full stack bootcamp course project

export interface AppNode {
    name: string;
    url: string;
    role: string;
    status: ServiceStatus;
    message: string;
    isCurrentHost?: boolean;
    improvements?: string[];
}

export const SYSTEM_NODES: AppNode[] = [
    {
        name: 'Main Portfolio',
        url: 'https://deepakpun.com',
        role: 'Primary Portfolio & Control Plane',
        status: 'operational',
        message: 'All systems operational (Current Host)',
        isCurrentHost: true,
        improvements: [
            'Automate live /health polling via Next.js Route Handler',
        ],
    },
    {
        name: 'Static notes',
        url: 'https://notes.deepakpun.com',
        role: 'Astro + Vercel Docs & Lab Logs',
        status: 'operational',
        message: 'Static edge delivery operational',
    },
    {
        name: 'Multiverse Labs',
        url: 'https://labs.deepakpun.com',
        role: 'Next, Express, Mongo, Docker Micro services',
        status: 'degraded',
        message: 'UI service is buggy; core REST nodes healthy',
        improvements: [
            'Implement authentication & authorization using bcrypt.js and jsonwebtoken (JWT)',
            'Fix frontend state sync bug in UI microservice',
        ],
    },
];
