import React, { useEffect, useState } from "react";

const HostDashboard = () => {
    const [host, setHost] = useState(null);
    const [hackathons, setHackathons] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        maxTeamSize: 4,
        startDate: "",
        endDate: "",
        mode: "",
        location: "",
        image: ""
    });

    useEffect(() => {
        const stored = localStorage.getItem("hostUser");
        if (!stored) return;
        setHost(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (!host) return;

        fetch(`http://localhost:5000/api/hackathons/hostId=${host._id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setHackathons(data.data);
                } else {
                    setHackathons([]); // fallback
                }
            })
            .catch(err => {
                console.error("Error fetching hackathons:", err);
                setHackathons([]);
            });
    }, [host]);

    const handleCreate = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData, "Host:", host);
        if (!host) return;

        // Construct the payload to match your MongoDB document format
        const payload = {
            title: formData.title,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            mode: formData.mode,
            location: formData.location,
            image: formData.image || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0", // default image
            hostOrganization: {
                name: host.organizationName || "Blockchain India", // you can take it from host object
                organizerId: host.id
            },
            status: "approved",
            teams: [],
            maxTeamSize: Number(formData.maxTeamSize),
            createdAt: new Date().toISOString(),
            participants: []
        };

        try {
            const res = await fetch("http://localhost:5000/api/hackathons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                setHackathons(prev => [...prev, data.data]);
                setFormData({
                    title: "",
                    description: "",
                    maxTeamSize: 4,
                    startDate: "",
                    endDate: "",
                    mode: "",
                    location: "",
                    image: ""
                });
                alert("Hackathon created!");
            } else {
                alert("Failed: " + data.message);
            }
        } catch (error) {
            console.error("Error creating hackathon:", error);
            alert("Error creating hackathon. Check console.");
        }
    };

    return (
        <div className="p-6 text-white min-h-screen bg-base font-primary">
            <h1 className="text-3xl font-bold mb-6 font-heading">Welcome, {host?.name}</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Create Hackathon */}
                <div className="md:w-1/2 bg-base border-2 border-primary text-base p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-white font-heading">Create New Hackathon</h2>
                    <form onSubmit={handleCreate} className="flex flex-col gap-4">
                        {/* Hackathon Name */}
                        <input
                            placeholder="Hackathon Name"
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="p-3 rounded border border-muted bg-base text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />

                        {/* Description */}
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="p-3 rounded border border-muted bg-base text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={4}
                            required
                        />

                        {/* Max Team Size */}
                        <input
                            type="number"
                            placeholder="Max Team Size"
                            value={formData.maxTeamSize}
                            onChange={e => setFormData(prev => ({ ...prev, maxTeamSize: Number(e.target.value) }))}
                            className="p-3 rounded border border-muted bg-base text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            min={1}
                            required
                        />

                        {/* Mode */}
                        <input
                            type="text"
                            placeholder="Mode (online/offline)"
                            value={formData.mode}
                            onChange={e => setFormData(prev => ({ ...prev, mode: e.target.value }))}
                            className="p-3 rounded border border-muted bg-base text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />

                        {/* Location */}
                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.location}
                            onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            className="p-3 rounded border border-muted bg-base text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <label className="text-lg text-white">Provide a Hackathon  Banner</label>
                        {/* Image */}
                        <input
                            type="text"
                            placeholder="Hackathon banner URL"
                            value={formData.image}
                            onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                            pattern="https?://.+"
                            title="Please enter a valid URL"
                        />

                        {/* Start & End Dates */}
                        <div className="flex gap-4">
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                className="p-3 rounded border border-muted bg-base text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary w-1/2"
                                required
                            />
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                className="p-3 rounded border border-muted bg-base text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary w-1/2"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-primary text-black font-semibold rounded-lg py-3 mt-2 hover:bg-lime-400 transition"
                        >
                            Create Hackathon
                        </button>
                    </form>
                </div>

                {/* Right: Previous Hackathons */}
                <div className="md:w-1/2 bg-base border-2 border-primary text-base p-6 rounded-xl shadow-lg flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
                    <h2 className="text-2xl font-semibold mb-4 text-white font-heading">Your Hackathons</h2>

                    {Array.isArray(hackathons) && hackathons.length > 0 ? (
                        hackathons.map(h => (
                            <div key={h._id} className="border border-muted rounded-lg p-4 hover:border-primary transition">
                                <h3 className="font-bold text-primary text-lg">{h.title}</h3>
                                <p className="text-muted mt-1">{h.description}</p>
                                <p className="text-sm mt-2 text-accent">
                                    Team Size: {h.maxTeamSize} | Start: {new Date(h.startDate).toLocaleDateString()} | End: {new Date(h.endDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No hackathons yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HostDashboard;