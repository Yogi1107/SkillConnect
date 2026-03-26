import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Hackathon = () => {

  const [hackathons, setHackathons] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/hackathons")
      .then((res) => res.json())
      .then((data) => {
        setHackathons(data.data || []);
        setFiltered(data.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔍 Filtering Logic
  useEffect(() => {
    let result = hackathons;

    // Search
    if (search) {
      result = result.filter((h) =>
        h.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type Filter
    if (type !== "All") {
      result = result.filter((h) => h.type === type);
    }

    // Location Filter
    if (location) {
      result = result.filter((h) =>
        h.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Date Filter (simple check)
    if (date) {
      result = result.filter((h) => h.startDate >= date);
    }

    setFiltered(result);

  }, [search, type, location, date, hackathons]);

  return (
    <div className="p-6 text-white">

      {/* 🔍 SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">

        {/* Search */}
        <input
          type="text"
          placeholder="Search hackathons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-base border border-primary w-full md:w-[250px]"
        />

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-base border border-primary"
        >
          <option value="All">All Types</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 rounded bg-base border border-primary"
        />

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded bg-base border border-primary"
        />

      </div>

      {/* 🧾 CARDS */}
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
                  onClick={() => navigate("/hackathon-register")}
                  className="flex-1 border border-primary py-2 hover:bg-primary"
                >
                  Register
                </button>

                <button
                  className="flex-1 border border-primary py-2 hover:bg-primary"
                >
                  Explore
                </button>
              </div>

            </div>

          ))
        ) : (
          <p>No hackathons found 😢</p>
        )}

      </div>

    </div>
  );
};

export default Hackathon;