import React from 'react';

type ServiceStatus = 'operational' | 'degraded' | 'down';

interface AppNode {
    name: string;
    url: string;
    role: string;
    status: ServiceStatus;
    message: string;
    isCurrentHost?: boolean;
}

const SYSTEM_NODES: AppNode[] = [
    {
        name: 'deepakpun.com',
        url: 'https://deepakpun.com',
        role: 'Primary Portfolio & Control Plane',
        status: 'operational',
        message: 'All systems operational (Current Host)',
        isCurrentHost: true,
    },
    {
        name: 'notes.deepakpun.com',
        url: 'https://deepakpun.com',
        role: 'Astro + Vercel Docs & Lab Logs',
        status: 'operational',
        message: 'Static edge delivery operational',
    },
    {
        name: 'labs.deepakpun.com',
        url: 'https://deepakpun.com',
        role: 'MERN + Docker Microservices',
        status: 'degraded',
        message: 'UI service is buggy; core REST nodes healthy',
    },
];

const STATUS_STYLES: Record<
    ServiceStatus,
    { dot: string; badge: string; label: string }
> = {
    operational: {
        dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
        badge: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        label: 'OPERATIONAL',
    },
    degraded: {
        dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
        badge: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
        label: 'DEGRADED',
    },
    down: {
        dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]',
        badge: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
        label: 'OFFLINE',
    },
};

export default function SystemStatus() {
    return (
        <section className="w-full max-w-3xl font-mono text-zinc-200">
            {/* Header matching your LOGS_04.01 aesthetic */}
            <div className="mb-6 border-b border-zinc-800 pb-4">
                <p className="text-xs tracking-widest text-zinc-500 uppercase">
                    SYS_TELEMETRY // CLUSTER_HEALTH
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                    /sys/status
                </h2>
            </div>

            {/* Node List */}
            <div className="space-y-3">
                {SYSTEM_NODES.map((node) => {
                    const style = STATUS_STYLES[node.status];

                    return (
                        <div
                            key={node.name}
                            className="flex flex-col justify-between gap-3 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 sm:flex-row sm:items-center"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2.5">
                                    <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                                    <a
                                        href={node.url}
                                        target={node.isCurrentHost ? '_self' : '_blank'}
                                        rel="noreferrer"
                                        className="font-semibold text-zinc-100 hover:underline"
                                    >
                                        {node.name}
                                    </a>
                                    <span className="text-xs text-zinc-500">{'//'} {node.role}</span>
                                </div>

                                <p className="pl-5 text-sm text-zinc-400">
                                    <span className="text-zinc-600">&gt;</span> {node.message}
                                </p>
                            </div>

                            <div className="pl-5 sm:pl-0">
                                <span
                                    className={`inline-block rounded border px-2.5 py-1 text-[11px] font-medium tracking-wider ${style.badge}`}
                                >
                                    {style.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
