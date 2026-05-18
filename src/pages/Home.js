import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextType from "../animations/TextType.js";
import Modal from "../components/Modal.js";
import DemoSection from "../components/DemoSection.js";
import StepSection from "../components/StepSection.js";
import axios from "axios";

const API_URL = process.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate();

  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);

  // Filters
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [hackathon, setHackathon] = useState(null);

  const [index, setIndex] = useState(0);

  // Fetch hackathons (ONLY ONCE)
  useEffect(() => {
    fetch(`${API_URL}/api/hackathons`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.data.sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );

        const limited = sorted.slice(0, 3);

        setHackathons(limited);
        setFilteredHackathons(limited);
      })
      .catch((err) => console.error(err));
  }, []);

  // Carousel auto change
  useEffect(() => {
    if (hackathons.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hackathons.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hackathons]);

  // Apply Filters
  useEffect(() => {
    let temp = [...hackathons];

    if (selectedMode) {
      temp = temp.filter(
        (event) =>
          event.mode?.toLowerCase() === selectedMode.toLowerCase()
      );
    }

    if (selectedType) {
      temp = temp.filter(
        (event) =>
          event.type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    if (selectedLocation) {
      temp = temp.filter((event) =>
        event.location
          ?.toLowerCase()
          .includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedDate) {
      temp = temp.filter((event) => {
        return (
          new Date(event.startDate).toDateString() ===
          new Date(selectedDate).toDateString()
        );
      });
    }

    setFilteredHackathons(temp);
  }, [selectedMode, selectedType, selectedLocation, selectedDate, hackathons]);

  // Modal handler
  const handleOpen = async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/hackathons/${id}`
      );
      setHackathon(res.data.data);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 min-h-screen font-primary">

      {/* Hero Text */}
      <div className="flex items-center justify-center text-center">
        <TextType
          text={[
            "Find Your Perfect Hackathon Team",
            "Analyze Your GitHub Skills",
            "Build Winning Teams",
          ]}
          typingSpeed={50}
          deletingSpeed={30}
          pauseDuration={2000}
          className="text-4xl md:text-6xl font-extrabold text-white"
        />
      </div>

      <h3 className="text-center text-white mb-5 mt-4">
        We analyze your skills and match you with the right teammates instantly.
      </h3>

      {/* Carousel */}
      <div
        className="h-[500px] w-full border rounded-md mb-5 overflow-hidden relative bg-cover bg-center"
        style={{
          backgroundImage: hackathons[index]
            ? `url(${hackathons[index].image})`
            : "none",
        }}
      >
        {hackathons[index] && (
          <div className="absolute bottom-0 bg-black/60 text-white p-6 w-full">
            <h2 className="text-2xl font-bold">
              {hackathons[index].title}
            </h2>
            <p>{hackathons[index].description}</p>
          </div>
        )}
      </div>

      <DemoSection />
      <StepSection />

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">

        {/* Mode */}
        {["Online", "Offline"].map((mode) => (
          <button
            key={mode}
            onClick={() =>
              setSelectedMode(mode === selectedMode ? "" : mode)
            }
            className={`p-3 rounded-md font-bold ${selectedMode === mode
              ? "bg-primary text-white"
              : "bg-gray-200"
              }`}
          >
            {mode}
          </button>
        ))}

        {/* Type */}
        <input
          type="text"
          placeholder="Type (AI, Web3...)"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-3 rounded-md"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="p-3 rounded-md"
        />

        {/* Date */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-3 rounded-md"
        />

        {/* Reset */}
        <button
          onClick={() => {
            setSelectedMode("");
            setSelectedType("");
            setSelectedLocation("");
            setSelectedDate("");
          }}
          className="bg-red-500 text-white p-3 rounded-md"
        >
          Reset
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-center text-white text-3xl font-semibold mb-10">
        Upcoming Hackathons
      </h1>

      {/* Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredHackathons.map((event) => (
          <div
            key={event._id}
            className="w-[320px] h-[320px] border border-[#AAFF34] flex flex-col"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-[120px] w-full object-cover"
            />

            <div className="p-3 flex-1">
              <h2 className="text-primary">{event.title}</h2>
              <p className="text-white text-sm">{event.location}</p>
              <p className="text-white text-sm">
                {event.startDate} - {event.endDate}
              </p>
              <p className="text-accent text-sm">
                {event.description}
              </p>
            </div>

            <div className="flex">
              <button
                onClick={() => navigate("/hackathon-register")}
                className="flex-1 border text-white hover:bg-primary"
              >
                Register
              </button>

              <button
                onClick={() => handleOpen(event._id)}
                className="flex-1 border text-white hover:bg-primary"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/explore-hackathons")}
          className="px-6 py-3 text-primary font-bold rounded-md hover:scale-105 transition"
        >
          Explore More Hackathons →
        </button>
      </div>

      {isOpen && hackathon && (
        <Modal hackathon={hackathon} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Home;