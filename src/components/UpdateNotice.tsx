'use client';

import { useState } from 'react';

interface UpdateNoticeProps {
    updates?: string | string[];
}

export default function UpdateNotice({ updates }: UpdateNoticeProps) {
    const [isVisible, setIsVisible] = useState(true);

    const isEmpty =
        !updates ||
        (Array.isArray(updates) && updates.length === 0) ||
        (typeof updates === 'string' && updates.trim() === '');

    if (!isVisible || isEmpty) return null;

    // Normalize string or array into an array so we always render a clean list
    const updateList = Array.isArray(updates) ? updates : [updates];

    return (
        <div
            role="status"
            className="bg-slate-900 text-slate-100 border-b border-slate-800 px-4 py-3.5 text-sm"
        >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Left side: Status badge + List */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="font-semibold text-amber-300 tracking-wide text-xs uppercase">
                            Quick Status Notes
                        </span>
                    </div>

                    <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                        {updateList.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side: Explicit dismiss button */}
                <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className="self-end sm:self-start inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 rounded px-2.5 py-1 transition-colors shrink-0"
                    aria-label="Dismiss status notes"
                >
                    <span>Click</span>
                    <span className="text-sm font-bold leading-none text-slate-200">&times;</span>
                    <span>to dismiss</span>
                </button>
            </div>
        </div>
    );
}
