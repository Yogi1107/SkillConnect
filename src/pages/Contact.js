import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "How does SkillConnect verify my skills?",
    a: "During registration, we fetch all your public GitHub repositories via the GitHub REST API v3 and aggregate byte-count language statistics. These are then mapped to developer roles (Frontend, Backend, ML/AI, UI/UX) with percentage scores — no self-reporting required.",
  },
  {
    q: "Is my GitHub data stored permanently?",
    a: "Yes. Language stats, role percentages, and your avatar URL are stored in MongoDB Atlas at registration time. You can view your full profile from the Profile page at any time.",
  },
  {
    q: "How do team invites and notifications work?",
    a: "Notifications are fetched from our server every 15 seconds and appear in the navbar bell icon. You can accept or decline connection requests and team invites directly from the dropdown — no page refresh needed.",
  },
  {
    q: "Can I host my own hackathon on SkillConnect?",
    a: "Yes! Visit the Host page to register an organiser account. Once registered, you can create and manage hackathon events, set team size limits, and track participant registrations.",
  },
  {
    q: "What is Auto Match?",
    a: "Auto Match uses a greedy algorithm to build a team of complementary developers. It scores candidates based on role diversity (filling gaps in Frontend, Backend, ML/AI, and Design coverage) and skill strength derived from GitHub analysis.",
  },
];

const contactCards = [
  {
    title: "Questions for a specific hackathon",
    desc: "Have questions about registration, judging, or prizes for a particular event? Reach out to the hackathon manager directly.",
    action: { label: "Contact hackathon manager", href: "#", external: true },
  },
  {
    title: "General customer support",
    desc: "For account issues, notification bugs, GitHub analysis errors, or any other platform questions, visit our support portal.",
    action: { label: "Visit support portal", href: "#", external: true },
  },
  {
    title: "Hosting a public hackathon",
    desc: "Want to run a hackathon on SkillConnect? Register as a host and get access to event creation and participant management tools.",
    action: { label: "Host a hackathon", to: "/host", external: false },
  },
  {
    title: "Internal company hackathons",
    desc: "Running a private, company-internal event? Request a demo and we'll walk you through the enterprise setup options.",
    action: { label: "Request a demo", href: "#", external: true },
  },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="text-white min-h-screen">

      {/* ── HERO ── */}
      <section className="px-6 pt-14 pb-12 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3 font-primary">
          Support &amp; Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
          How can we <span className="text-primary">help you?</span>
        </h1>
        <p className="text-gray-400 text-base max-w-xl leading-relaxed">
          Whether you have a question about a hackathon, need technical support, or want to
          host your own event — we're here to point you in the right direction.
        </p>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="bg-base border border-muted rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors duration-200"
            >
              <span className="text-3xl">{card.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-2 leading-snug">{card.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
              {card.action.external ? (
                <a
                  href={card.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-primary text-black px-4 py-2 rounded-lg text-center text-xs font-semibold hover:opacity-80 transition"
                >
                  {card.action.label}
                </a>
              ) : (
                <Link
                  to={card.action.to}
                  className="block bg-primary text-black px-4 py-2 rounded-lg text-center text-xs font-semibold hover:opacity-80 transition"
                >
                  {card.action.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-16 bg-base/40 border-y border-muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-heading mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm mb-8">
            Quick answers to the most common questions about SkillConnect.
          </p>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-base border border-muted rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-white/[0.02] transition"
                >
                  <span className="text-sm font-medium">{faq.q}</span>
                  <span className={`text-primary text-lg transition-transform duration-200 shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed border-t border-muted pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-xl font-bold font-heading mb-2">Still exploring?</h2>
        <p className="text-gray-400 text-sm mb-8">Jump to the section that's most relevant for you.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Browse Hackathons", to: "/explore-hackathons" },
            { label: "Explore Developers", to: "/explore" },
            { label: "About SkillConnect", to: "/about" },
            { label: "Host an Event", to: "/host" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="border border-primary text-primary px-5 py-2 rounded-lg text-xs font-semibold hover:bg-primary hover:text-black transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Contact;