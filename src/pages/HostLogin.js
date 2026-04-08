import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HostLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); const handleHostLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/host-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        // 1. Save host data to localStorage
        localStorage.setItem("hostUser", JSON.stringify(data.host));

        // 2. TRIGGER NAVBAR UPDATE
        // This manually tells the Navbar to run syncUser() immediately
        window.dispatchEvent(new Event("storage"));

        // 3. REDIRECT TO HOME
        navigate("/host-dashboard");

        alert("Welcome back, " + data.host.name);
      } else {
        alert(data.message || "Invalid Host Credentials");
      }
    } catch (error) {
      console.error("Host Login error:", error);
      alert("Server error. Check if your backend is running.");
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
            Host<br />Login<span className="text-primary">.</span>
          </h1>
          <p className="text-muted text-xs tracking-wide font-primary">
            Access your host dashboard
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

          <form onSubmit={handleHostLogin} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] text-muted uppercase font-primary">
                Organization Email
              </label>
              <input
                type="email"
                placeholder="host@company.com"
                onChange={(e) => setEmail(e.target.value)}
                required
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
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-muted/30 rounded-lg px-4 py-3 text-white text-sm font-primary placeholder-muted/30 outline-none focus:border-primary focus:bg-primary/[0.04] transition-all duration-200"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 bg-primary text-base font-primary font-semibold text-sm tracking-[2px] uppercase rounded-lg py-3.5 hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(170,255,52,0.3)] active:translate-y-0 transition-all duration-200"
            >
              Login as Host →
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-xs mt-5 text-muted font-primary">
            New Host?{" "}
            <button
              onClick={() => navigate("/host-register")}
              className="text-primary hover:underline font-medium"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}