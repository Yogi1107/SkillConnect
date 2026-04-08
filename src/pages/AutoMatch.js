import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// ─── Role helpers ──────────────────────────────────────────────────────────
const IDEAL_ROLES = ["Frontend Developer", "Backend Developer", "ML/AI Engineer", "UI/UX Designer"];

function topRole(user) {
  return user.roles?.[0]?.role ?? "Developer";
}

function diversityScore(members) {
  const covered = new Set(members.map(m => topRole(m)));
  return IDEAL_ROLES.filter(r => covered.has(r)).length;
}

function candidateScore(candidate, teamRoles) {
  const needed = IDEAL_ROLES.filter(r => !teamRoles.has(r));
  const role = topRole(candidate);
  const roleScore = candidate.roles?.[0]?.percentage
    ? parseFloat(candidate.roles[0].percentage)
    : 50;
  const fillsGap = needed.includes(role) ? 40 : 0;
  const strength = roleScore * 0.6;
  return fillsGap + strength;
}

// ─── Main Component ────────────────────────────────────────────────────────
const AutoMatch = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();

  const [hackathon, setHackathon] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [teamSize, setTeamSize] = useState(4);

  const [team, setTeam] = useState(null);
  const [alternatives, setAlternatives] = useState({});
  const [swapTarget, setSwapTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // ── Fetch data ──
  useEffect(() => {
    if (hackathonId) {
      axios.get(`http://localhost:5000/api/hackathons/${hackathonId}`)
        .then(r => {
          setHackathon(r.data.data);
          if (r.data.data?.maxTeamSize) setTeamSize(r.data.data.maxTeamSize);
        })
        .catch(console.error);
    }

    axios.get("http://localhost:5000/api/users")
      .then(r => setAllUsers(r.data))
      .catch(console.error);

    const stored = localStorage.getItem("user");
    if (stored) {
      const { email } = JSON.parse(stored);
      axios.get(`http://localhost:5000/api/me?email=${email}`)
        .then(r => setCurrentUser(r.data))
        .catch(console.error);
    }
  }, [hackathonId]);

  // ── Build team ──
  const buildTeam = () => {
    if (!currentUser) return alert("Please log in first.");
    setLoading(true);
    setSaved(false);
    setSwapTarget(null);

    const myId = (currentUser._id?.$oid || currentUser._id)?.toString();
    const pool = allUsers.filter(u => (u._id?.$oid || u._id)?.toString() !== myId);

    const selected = [currentUser];
    const usedIds = new Set([myId]);

    while (selected.length < teamSize && pool.length > 0) {
      const currentRoles = new Set(selected.map(m => topRole(m)));
      let bestScore = -Infinity;
      let bestCandidate = null;

      for (const candidate of pool) {
        const cId = (candidate._id?.$oid || candidate._id)?.toString();
        if (usedIds.has(cId)) continue;
        const score = candidateScore(candidate, currentRoles);
        if (score > bestScore) { bestScore = score; bestCandidate = candidate; }
      }

      if (!bestCandidate) break;
      selected.push(bestCandidate);
      usedIds.add((bestCandidate._id?.$oid || bestCandidate._id)?.toString());
    }

    // Build alternatives for each non-self slot
    const alts = {};
    for (let i = 1; i < selected.length; i++) {
      const tempTeam = selected.filter((_, idx) => idx !== i);
      const tempRoles = new Set(tempTeam.map(m => topRole(m)));
      const memberId = (selected[i]._id?.$oid || selected[i]._id)?.toString();

      alts[i] = pool
        .filter(u => {
          const uid = (u._id?.$oid || u._id)?.toString();
          return !usedIds.has(uid) || uid === memberId;
        })
        .map(u => ({ ...u, _score: candidateScore(u, tempRoles) }))
        .sort((a, b) => b._score - a._score)
        .slice(0, 4);
    }

    setTimeout(() => {
      setTeam(selected);
      setAlternatives(alts);
      setLoading(false);
    }, 700);
  };

  // ── Swap member ──
  const swapMember = (slotIndex, newUser) => {
    const newTeam = [...team];
    newTeam[slotIndex] = newUser;
    setTeam(newTeam);
    setSwapTarget(null);

    const usedIds = new Set(newTeam.map(m => (m._id?.$oid || m._id)?.toString()));
    const myId = (currentUser._id?.$oid || currentUser._id)?.toString();
    const pool = allUsers.filter(u => (u._id?.$oid || u._id)?.toString() !== myId);

    const alts = { ...alternatives };
    for (let i = 1; i < newTeam.length; i++) {
      const tempTeam = newTeam.filter((_, idx) => idx !== i);
      const tempRoles = new Set(tempTeam.map(m => topRole(m)));
      const memberId = (newTeam[i]._id?.$oid || newTeam[i]._id)?.toString();

      alts[i] = pool
        .filter(u => {
          const uid = (u._id?.$oid || u._id)?.toString();
          return !usedIds.has(uid) || uid === memberId;
        })
        .map(u => ({ ...u, _score: candidateScore(u, tempRoles) }))
        .sort((a, b) => b._score - a._score)
        .slice(0, 4);
    }
    setAlternatives(alts);
  };

  // ── Save team ──
  const saveTeam = async () => {
    if (!team || !currentUser) return;
    setSaving(true);

    const myId = (currentUser._id?.$oid || currentUser._id)?.toString();

    try {
      const skillsArray = [...new Set(team.flatMap(u => [
        ...(u.skills?.languages || []),
        ...(u.skills?.frameworks || []),
      ]))].slice(0, 6);

      const payload = {
        teamName: `Team ${currentUser.name.split(" ")[0]}'s Squad`,
        projectName: hackathon?.title ? `${hackathon.title} Project` : "Untitled Project",
        description: "Auto-matched team based on GitHub skill scores.",
        requiredSkills: skillsArray.join(", "),   // ← always a string
        maxMembers: teamSize,
        role: topRole(currentUser),
        hackathonId: hackathonId || null,
        createdBy: myId,
        members: team.map(u => (u._id?.$oid || u._id)?.toString()),
        autoMatched: true,
      };

      const res = await axios.post("http://localhost:5000/api/teams", payload);

      if (res.data.success) {
        for (const member of team.slice(1)) {
          const toId = (member._id?.$oid || member._id)?.toString();
          await axios.post("http://localhost:5000/api/invite/send", {
            fromUserId: myId,
            fromUserName: currentUser.name,
            toUserId: toId,
            teamName: payload.teamName,
            teamId: res.data.data._id,
          }).catch(() => {});
        }

        setSaved(true);
        setTimeout(() => {
          if (hackathonId) navigate(`/discover/${hackathonId}`);
        }, 2000);
      } else {
        alert(res.data.message || "Failed to save team.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving team. Is the backend running?");
    } finally {
      setSaving(false);
    }
  };

  const coverage = team
    ? IDEAL_ROLES.map(r => ({ role: r, filled: team.some(m => topRole(m) === r) }))
    : [];

  // ─── UI ──────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 text-white min-h-screen bg-base font-primary">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">
          ⚡ Auto Matchmaking
        </h1>
        {hackathon && (
          <p className="text-sm text-gray-400">
            {hackathon.title} · Max team size: <span className="text-primary">{hackathon.maxTeamSize}</span>
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-3 border border-muted rounded-lg px-4 py-2">
          <span className="text-sm text-gray-400">Team Size:</span>
          <button
            onClick={() => setTeamSize(s => Math.max(2, s - 1))}
            className="w-7 h-7 rounded border border-muted text-white hover:border-primary hover:text-primary transition flex items-center justify-center"
          >−</button>
          <span className="text-primary font-bold w-5 text-center">{teamSize}</span>
          <button
            onClick={() => setTeamSize(s => Math.min(hackathon?.maxTeamSize ?? 6, s + 1))}
            className="w-7 h-7 rounded border border-muted text-white hover:border-primary hover:text-primary transition flex items-center justify-center"
          >+</button>
        </div>

        <button
          onClick={buildTeam}
          disabled={loading}
          className="bg-primary text-black font-bold px-6 py-2 rounded hover:bg-lime-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analysing…" : team ? "Re-Match" : "Auto Match Me"}
        </button>
      </div>

      {/* Empty state */}
      {!team && !loading && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-3">👥</p>
          <p className="text-sm">Click <span className="text-primary font-semibold">Auto Match Me</span> to build your team</p>
          <p className="text-xs mt-1 text-gray-600">based on GitHub skill scores</p>
        </div>
      )}

      {/* Results */}
      {team && (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: Team list */}
          <div className="lg:w-3/5 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Matched Team</h2>
              <span className="text-xs text-gray-500">{team.length}/{teamSize} members</span>
            </div>

            {team.map((member, i) => {
              const role = topRole(member);
              const pct = parseFloat(member.roles?.[0]?.percentage ?? 0);
              const isYou = i === 0;

              return (
                <div key={i}>
                  {/* Member row */}
                  <div className="flex items-center gap-3 p-3 border border-muted rounded-lg bg-base">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-muted flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm truncate">{member.name}</p>
                        {isYou && (
                          <span className="text-[10px] bg-primary text-black px-1.5 py-0.5 rounded font-bold">YOU</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{role}</p>
                    </div>

                    {/* Score bar */}
                    <div className="flex flex-col items-end gap-1 w-24 flex-shrink-0">
                      <span className="text-xs text-primary font-semibold">{Math.round(pct)}%</span>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Remove / Swap */}
                    {!isYou && (
                      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        <button
                          onClick={() => setSwapTarget(swapTarget === i ? null : i)}
                          className="text-xs text-gray-500 hover:text-primary border border-muted px-2 py-1 rounded transition"
                        >
                          {swapTarget === i ? "▲" : "⇄"}
                        </button>
                        <button
                          onClick={() => { setTeam(team.filter((_, idx) => idx !== i)); setSwapTarget(null); }}
                          className="text-xs text-gray-600 hover:text-red-400 border border-muted px-2 py-1 rounded transition"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Swap panel */}
                  {swapTarget === i && alternatives[i]?.length > 0 && (
                    <div className="mt-1 ml-3 border border-dashed border-primary/30 rounded-lg p-3 flex flex-col gap-2">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Swap with</p>
                      {alternatives[i].map((alt, ai) => (
                        <button
                          key={ai}
                          onClick={() => swapMember(i, alt)}
                          className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition text-left"
                        >
                          <img src={alt.avatar} alt={alt.name} className="w-8 h-8 rounded-full object-cover border border-muted flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{alt.name}</p>
                            <p className="text-xs text-gray-400">{topRole(alt)}</p>
                          </div>
                          <span className="text-xs text-primary font-bold">{Math.round(alt._score)}pts</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Save */}
            <button
              onClick={saveTeam}
              disabled={saving || saved}
              className={`mt-2 w-full py-3 rounded font-bold text-sm tracking-widest uppercase transition-all
                ${saved
                  ? "border border-green-500 text-green-400 bg-transparent"
                  : "bg-primary text-black hover:bg-lime-300"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {saved ? "✓ Team Saved — Invites Sent!" : saving ? "Saving…" : "Save Team & Send Invites →"}
            </button>
          </div>

          {/* Right: Stats */}
          <div className="lg:w-2/5 flex flex-col gap-4">

            {/* Role coverage */}
            <div className="border border-muted rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Role Coverage</p>
              <div className="flex flex-col gap-2">
                {coverage.map(({ role, filled }) => (
                  <div key={role} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${filled ? "bg-primary" : "bg-gray-700"}`} />
                    <span className={filled ? "text-white" : "text-gray-600"}>{role}</span>
                    <span className="ml-auto text-xs">{filled ? <span className="text-green-400">✓</span> : <span className="text-gray-700">—</span>}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-muted">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Diversity Score</span>
                  <span className="text-primary font-bold">{diversityScore(team)}/{IDEAL_ROLES.length}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${(diversityScore(team) / IDEAL_ROLES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="border border-muted rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">How It Works</p>
              <ul className="text-xs text-gray-400 space-y-2">
                <li>⚡ Analyzes GitHub language scores</li>
                <li>🎯 Assigns weighted roles per user</li>
                <li>🧩 Greedily fills missing roles first</li>
                <li>🔄 Swap any member with alternatives</li>
                <li>✉️ Saves team & sends invites auto</li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AutoMatch;