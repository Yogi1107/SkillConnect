import React from "react";
import { useNavigate } from "react-router-dom";

const DemoSection = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-white py-16 px-6 md:px-20">

      <div className="w-full flex flex-col md:flex-row items-center gap-12">

        {/* 🎥 VIDEO */}
        <div className="w-full md:w-1/2 relative">

          <div className="absolute inset-0 bg-primary opacity-20 blur-2xl rounded-3xl"></div>

          <div className="relative rounded-3xl overflow-hidden border border-primary shadow-2xl backdrop-blur-lg">
            
            <video
              src="/demo.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full h-[260px] md:h-[350px] object-cover"
            />

          </div>
        </div>

        {/* 📝 CONTENT */}
        <div className="w-full md:w-1/2">

          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
            Build. Connect. Win Hackathons!
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            SkillConnect helps you discover hackathons, connect with talented developers,
            and form powerful teams. Whether you're a beginner or an expert, find your
            perfect collaborators and build impactful projects.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">Real-time team invites</div>
            <div className="flex items-center gap-2">Smart hackathon search</div>
            <div className="flex items-center gap-2">Developer connections</div>
            <div className="flex items-center gap-2">Live notifications</div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DemoSection;