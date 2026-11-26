'use client';

import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { SYSTEM_NODES, ServiceStatus } from '@/constants/systemstatus';

const STATUS_STYLES: Record<
    ServiceStatus,
    { dot: string; badge: string; label: string }
> = {
    operational: {
        dot: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]',
        badge: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/80',
        label: 'OPERATIONAL',
    },
    degraded: {
        dot: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]',
        badge: 'text-amber-300 border-amber-500/40 bg-amber-950/80',
        label: 'DEGRADED',
    },
    down: {
        dot: 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.7)]',
        badge: 'text-rose-300 border-rose-500/40 bg-rose-950/80',
        label: 'OFFLINE',
    },
};

export default function StatusPage() {
    const [showNotice, setShowNotice] = useState(true);

    return (
        <main className="relative z-10 mx-auto w-full max-w-4xl px-4 py-12 font-mono text-slate-100">
            {/* Page Header */}
            <div className="mb-6 border-b border-slate-800/80 pb-5">
                <p className="text-xs font-medium tracking-widest text-slate-400 uppercase">
                    SYS_TELEMETRY // CLUSTER_HEALTH
                </p>
                <h1 className="mt-1.5 text-3xl font-semibold text-white">
                    /sys/status
                </h1>
            </div>

            {/* Dismissible Sample Data Alert */}
            {showNotice && (
                <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-sky-500/35 bg-slate-950/90 px-4 py-3.5 text-sm text-slate-200 shadow-lg backdrop-blur-md">
                    <div className="flex items-start gap-3">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                        <p className="leading-relaxed">
                            <span className="font-semibold text-sky-300">[SAMPLE_DATA]</span>{' '}
                            Displaying static v1 status entries and engineering backlog notes. Live{' '}
                            <code className="rounded border border-sky-500/30 bg-sky-950/80 px-1.5 py-0.5 text-xs text-sky-200">
                                /health
                            </code>{' '}
                            polling is scheduled for the next release.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowNotice(false)}
                        aria-label="Dismiss notice"
                        className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Node Cards */}
            <div className="space-y-4">
                {SYSTEM_NODES.map((node) => {
                    const style = STATUS_STYLES[node.status];

                    return (
                        <div
                            key={node.name}
                            className="rounded-xl border border-slate-800 bg-slate-950/85 p-6 shadow-xl backdrop-blur-md transition-colors hover:border-slate-700"
                        >
                            {/* Row 1: Status Indicator + App Name (Left) & Status Badge (Right) */}
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={`h-3 w-3 shrink-0 rounded-full ${style.dot}`} />
                                    <a
                                        href={node.url}
                                        target={node.isCurrentHost ? '_self' : '_blank'}
                                        rel="noreferrer"
                                        className="text-lg font-semibold text-white hover:text-sky-300 hover:underline"
                                    >
                                        {node.name}
                                    </a>
                                    <span className="text-sm text-slate-400">{'//'} {node.role}</span>
                                </div>

                                <span
                                    className={`shrink-0 rounded border px-3 py-1 text-xs font-semibold tracking-wider ${style.badge}`}
                                >
                                    {style.label}
                                </span>
                            </div>
                            <p className="mt-2 flex items-center gap-2 pl-6 text-sm">
                                <span aria-hidden="true" className="shrink-0 text-sky-500/70">
                                    ↳
                                </span>
                                <code className="max-w-full truncate rounded-md border border-sky-500/20 bg-sky-950/30 px-2 py-0.5 text-[13px] text-sky-300">
                                    <a
                                        href={node.url}
                                        target={node.isCurrentHost ? '_self' : '_blank'}
                                        rel="noreferrer"
                                        className=""
                                    >{node.url}</a>
                                </code>
                                <span
                                    aria-hidden="true"
                                    className="hidden h-px flex-1 bg-linear-to-r from-slate-800 to-transparent sm:block"
                                />
                            </p>

                            {/* Row 2: Status Message / Description */}
                            <p className="mt-3 pl-6 text-base text-slate-200">
                                <span className="mr-2 text-slate-500">&gt;</span>
                                {node.message}
                            </p>

                            {/* Row 3: Pending Patches / Dev Notes */}
                            {node.improvements && node.improvements.length > 0 && (
                                <div className="mt-4 ml-6 rounded-lg border border-slate-800/90 bg-[#020617]/95 p-4">
                                    <p className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        PENDING_PATCHES // DEV_NOTES
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        {node.improvements.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <span className="font-semibold text-amber-400">[ ]</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
