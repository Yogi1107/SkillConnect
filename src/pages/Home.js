import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextType from '../animations/TextType.js';
import Modal from "../components/Modal.js";
import DemoSection from "../components/DemoSection.js";
import StepSection from "../components/StepSection.js";
import axios from "axios";

const Home = () => {

  const navigate = useNavigate();

  const [hackathons, setHackathons] = useState([]);

  const filters = ["Offline", "Online", "Type", "Date", "Location"];
  const [selectedMode, setSelectedMode] = useState(null);
  

  const [isOpen, setIsOpen] = useState(false);
  const [hackathon, setHackathon] = useState(null);

  const handleOpen = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/hackathons/${id}`
      );

      setHackathon(res.data.data);
      setIsOpen(true);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetch("http://localhost:5000/api/hackathons")
      .then((res) => res.json())
      .then((data) => {
        setHackathons(data.data);
      })
      .catch((err) => console.error(err));

  }, []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/promotionalHackathons")
      .then(res => res.json())
      .then(data => setHackathons(data));
  }, []);

  useEffect(() => {

    if (hackathons.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hackathons.length);
    }, 4000);

    return () => clearInterval(interval);

  }, [hackathons]);

  const filteredHackathons = selectedMode
  ? hackathons.filter(
      (event) => event.mode.toLowerCase() === selectedMode.toLowerCase()
    )
  : hackathons;

  return (
    <div className="p-10 min-h-screen align-center font-primary">

      <div className="flex items-center justify-center text-center w-full h-full">
        <TextType
          text={[
            "Find Your Perfect Hackathon Team",
            "Analyze Your GitHub Skills",
            "Build Winning Teams"
          ]}
          typingSpeed={50}
          deletingSpeed={30}
          pauseDuration={2000}
          className="text-4xl md:text-6xl font-extrabold text-white"
        />
      </div>
      <br></br>
      <h3 class="large text-center text-white mb-5"> We analyze your skills and match you with the right teammates instantly. </h3>
      <br></br>
      {/* Hero Section */}
      <div
        className="h-[500px] w-full border border-[#9499A4] rounded-md mb-5 overflow-hidden relative bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: hackathons[index]
            ? `url(${hackathons[index].image})`
            : "none"
        }}
      >

        {hackathons[index] && (
          <div className="absolute bottom-0 bg-black/60 text-white p-6 w-full">
            <h2 className="text-2xl font-bold">{hackathons[index].title}</h2>
            <p>{hackathons[index].description}</p>
          </div>
        )}

      </div>

      <DemoSection />
      <StepSection />

      {/* Filters */}
      {/* Filters */}
      <div className="flex items-center justify-center gap-10 mb-5">
        <div className="flex gap-3 bg-gray-200 p-2 rounded-lg">
          {["Offline", "Online"].map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`p-3 font-bold rounded-md transition transform hover:scale-105
          ${selectedMode === mode ? "bg-primary text-base" : "bg-white"}`}
            >
              {mode}
            </button>
          ))}
        </div>

        {filters && filters.length > 2 && filters.slice(2).map((value) => (
          <button
            key={value}
            className="bg-primary p-3 font-bold rounded-md transition transform hover:scale-105"
          >
            {value}
          </button>
        ))}
      </div>

      {/* Heading */}
      <h1 className="text-center m-[50px] text-white text-[2.5rem] font-semibold">
        Upcoming Hackathons
      </h1>

      {/* Hackathon Cards */}
      <div className="flex flex-wrap gap-6 justify-center font-primary">
        
        {filteredHackathons.map((event) => (

          <div
            key={event._id}
            className="w-[320px] h-[320px] border border-[#AAFF34] overflow-hidden transition-transform duration-300 hover:-translate-y-[5px] flex flex-col"
          >

            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[120px] object-cover border-b border-b-primary"
            />

            <div className="p-3 h-full overflow-hidden">

              <h2 className="text-[15px] text-primary ">
                {event.title}
              </h2>
              <p className="text-[12px] text-white font-semibold">
                {event.location}
              </p>

              <p className="text-[12px] text-white font-semibold">
                {event.startDate} - {event.endDate}
              </p>

              <p className="text-[15px] text-accent leading-relaxed mb-5">
                {event.description}
              </p>
            </div>


            <div className="flex flex-row gap-3 mb-0 ">
              <button
                onClick={() => navigate("/hackathon-register")}
                className="flex-1 py-2 font-bold cursor-pointer border border-primary text-white hover:bg-primary hover:text-base"
              >
                Register
              </button>

              <button
                onClick={() => handleOpen(event._id)}
                className="flex-1 py-2 bg-base text-white border border-primary font-bold cursor-pointer hover:bg-primary hover:text-base"
              >
                Explore
              </button>

              {isOpen && hackathon && (
                <Modal hackathon={hackathon} onClose={() => setIsOpen(false)} />
              )}

            </div>



          </div>

        ))}

      </div>

    </div>
  );
};

export default Home;