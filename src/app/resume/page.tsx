"use client";

import dynamic from "next/dynamic";
import { resumeData } from "@/constants/resumeData";
import { ResumePDF } from "@/components/ResumePDF";
import { Download, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <span className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-white/5 text-white/50 rounded-full border border-white/10">
                Initializing PDF...
            </span>
        ),
    }
);

const skillLabels: Record<string, string> = {
    frontend: "FRONTEND",
    backend: "BACKEND",
    opsAndData: "OPS & DATA",
};

export default function ResumePage() {
    return (
        <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 text-white">
            {/* Header & Dynamic Download CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-8 mb-8">
                <div>
                    <p className="text-xs font-mono tracking-[0.3em] text-teal-400 uppercase mb-2">
                        SYS_DOC // RESUME_LATEST
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        {resumeData.name}
                    </h1>
                    <p className="text-base sm:text-lg text-white/70 mt-1">
                        {resumeData.title}
                    </p>
                </div>

                <PDFDownloadLink
                    document={<ResumePDF />}
                    fileName="Deepak_Pun_Resume.pdf"
                    className="inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition shrink-0"
                >
                    {({ loading }) => (
                        <>
                            <Download className="w-4 h-4" />
                            {loading ? "Building PDF..." : "Download PDF"}
                        </>
                    )}
                </PDFDownloadLink>
            </div>

            {/* Contact Metadata Strip (no redundant deepakpun.com link) */}
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs text-white/80 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-5 py-4 mb-10 font-mono">
                <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    {resumeData.contact.location}
                </span>
                <a
                    href={`mailto:${resumeData.contact.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-teal-400 transition"
                >
                    <Mail className="w-3.5 h-3.5 text-teal-400" />
                    {resumeData.contact.email}
                </a>
                <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-400" />
                    {resumeData.contact.phone}
                </span>
                <a
                    href={`https://${resumeData.contact.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal-400 transition underline underline-offset-4"
                >
                    {resumeData.contact.github}
                </a>
                <a
                    href={`https://${resumeData.contact.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal-400 transition underline underline-offset-4"
                >
                    {resumeData.contact.linkedin}
                </a>
            </div>

            {/* Summary */}
            <section className="mb-10">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-teal-400 mb-3">
                    01 // SUMMARY
                </h2>
                <p className="text-white/80 leading-relaxed">{resumeData.summary}</p>
            </section>

            {/* Technical Skills */}
            <section className="mb-10">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-teal-400 mb-4">
                    02 // TECHNICAL_SKILLS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(resumeData.skills).map(([key, items]) => (
                        <div
                            key={key}
                            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
                        >
                            <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-teal-400 uppercase mb-3">
                                {skillLabels[key] || key}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-white/5 text-white border border-white/10 px-3 py-1 rounded-full text-xs font-mono"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="mb-10">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-teal-400 mb-4">
                    03 // ENGINEERING_PROJECTS
                </h2>
                <div className="space-y-4">
                    {resumeData.projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                                <h3 className="font-bold text-lg text-white">{project.name}</h3>
                                {project.url !== "deepakpun.com" && (
                                    <a
                                        href={
                                            project.url.startsWith("http")
                                                ? project.url
                                                : `https://${project.url}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-mono text-teal-400 hover:underline"
                                    >
                                        {project.url}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                            <p className="text-xs font-mono text-white/50 mb-3">
                                Stack: {project.stack}
                            </p>
                            <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-white/80">
                                {project.highlights.map((bullet, bIdx) => (
                                    <li key={bIdx}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* AWS & Cloud Experience */}
            <section>
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-teal-400 mb-4">
                    04 // AWS_&_CLOUD_INFRASTRUCTURE
                </h2>
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-white/80">
                        {resumeData.cloudExperience.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
