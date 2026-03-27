import React from "react";
import { motion } from "framer-motion";

const StepsSection = () => {

  const steps = [
    { id: 1, title: "Create Profile", desc: "Sign up and build your developer profile." },
    { id: 2, title: "Explore Hackathons", desc: "Find hackathons matching your skills." },
    { id: 3, title: "Connect", desc: "Invite developers and form teams." },
    { id: 4, title: "Build", desc: "Collaborate and create projects." },
  ];

  return (
    <div className="w-full bg-black text-white py-16 px-4 md:px-20">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">
          Get Started in 4 Simple Steps
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Your journey with SkillConnect made easy
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">

        {/* 🔥 Animated Dashed Line (ONLY DESKTOP) */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="hidden md:block absolute top-6 left-0 h-[2px] border-t-2 border-dashed border-primary"
        />

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center"
            >

              {/* 🔢 Circle with Pulse */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-black font-bold z-10 shadow-[0_0_15px_#00f5d4]"
              >
                {step.id}
              </motion.div>

              {/* Content */}
              <h3 className="mt-4 text-base md:text-lg font-semibold text-primary">
                {step.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-400 mt-2 max-w-[220px]">
                {step.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default StepsSection;