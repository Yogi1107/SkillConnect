import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function HostRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.organization) {
      return setError("All fields are required.");
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/host-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      navigate("/host-login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 pb-16 min-h-screen">
      <div className="w-full max-w-[420px]">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-[10px] tracking-[4px] uppercase font-primary">
              SkillConnect
            </span>
          </div>
          <h1 className="font-heading text-4xl font-semibold text-white leading-tight mb-2">
            Become a<br />Host<span className="text-primary">.</span>
          </h1>
          <p className="text-muted text-xs tracking-wide font-primary">
            Create and manage opportunities
          </p>
        </div>

        {/* Card */}
        <div
          className="relative rounded-2xl border border-primary/15 p-8 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)"
          }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(170,255,52,0.4), transparent)"
            }}
          />

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-lg font-primary tracking-wide">
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-muted uppercase font-primary">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-muted/30 rounded-lg px-4 py-3 text-white text-sm font-primary placeholder-muted/30 outline-none focus:border-primary focus:bg-primary/[0.04] transition-all duration-200"
              />
            </div>

            {/* Organization */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-muted uppercase font-primary">
                Organization
              </label>
              <input
                type="text"
                name="organization"
                placeholder="Your Company"
                value={form.organization}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-muted/30 rounded-lg px-4 py-3 text-white text-sm font-primary placeholder-muted/30 outline-none focus:border-primary focus:bg-primary/[0.04] transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-muted uppercase font-primary">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="host@company.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-muted/30 rounded-lg px-4 py-3 text-white text-sm font-primary placeholder-muted/30 outline-none focus:border-primary focus:bg-primary/[0.04] transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-muted uppercase font-primary">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-muted/30 rounded-lg px-4 py-3 text-white text-sm font-primary placeholder-muted/30 outline-none focus:border-primary focus:bg-primary/[0.04] transition-all duration-200"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary text-base font-primary font-semibold text-sm tracking-[2px] uppercase rounded-lg py-3.5 hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(170,255,52,0.3)] active:translate-y-0 transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Register as Host →"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-muted/20" />
            <span className="text-[10px] tracking-[2px] text-muted uppercase font-primary">
              already registered
            </span>
            <div className="flex-1 h-px bg-muted/20" />
          </div>

          {/* Login link */}
          <p className="text-center text-xs text-muted font-primary">
            Already a host?{" "}
            <Link to="/host-login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}