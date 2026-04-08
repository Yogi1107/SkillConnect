import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    articles: [
      {
        title: "Creating your account",
        content: `To register on SkillConnect:
1. Navigate to /register.
2. Enter your Full Name, Email, and Password.
3. Paste your GitHub profile URL or username.
4. Click "Fetch" — SkillConnect will call the GitHub REST API and display your detected programming languages, roles, and avatar.
5. Review your detected skills, then click "Create Account".

You'll be redirected to /login. Your skill profile is permanent and visible on your Profile page.`,
      },
      {
        title: "Logging in and out",
        content: `Go to /login, enter your registered email and password, and click Login. On success you'll be redirected to the homepage and the navbar will show your profile icon and notification bell.

To log out, click the profile icon (top-right) and select "Logout". Your session is stored in localStorage, so it persists across tabs until you explicitly log out.`,
      },
      {
        title: "Understanding your role assignment",
        content: `During registration, SkillConnect analyses all your public GitHub repositories and aggregates byte-count statistics per programming language. These are then mapped to four developer roles:

• Frontend Developer — JavaScript, TypeScript, HTML, CSS
• Backend Developer — Python, Java, Node, Go, PHP
• ML / AI Engineer — Python, R, Julia
• UI / UX Designer — HTML, CSS

Your top role (highest percentage score) is displayed on your profile card and used by the Auto Match algorithm.`,
      },
    ],
  },
  {
    id: "hackathons",
    title: "Hackathons",
    articles: [
      {
        title: "Browsing and filtering hackathons",
        content: `Go to /explore-hackathons to see all available events. Use the filter controls to narrow results by:
• Text search (event name or description)
• Type — Online or Offline
• Location
• Date range

Click "Explore" on any card to open a detailed modal with the full event description, dates, and team size limit. Click "Register" to proceed to the team formation page for that hackathon.`,
      },
      {
        title: "Registering for a hackathon",
        content: `When you click "Register" on a hackathon card, you're taken to /discover/:hackathonId. To complete registration, you must either create a new team or join an existing one. Completing either action automatically registers you as a participant in the hackathon.`,
      },
    ],
  },
  {
    id: "teams",
    title: "Teams",
    articles: [
      {
        title: "Creating a team",
        content: `On the Discover page (/discover/:hackathonId), select the CREATE tab. Fill in:
• Team Name (required)
• Project Name
• Project Description
• Your Role (required — select from the dropdown)
• Max Members is pre-filled from the hackathon's setting and cannot be changed.

Click "Create Team & Register" to create the team and register for the hackathon in one step. Once created, you can invite teammates from the panel on the right.`,
      },
      {
        title: "Inviting teammates",
        content: `After creating a team, the Invite panel appears on the right of the CREATE tab. Switch between "My Network" (your connections only) and "All Users" tabs. Users are filtered to show roles that complement yours.

Click "Invite" next to any user to send them a team invite notification. They'll see it in their notification bell and can accept or decline.`,
      },
      {
        title: "Joining an existing team",
        content: `Switch to the JOIN tab on the Discover page. All open teams for this hackathon are listed with their description, required skills, and remaining spots.

Click "Join" to send a join request to the team creator. They'll receive a notification and can accept or decline your request. The Join button is disabled if the team is full or you're already a member.`,
      },
      {
        title: "Using Auto Match",
        content: `Click the "AUTO MATCH" button on the Discover page. The algorithm picks the best combination of available developers to form a balanced team, prioritising coverage of all four developer roles (Frontend, Backend, ML/AI, Designer). Results show a diversity score and a coverage map indicating which roles are filled.`,
      },
    ],
  },
  {
    id: "connections",
    title: "Connections",
    articles: [
      {
        title: "Sending a connection request",
        content: `Go to /explore to browse all registered developers. Use the search bar and role/skill filters to find developers you want to connect with. Click "Connect" on any user card.

The button changes to "Pending" while your request is awaiting a response. Once accepted, the developer appears in your connections list.`,
      },
      {
        title: "Accepting or declining requests",
        content: `When another user sends you a connection request, a red badge appears on the notification bell in the navbar. Click the bell to open the notification dropdown and use the Accept (✓) or Decline (✗) buttons. The notification is removed after you respond.`,
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    articles: [
      {
        title: "How notifications work",
        content: `SkillConnect polls for new notifications every 15 seconds automatically — you don't need to refresh the page. The bell icon shows a red badge with the count of pending notifications.

Three notification types exist:
• connection_request — someone wants to connect with you
• team_invite — someone invited you to join their team
• join_request — someone wants to join a team you created`,
      },
      {
        title: "Responding to a team invite",
        content: `Open the notification bell and find the team invite. Click Accept to be added to that team's member list, or Decline to dismiss. The notification is removed either way. You can then see the team on your Profile page under "Teams".`,
      },
    ],
  },
  {
    id: "profile",
    title: "Profile",
    articles: [
      {
        title: "What's on your profile?",
        content: `Your profile at /profile displays:
• Avatar and name sourced from GitHub
• Email address and connection count
• GitHub profile link
• Skills section — languages, frameworks, and domain areas
• Connections grid — all accepted connections
• Teams list — teams you've created or joined, with Creator/Member badge
• Hackathon Projects — events you've participated in`,
      },
    ],
  },
];

const Help = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [openArticle, setOpenArticle] = useState(0);

  const current = sections.find(s => s.id === activeSection);

  return (
    <div className="text-white min-h-screen">

      {/* ── HERO ── */}
      <section className="px-6 pt-14 pb-10 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3 font-primary">Help Centre</p>
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
          How can we <span className="text-primary">help?</span>
        </h1>
        <p className="text-gray-400 text-base max-w-xl">
          Everything you need to know about using SkillConnect — from creating your account
          to forming the perfect hackathon team.
        </p>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="px-6 pb-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {label: "Create an Account", to: "/register" },
            {label: "Browse Hackathons", to: "/explore-hackathons" },
            {label: "Contact Support", to: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 bg-base border border-muted rounded-xl px-5 py-4 hover:border-primary/50 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              <span className="ml-auto text-primary text-xs">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── DOCS LAYOUT ── */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar */}
          <nav className="md:w-52 shrink-0 flex md:flex-col gap-2 flex-wrap">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setOpenArticle(0); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors w-full
                  ${activeSection === s.id
                    ? "bg-primary text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                <span>{s.icon}</span>
                {s.title}
              </button>
            ))}
          </nav>

          {/* Article area */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
              <span>{current.icon}</span> {current.title}
            </h2>

            <div className="flex flex-col gap-3">
              {current.articles.map((article, i) => (
                <div key={i} className="bg-base border border-muted rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenArticle(openArticle === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition"
                  >
                    <span className="text-sm font-medium">{article.title}</span>
                    <span className={`text-primary text-lg transition-transform duration-200 shrink-0 ml-4 ${openArticle === i ? "rotate-45" : ""}`}>+</span>
                  </button>

                  {openArticle === i && (
                    <div className="px-5 pb-5 border-t border-muted pt-4">
                      {article.content.split('\n').map((line, j) => {
                        if (line.trim() === '') return <br key={j} />;
                        if (/^\d+\./.test(line.trim())) {
                          return (
                            <p key={j} className="text-sm text-gray-300 leading-relaxed pl-4 mb-1">
                              {line}
                            </p>
                          );
                        }
                        if (line.trim().startsWith('•')) {
                          return (
                            <p key={j} className="text-sm text-gray-300 leading-relaxed pl-4 mb-1">
                              <span className="text-primary mr-1">•</span>
                              {line.trim().slice(1).trim()}
                            </p>
                          );
                        }
                        return (
                          <p key={j} className="text-sm text-gray-300 leading-relaxed mb-2">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STILL STUCK ── */}
      <section className="px-6 py-14 bg-base/40 border-t border-muted text-center">
        <h2 className="text-xl font-bold font-heading mb-2">Still need help?</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
          Can't find what you're looking for? Reach out to our support team and we'll get back to you.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-primary text-black px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-80 transition"
        >
          Contact Support
        </Link>
      </section>

    </div>
  );
};

export default Help;