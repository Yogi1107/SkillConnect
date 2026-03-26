import React from "react";

const Profile = () => {

  const user = {
    name: "Yogiraj Bhilare",
    email: "yogirajbhilare1107@gmail.com",
    githubId: "Yogi1107",
    avatar: "https://github.com/yogiraj.png",
    skills: {
      languages: ["Python", "JavaScript"],
      frameworks: ["Flask", "React"],
      domains: ["AI", "Web"]
    },
    teams: [
      { name: "AI Innovators", status: "Current" },
      { name: "Web Wizards", status: "Past" }
    ],
    projects: [
      {
        title: "AI Resume Analyzer",
        hackathon: "HackAI 2025",
        description: "Analyzes resumes using NLP.",
      },
      {
        title: "Smart Task Manager",
        hackathon: "CodeSprint",
        description: "AI-powered productivity app.",
      }
    ]
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto font-primary">

      {/* 🔥 TOP PROFILE */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-base p-6 rounded-2xl shadow-lg border border-gray-700">

        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-primary"
        />

        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400">{user.email}</p>

          <a
            href={`https://github.com/${user.githubId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            GitHub: {user.githubId}
          </a>
        </div>
      </div>

      {/* 🔥 SKILLS */}
      <div className="mt-6 bg-base p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {[...user.skills.languages, ...user.skills.frameworks, ...user.skills.domains].map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-primary/20 border border-primary rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 🔥 TEAMS */}
      <div className="mt-6 bg-base p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Teams</h2>

        {user.teams.length > 0 ? (
          <div className="flex flex-col gap-3">
            {user.teams.map((team, i) => (
              <div
                key={i}
                className="flex justify-between p-3 border border-gray-600 rounded-lg"
              >
                <span>{team.name}</span>
                <span className={`text-sm ${team.status === "Current" ? "text-green-400" : "text-gray-400"}`}>
                  {team.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No teams joined yet</p>
        )}
      </div>

      {/* 🔥 PROJECTS */}
      <div className="mt-6 bg-base p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Hackathon Projects</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {user.projects.map((project, i) => (
            <div
              key={i}
              className="p-4 border border-gray-600 rounded-xl hover:border-primary transition"
            >
              <h3 className="text-lg font-semibold text-primary">
                {project.title}
              </h3>

              <p className="text-sm text-gray-400">
                {project.hackathon}
              </p>

              <p className="text-sm mt-2">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;