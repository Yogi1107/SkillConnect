import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const Hackathon = () => {

  const [hackathons, setHackathons] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All"); // type instead of mode
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [hackathon, setHackathon] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch all hackathons
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hackathons");
        setHackathons(res.data.data || []);
        setFiltered(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHackathons();
  }, []);

  // Open modal
  const handleOpen = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/hackathons/${id}`);
      setHackathon(res.data.data);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setType("All");
    setLocation("");
    setDate("");
  };

  // Filtering logic
  useEffect(() => {
    let result = [...hackathons];

    if (search) {
      result = result.filter((h) =>
        h.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "All") {
      result = result.filter((h) => h.mode?.toLowerCase() === type.toLowerCase());
    }

    if (location) {
      result = result.filter((h) =>
        h.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (date) {
      result = result.filter(h => new Date(h.startDate) >= new Date(date));
    }

    setFiltered(result);

  }, [search, type, location, date, hackathons]);

  return (
    <div className="p-6 text-white">

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center items-center">

        <input
          type="text"
          placeholder="Search hackathons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-base border border-primary w-full md:w-[250px]"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-base border border-primary"
        >
          <option value="All">All Types</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 rounded bg-base border border-primary"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded bg-base border border-primary"
        />

        <button
          onClick={resetFilters}
          className="p-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {filtered.length > 0 ? (
          filtered.map((event) => (
            <div
              key={event._id}
              className="w-[320px] border border-primary rounded-xl overflow-hidden hover:-translate-y-1 transition"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[120px] object-cover"
              />

              <div className="p-3">
                <h2 className="text-primary font-semibold">{event.title}</h2>
                <p className="text-sm">{event.location}</p>
                <p className="text-sm">{event.startDate} - {event.endDate}</p>
                <p className="text-sm mt-2 line-clamp-2">{event.description}</p>
              </div>

              <div className="flex gap-2 p-2">
                <button
                  onClick={() => navigate(`/discover/${event._id}`)}
                  className="bg-primary text-black px-3 py-1 rounded font-semibold"
                >
                  Register
                </button>

                <button
                  onClick={() => handleOpen(event._id)}
                  className="flex-1 py-2 bg-base text-white border border-primary font-bold hover:bg-primary hover:text-base"
                >
                  Explore
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hackathons found!!</p>
        )}
      </div>

      {/* Modal OUTSIDE map */}
      {isOpen && hackathon && (
        <Modal hackathon={hackathon} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Hackathon;