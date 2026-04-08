import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const stats = [
    { value: "5", label: "Core Modules" },
    { value: "4", label: "Developer Roles" },
    { value: "15s", label: "Notification Polling" },
    { value: "100%", label: "GitHub-Verified Skills" },
];

const modules = [
    {
        title: "Authentication",
        desc: "Registration with automatic GitHub skill analysis. Roles and language proficiency are derived from actual repository data — no self-reporting.",
    },
    {
        title: "Hackathon Discovery",
        desc: "Browse, filter by type or location, and register for hackathons. View rich modal pop-ups with event details and team size limits.",
    },
    {
        title: "Explore Developers",
        desc: "Discover all registered developers with role and skill filters. Send connection requests and build a hackathon-focused network.",
    },
    {
        title: "Teams & Discover",
        desc: "Create or join teams for a specific hackathon. Invite teammates from your connections or use Auto Match for AI-powered team formation.",
    },
    {
        title: "Profile",
        desc: "View your own skills, connections, teams, and hackathon projects — all sourced from your GitHub activity and platform interactions.",
    },
    {
        title: "Notifications",
        desc: "Real-time connection-request and team-invite management via 15-second polling. Accept or decline directly from the navbar bell.",
    },
];

const roles = [
    { role: "Frontend Developer", langs: ["JavaScript", "TypeScript", "HTML", "CSS"] },
    { role: "Backend Developer", langs: ["Python", "Java", "Node", "Go", "PHP"] },
    { role: "ML / AI Engineer", langs: ["Python", "R", "Julia"] },
    { role: "UI / UX Designer", langs: ["HTML", "CSS"] },
];

const stack = [
    { layer: "Frontend", tech: "React.js 18 + React Router DOM v6" },
    { layer: "Styling", tech: "Tailwind CSS" },
    { layer: "HTTP", tech: "Axios + Fetch API" },
    { layer: "Backend", tech: "Node.js 20 + Express.js" },
    { layer: "Database", tech: "MongoDB Atlas" },
    { layer: "Auth", tech: "bcrypt + localStorage session" },
    { layer: "GitHub", tech: "REST API v3 (language stats)" },
];

const About = () => {
    const lineRef = useRef(null);

    useEffect(() => {
        const el = lineRef.current;
        if (!el) return;
        el.style.width = '0';
        requestAnimationFrame(() => {
            el.style.transition = 'width 1.2s cubic-bezier(0.16,1,0.3,1)';
            el.style.width = '100%';
        });
    }, []);

    return (
        <div className="text-white min-h-screen">

            {/* ── HERO ── */}
            <section className="relative px-6 pt-16 pb-20 overflow-hidden">
                {/* faint grid backdrop */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'linear-gradient(var(--color-primary,#a3e635) 1px,transparent 1px),linear-gradient(90deg,var(--color-primary,#a3e635) 1px,transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                <div className="relative max-w-5xl mx-auto">
                    <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4 font-primary">
                        About SkillConnect
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-4">
                        The home for<br />
                        <span className="text-primary">hackathon teams.</span>
                    </h1>
                    {/* animated underline */}
                    <div ref={lineRef} className="h-[2px] bg-primary mb-8" style={{ width: 0 }} />

                    <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                        SkillConnect is a full-stack web application that serves as a centralised platform
                        for hackathon discovery, developer profiling, team formation, and connection
                        management. We automatically analyse your GitHub repositories to infer real
                        skills — so teams form on complementary competencies, not personal networks alone.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/explore-hackathons"
                            className="bg-primary text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-80 transition"
                        >
                            Browse Hackathons
                        </Link>
                        <Link
                            to="/register"
                            className="border border-primary text-primary px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary hover:text-black transition"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="border-y border-muted px-6 py-8">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <p className="text-3xl font-bold text-primary font-heading">{s.value}</p>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── WHY SKILLCONNECT ── */}
            <section className="px-6 py-16 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold font-heading mb-2">Why SkillConnect?</h2>
                <p className="text-gray-400 text-sm mb-8 max-w-xl">
                    Before platforms like SkillConnect, hackathon participants had no reliable way to
                    find verified, complementary teammates. Existing approaches share a fundamental gap —
                    they do not verify skills objectively and treat team formation as an afterthought.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Manually browsing LinkedIn or Twitter for developers with matching skill sets.",
                        "Joining Discord/Slack communities and posting availability announcements.",
                        "Platforms like Devpost offer event listings but limited teammate-matching.",
                        "Word-of-mouth referrals within colleges — restricting diversity.",
                        "Self-reported skills with no verification, leading to inflated profiles.",
                        "No automated role assignment based on actual code contributions.",
                    ].map((pain, i) => (
                        <div key={i} className="flex gap-3 bg-base border border-muted rounded-lg p-4">
                            <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                            <p className="text-sm text-gray-300">{pain}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MODULES ── */}
            <section className="px-6 py-16 bg-base/40 border-y border-muted">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold font-heading mb-2">Platform Modules</h2>
                    <p className="text-gray-400 text-sm mb-10">Six integrated modules power the full hackathon lifecycle.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {modules.map((m) => (
                            <div
                                key={m.title}
                                className="bg-base border border-muted rounded-xl p-5 hover:border-primary/60 transition-colors duration-200"
                            >
                                <span className="text-2xl mb-3 block">{m.icon}</span>
                                <h3 className="font-semibold text-sm mb-2">{m.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW ROLES ARE ASSIGNED ── */}
            <section className="px-6 py-16 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold font-heading mb-2">How Roles Are Assigned</h2>
                <p className="text-gray-400 text-sm mb-8 max-w-xl">
                    During registration, SkillConnect fetches all your public repositories via the
                    GitHub REST API v3, aggregates byte-count language statistics, and maps them to
                    one of four developer roles automatically.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {roles.map((r) => (
                        <div key={r.role} className="bg-base border border-muted rounded-xl p-5">
                            <h3 className="font-semibold text-sm mb-3 text-primary">{r.role}</h3>
                            <div className="flex flex-wrap gap-2">
                                {r.langs.map((l) => (
                                    <span key={l} className="text-[11px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                                        {l}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TECH STACK ── */}
            <section className="px-6 py-16 bg-base/40 border-y border-muted">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold font-heading mb-2">Technology Stack</h2>
                    <p className="text-gray-400 text-sm mb-8">
                        Built on a modern, production-grade stack — all open-source, all free to deploy.
                    </p>

                    <div className="divide-y divide-muted border border-muted rounded-xl overflow-hidden">
                        {stack.map((s, i) => (
                            <div key={i} className="flex items-center gap-4 px-5 py-3 bg-base hover:bg-white/[0.02] transition">
                                <span className="text-xs text-gray-500 w-24 shrink-0 uppercase tracking-wider">{s.layer}</span>
                                <span className="text-sm text-white">{s.tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 py-20 text-center">
                <h2 className="text-3xl font-bold font-heading mb-4">
                    Ready to build your <span className="text-primary">winning team?</span>
                </h2>
                <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
                    Join SkillConnect, connect your GitHub, and let us find the perfect teammates for your next hackathon.
                </p>
                <Link
                    to="/register"
                    className="inline-block bg-primary text-black px-8 py-3 rounded-lg font-semibold text-sm hover:opacity-80 transition"
                >
                    Get Started — It's Free
                </Link>
            </section>

        </div>
    );
};

export default About;