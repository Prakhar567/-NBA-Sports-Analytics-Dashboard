import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PolarRadiusAxis
} from "recharts";

const TEAMS = {
  Lakers: {
    color: "#FDB927", accent: "#552583",
    record: "47-35", winPct: ".573", ppg: "115.4", opp: "112.1", streak: "W3",
    players: [
      { name: "LeBron",  pts: 25.7, reb: 7.3, ast: 8.1, stl: 1.3, blk: 0.8 },
      { name: "AD",      pts: 24.1, reb: 11.8, ast: 3.5, stl: 1.1, blk: 2.4 },
      { name: "Austin",  pts: 16.8, reb: 4.2, ast: 5.9, stl: 1.4, blk: 0.3 },
      { name: "Rui",     pts: 13.5, reb: 5.1, ast: 1.8, stl: 1.0, blk: 0.6 },
      { name: "Knecht",  pts: 11.2, reb: 3.3, ast: 1.2, stl: 0.7, blk: 0.2 },
    ],
    season: [
      { month: "Oct", pts: 108, opp: 110 }, { month: "Nov", pts: 112, opp: 109 },
      { month: "Dec", pts: 116, opp: 113 }, { month: "Jan", pts: 118, opp: 111 },
      { month: "Feb", pts: 114, opp: 112 }, { month: "Mar", pts: 119, opp: 114 },
    ],
    radar: [
      { attr: "Offense", val: 88 }, { attr: "Defense", val: 79 },
      { attr: "Rebounding", val: 84 }, { attr: "3-PT", val: 72 },
      { attr: "Clutch", val: 91 }, { attr: "Pace", val: 77 },
    ],
    history: [
      { date: "Apr 14", opp: "Warriors", score: "118-109", result: "W", home: true },
      { date: "Apr 12", opp: "Clippers", score: "104-112", result: "L", home: false },
      { date: "Apr 10", opp: "Suns",     score: "121-115", result: "W", home: true },
      { date: "Apr 8",  opp: "Kings",    score: "109-101", result: "W", home: false },
      { date: "Apr 5",  opp: "Nuggets",  score: "99-107",  result: "L", home: true },
      { date: "Apr 3",  opp: "Mavs",     score: "115-110", result: "W", home: false },
    ],
    shots: [
      { zone: "Paint",     made: 18, att: 26, x: 250, y: 280 },
      { zone: "Mid Left",  made: 4,  att: 11, x: 120, y: 200 },
      { zone: "Mid Right", made: 5,  att: 12, x: 380, y: 200 },
      { zone: "3PT Left",  made: 5,  att: 14, x: 70,  y: 170 },
      { zone: "3PT Right", made: 6,  att: 15, x: 430, y: 170 },
      { zone: "3PT Top",   made: 7,  att: 18, x: 250, y: 100 },
      { zone: "Corner L",  made: 4,  att: 8,  x: 60,  y: 310 },
      { zone: "Corner R",  made: 5,  att: 9,  x: 440, y: 310 },
    ],
    nextOpp: "Nuggets",
  },
  Warriors: {
    color: "#FFC72C", accent: "#1D428A",
    record: "36-46", winPct: ".439", ppg: "112.8", opp: "116.3", streak: "L2",
    players: [
      { name: "Curry",    pts: 26.4, reb: 5.1, ast: 6.1, stl: 1.4, blk: 0.4 },
      { name: "Wiggins",  pts: 18.9, reb: 5.0, ast: 2.3, stl: 1.1, blk: 0.7 },
      { name: "Kuminga",  pts: 16.1, reb: 4.8, ast: 2.8, stl: 0.9, blk: 0.8 },
      { name: "Thompson", pts: 14.2, reb: 3.4, ast: 2.1, stl: 0.8, blk: 0.4 },
      { name: "Green",    pts: 8.6,  reb: 7.2, ast: 8.8, stl: 1.3, blk: 0.8 },
    ],
    season: [
      { month: "Oct", pts: 110, opp: 108 }, { month: "Nov", pts: 114, opp: 116 },
      { month: "Dec", pts: 111, opp: 115 }, { month: "Jan", pts: 113, opp: 117 },
      { month: "Feb", pts: 109, opp: 118 }, { month: "Mar", pts: 115, opp: 116 },
    ],
    radar: [
      { attr: "Offense", val: 85 }, { attr: "Defense", val: 71 },
      { attr: "Rebounding", val: 74 }, { attr: "3-PT", val: 93 },
      { attr: "Clutch", val: 82 }, { attr: "Pace", val: 88 },
    ],
    history: [
      { date: "Apr 14", opp: "Lakers",   score: "109-118", result: "L", home: false },
      { date: "Apr 12", opp: "Blazers",  score: "122-110", result: "W", home: true },
      { date: "Apr 10", opp: "Jazz",     score: "115-108", result: "W", home: true },
      { date: "Apr 8",  opp: "Thunder",  score: "98-115",  result: "L", home: false },
      { date: "Apr 5",  opp: "Clippers", score: "104-99",  result: "W", home: true },
      { date: "Apr 3",  opp: "Suns",     score: "108-117", result: "L", home: false },
    ],
    shots: [
      { zone: "Paint",     made: 12, att: 20, x: 250, y: 280 },
      { zone: "Mid Left",  made: 3,  att: 9,  x: 120, y: 200 },
      { zone: "Mid Right", made: 3,  att: 8,  x: 380, y: 200 },
      { zone: "3PT Left",  made: 8,  att: 18, x: 70,  y: 170 },
      { zone: "3PT Right", made: 9,  att: 19, x: 430, y: 170 },
      { zone: "3PT Top",   made: 11, att: 24, x: 250, y: 100 },
      { zone: "Corner L",  made: 6,  att: 10, x: 60,  y: 310 },
      { zone: "Corner R",  made: 7,  att: 11, x: 440, y: 310 },
    ],
    nextOpp: "Lakers",
  },
  Celtics: {
    color: "#00A04B", accent: "#FFFFFF",
    record: "61-21", winPct: ".744", ppg: "120.6", opp: "109.4", streak: "W7",
    players: [
      { name: "Tatum",     pts: 26.9, reb: 8.1, ast: 4.9, stl: 1.1, blk: 0.6 },
      { name: "Brown",     pts: 23.0, reb: 5.5, ast: 3.6, stl: 1.2, blk: 0.5 },
      { name: "White",     pts: 15.2, reb: 4.2, ast: 5.1, stl: 1.1, blk: 1.1 },
      { name: "Holiday",   pts: 12.5, reb: 5.4, ast: 4.8, stl: 1.6, blk: 0.4 },
      { name: "Porzingis", pts: 20.1, reb: 7.2, ast: 2.0, stl: 0.7, blk: 1.9 },
    ],
    season: [
      { month: "Oct", pts: 116, opp: 107 }, { month: "Nov", pts: 120, opp: 110 },
      { month: "Dec", pts: 122, opp: 109 }, { month: "Jan", pts: 121, opp: 108 },
      { month: "Feb", pts: 118, opp: 110 }, { month: "Mar", pts: 123, opp: 111 },
    ],
    radar: [
      { attr: "Offense", val: 95 }, { attr: "Defense", val: 89 },
      { attr: "Rebounding", val: 82 }, { attr: "3-PT", val: 91 },
      { attr: "Clutch", val: 87 }, { attr: "Pace", val: 83 },
    ],
    history: [
      { date: "Apr 14", opp: "Heat",    score: "124-108", result: "W", home: true },
      { date: "Apr 12", opp: "Bucks",   score: "117-105", result: "W", home: true },
      { date: "Apr 10", opp: "76ers",   score: "111-99",  result: "W", home: false },
      { date: "Apr 8",  opp: "Nets",    score: "130-112", result: "W", home: true },
      { date: "Apr 5",  opp: "Knicks",  score: "108-115", result: "L", home: false },
      { date: "Apr 3",  opp: "Raptors", score: "122-104", result: "W", home: true },
    ],
    shots: [
      { zone: "Paint",     made: 16, att: 24, x: 250, y: 280 },
      { zone: "Mid Left",  made: 5,  att: 10, x: 120, y: 200 },
      { zone: "Mid Right", made: 6,  att: 11, x: 380, y: 200 },
      { zone: "3PT Left",  made: 7,  att: 16, x: 70,  y: 170 },
      { zone: "3PT Right", made: 8,  att: 17, x: 430, y: 170 },
      { zone: "3PT Top",   made: 10, att: 21, x: 250, y: 100 },
      { zone: "Corner L",  made: 5,  att: 8,  x: 60,  y: 310 },
      { zone: "Corner R",  made: 6,  att: 9,  x: 440, y: 310 },
    ],
    nextOpp: "Cavaliers",
  },
};

const STAT_OPTIONS = ["pts", "reb", "ast", "stl", "blk"];
const STAT_LABELS  = { pts: "Points", reb: "Rebounds", ast: "Assists", stl: "Steals", blk: "Blocks" };
const TABS = ["Overview", "Match History", "Shot Chart", "AI Prediction"];

function getPct(made, att) { return att === 0 ? 0 : Math.round((made / att) * 100); }
function heatColor(pct) {
  if (pct >= 60) return "#22c55e";
  if (pct >= 45) return "#eab308";
  return "#ef4444";
}

const Tip = ({ active, payload, label, color }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1117", border: `1px solid ${color}40`, borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
      <p style={{ color: "#aaa", margin: "0 0 6px" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0", fontWeight: 700 }}>
          {p.name}: <span style={{ color: "#fff" }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
};

function ShotChart({ shots, color }) {
  const [hov, setHov] = useState(null);
  return (
    <div>
      <svg viewBox="0 0 500 400" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto" }}>
        <rect x={0} y={0} width={500} height={400} fill="#0a0f16" rx={8} />
        <rect x={170} y={230} width={160} height={150} fill="none" stroke="#1e2d40" strokeWidth={2} />
        <ellipse cx={250} cy={230} rx={60} ry={40} fill="none" stroke="#1e2d40" strokeWidth={2} />
        <circle cx={250} cy={360} r={8} fill="none" stroke="#334" strokeWidth={2} />
        <circle cx={250} cy={360} r={2} fill="#334" />
        <path d="M 50 360 L 50 250 A 210 210 0 0 1 450 250 L 450 360" fill="none" stroke="#1e2d40" strokeWidth={2} />
        <line x1={50} y1={250} x2={50} y2={360} stroke="#1e2d40" strokeWidth={2} />
        <line x1={450} y1={250} x2={450} y2={360} stroke="#1e2d40" strokeWidth={2} />
        <line x1={30} y1={380} x2={470} y2={380} stroke="#1e2d40" strokeWidth={2} />
        {shots.map((s, i) => {
          const pct = getPct(s.made, s.att);
          const hc = heatColor(pct);
          const r = 10 + Math.sqrt(s.att) * 4;
          const isH = hov === i;
          return (
            <g key={i} style={{ cursor: "pointer" }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <circle cx={s.x} cy={s.y} r={r} fill={hc} fillOpacity={isH ? 0.9 : 0.3} stroke={hc} strokeWidth={isH ? 2 : 1} style={{ transition: "all 0.15s" }} />
              <text x={s.x} y={s.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={700} fill="#fff" fontFamily="Barlow Condensed, sans-serif">{pct}%</text>
              {isH && (
                <g>
                  <rect x={s.x - 56} y={s.y - 52} width={112} height={42} rx={6} fill="#0d1117" stroke={hc} strokeWidth={1} />
                  <text x={s.x} y={s.y - 37} textAnchor="middle" fontSize={11} fill={hc} fontFamily="Barlow Condensed, sans-serif" fontWeight={700}>{s.zone}</text>
                  <text x={s.x} y={s.y - 22} textAnchor="middle" fontSize={11} fill="#aaa" fontFamily="Barlow Condensed, sans-serif">{s.made}/{s.att} · {pct}%</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12 }}>
        {[["#22c55e", "Hot (60%+)"], ["#eab308", "Avg (45-59%)"], ["#ef4444", "Cold (<45%)"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#667" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />{l}
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPrediction({ team, teamName }) {
  const [pred, setPred]     = useState(null);
  const [loading, setLoad]  = useState(false);
  const [error, setError]   = useState(null);

  const run = async () => {
    setLoad(true); setError(null); setPred(null);
    const prompt = `You are an expert NBA analyst. Analyze this team and predict their next game.

Team: ${teamName}
Record: ${team.record} (${team.winPct} win%)
PPG: ${team.ppg} | Opp PPG: ${team.opp}
Current Streak: ${team.streak}
Next Opponent: ${team.nextOpp}

Top Players:
${team.players.map(p => `- ${p.name}: ${p.pts}pts ${p.reb}reb ${p.ast}ast`).join("\n")}

Recent Results:
${team.history.map(h => `- ${h.date} vs ${h.opp}: ${h.score} (${h.result})`).join("\n")}

Return ONLY a JSON object (no markdown, no backticks) with:
{
  "winProbability": <number 0-100>,
  "predictedScore": "<TeamName> <score> - <Opponent> <score>",
  "keyFactor": "<one sentence>",
  "playerToWatch": "<name>",
  "playerReason": "<one sentence>",
  "riskFactor": "<one sentence>",
  "verdict": "<Win or Loss>",
  "confidence": "<Low|Medium|High>"
}`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.find(c => c.type === "text")?.text || "";
      setPred(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setError("Analysis failed — please try again."); }
    finally  { setLoad(false); }
  };

  const vc = pred?.verdict === "Win" ? "#22c55e" : "#ef4444";
  const cc = { Low: "#ef4444", Medium: "#eab308", High: "#22c55e" };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, color: "#445", letterSpacing: 2, textTransform: "uppercase" }}>Next Game</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#dde" }}>
            {teamName} <span style={{ color: "#445" }}>vs</span> <span style={{ color: team.color }}>{team.nextOpp}</span>
          </div>
        </div>
        <button onClick={run} disabled={loading} style={{
          padding: "12px 28px", border: "none", borderRadius: 8,
          background: loading ? "#1e2730" : team.color,
          color: loading ? "#445" : "#000",
          fontFamily: "Barlow Condensed, sans-serif", fontSize: 16, fontWeight: 700,
          letterSpacing: 2, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s"
        }}>
          {loading ? "⟳  Analyzing…" : "⚡ Run AI Prediction"}
        </button>
      </div>

      {error && <div style={{ color: "#ef4444", padding: 16, background: "#180808", borderRadius: 8 }}>{error}</div>}

      {loading && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#445" }}>
          <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
          <div style={{ fontSize: 40, animation: "spin 1.2s linear infinite", marginBottom: 12 }}>◈</div>
          <div style={{ fontSize: 14, letterSpacing: 3, textTransform: "uppercase" }}>Claude is analyzing matchup data…</div>
        </div>
      )}

      {pred && (
        <div style={{ display: "grid", gap: 14 }}>
          {/* Win probability */}
          <div style={{ background: "#080c12", borderRadius: 10, padding: "20px 24px", border: "1px solid #1e2730" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#445", letterSpacing: 2, textTransform: "uppercase" }}>Win Probability</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: cc[pred.confidence] || "#778", letterSpacing: 1, textTransform: "uppercase", background: `${cc[pred.confidence]}18`, padding: "3px 10px", borderRadius: 20 }}>
                  {pred.confidence} confidence
                </span>
                <span style={{ fontSize: 36, fontWeight: 900, color: vc }}>{pred.winProbability}%</span>
              </div>
            </div>
            <div style={{ height: 10, background: "#1e2730", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 5, width: `${pred.winProbability}%`, background: `linear-gradient(90deg, ${team.color}, ${vc})`, transition: "width 0.8s ease" }} />
            </div>
          </div>

          {/* Score + verdict */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ background: "#080c12", borderRadius: 10, padding: "18px 20px", border: "1px solid #1e2730", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#445", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Predicted Score</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#ccd" }}>{pred.predictedScore}</div>
            </div>
            <div style={{ background: "#080c12", borderRadius: 10, padding: "18px 20px", border: `1px solid ${vc}30`, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#445", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Verdict</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: vc, letterSpacing: 4 }}>{pred.verdict}</div>
            </div>
          </div>

          {/* Analysis breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { label: "🔑 Key Factor", val: pred.keyFactor },
              { label: `👀 Watch: ${pred.playerToWatch}`, val: pred.playerReason },
              { label: "⚠️ Risk Factor", val: pred.riskFactor },
            ].map((c, i) => (
              <div key={i} style={{ background: "#080c12", borderRadius: 10, padding: "16px 18px", border: "1px solid #1e2730" }}>
                <div style={{ fontSize: 12, color: team.color, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontSize: 13, color: "#889", lineHeight: 1.55 }}>{c.val}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: "#223", letterSpacing: 1 }}>◈ AI-generated · Not for wagering purposes</div>
        </div>
      )}

      {!pred && !loading && (
        <div style={{ textAlign: "center", padding: "52px 20px", border: "1px dashed #1e2730", borderRadius: 10 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#445" }}>Click "Run AI Prediction" to analyze the matchup</div>
          <div style={{ fontSize: 13, color: "#334", marginTop: 6 }}>Powered by Claude AI · Analyzes stats, trends & recent form</div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTeam, setActiveTeam] = useState("Celtics");
  const [activeStat, setActiveStat] = useState("pts");
  const [activeTab, setActiveTab]   = useState("Overview");
  const team = TEAMS[activeTeam];

  const streakColor = team.streak.startsWith("W") ? "#22c55e" : "#ef4444";
  const diff        = (parseFloat(team.ppg) - parseFloat(team.opp)).toFixed(1);
  const diffColor   = diff > 0 ? "#22c55e" : "#ef4444";

  const card = { background: "#0d1117", border: "1px solid #1e2730", borderRadius: 10, padding: "22px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" };

  return (
    <div style={{ minHeight: "100vh", background: "#060a0f", fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif", color: "#e8eaf0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#222;border-radius:4px}
        .tt{transition:all .2s;cursor:pointer}.tt:hover{opacity:.85}
        .nt{transition:all .2s;cursor:pointer}.nt:hover{color:#ccd !important}
        .sp{transition:all .15s;cursor:pointer}.sp:hover{opacity:.85}
        .cd{transition:box-shadow .2s}.cd:hover{box-shadow:0 8px 28px rgba(0,0,0,.45)!important}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: "linear-gradient(135deg,#0d1117 60%,#111827)", borderBottom: `3px solid ${team.color}`, padding: "22px 32px 0", transition: "border-color .4s" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#445", textTransform: "uppercase", marginBottom: 4 }}>◈ NBA Analytics Hub</div>
            <h1 style={{ fontSize: 42, fontWeight: 900, margin: 0, letterSpacing: 2, textTransform: "uppercase", background: `linear-gradient(90deg,${team.color},#ffffff80)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", transition: "all .4s" }}>
              {activeTeam}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {Object.keys(TEAMS).map(t => (
              <button key={t} className="tt" onClick={() => { setActiveTeam(t); setActiveTab("Overview"); }}
                style={{ padding: "10px 22px", border: "none", borderRadius: "6px 6px 0 0", background: t === activeTeam ? TEAMS[t].color : "#161c26", color: t === activeTeam ? "#000" : "#778", fontFamily: "inherit", fontSize: 16, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAV TABS ── */}
      <div style={{ background: "#0a0f16", borderBottom: "1px solid #1a2030", padding: "0 32px", display: "flex", gap: 2, overflowX: "auto" }}>
        {TABS.map(tab => (
          <button key={tab} className="nt" onClick={() => setActiveTab(tab)}
            style={{ padding: "12px 22px", border: "none", background: "transparent", color: tab === activeTab ? team.color : "#445", fontFamily: "inherit", fontSize: 14, fontWeight: tab === activeTab ? 700 : 400, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", borderBottom: tab === activeTab ? `2px solid ${team.color}` : "2px solid transparent", transition: "all .2s", whiteSpace: "nowrap" }}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {/* KPI Cards — always visible */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Record",     val: team.record, sub: `${team.winPct} Win%` },
            { label: "Pts / Game", val: team.ppg,    sub: "Team average" },
            { label: "Opp PPG",    val: team.opp,    sub: "Allowed" },
            { label: "Point Diff", val: `${diff > 0 ? "+" : ""}${diff}`, sub: "Per game",    valColor: diffColor },
            { label: "Streak",     val: team.streak, sub: "Current run", valColor: streakColor },
          ].map((c, i) => (
            <div key={i} className="cd" style={{ ...card, borderTop: `3px solid ${team.color}30` }}>
              <div style={{ fontSize: 10, color: "#445", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: 1, color: c.valColor || team.color }}>{c.val}</div>
              <div style={{ fontSize: 12, color: "#334", marginTop: 3 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "Overview" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18 }}>
              <div className="cd" style={card}>
                <div style={{ fontSize: 10, color: "#445", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Season Trend</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: "#dde" }}>Points Scored vs Allowed</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={team.season}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2030" />
                    <XAxis dataKey="month" tick={{ fill: "#445", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[100, 130]} tick={{ fill: "#445", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip color={team.color} />} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "#667" }} />
                    <Line type="monotone" dataKey="pts" name="Team PTS" stroke={team.color} strokeWidth={2.5} dot={{ fill: team.color, r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="opp" name="Opp PTS"  stroke="#ef4444"  strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="cd" style={card}>
                <div style={{ fontSize: 10, color: "#445", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Team Profile</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: "#dde" }}>Strengths Radar</div>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={team.radar}>
                    <PolarGrid stroke="#1e2730" />
                    <PolarAngleAxis dataKey="attr" tick={{ fill: "#667", fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="val" stroke={team.color} fill={team.color} fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="cd" style={card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#445", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Roster</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#dde" }}>Player Stats Comparison</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {STAT_OPTIONS.map(s => (
                    <button key={s} className="sp" onClick={() => setActiveStat(s)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", background: s === activeStat ? team.color : "#161c26", color: s === activeStat ? "#000" : "#667", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}>
                      {STAT_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={team.players} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2030" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#667", fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#445", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip color={team.color} />} />
                  <Bar dataKey={activeStat} name={STAT_LABELS[activeStat]} fill={team.color} radius={[6, 6, 0, 0]} background={{ fill: "#111827", radius: [6, 6, 0, 0] }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="cd" style={card}>
              <div style={{ fontSize: 10, color: "#445", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Detailed Stats</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#dde", marginBottom: 16 }}>Player Averages</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${team.color}30` }}>
                      {["Player", "PTS", "REB", "AST", "STL", "BLK"].map(h => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: h === "Player" ? "left" : "center", color: "#445", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {team.players.map((p, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #111827", background: i % 2 === 0 ? "transparent" : "#080c12" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 700, color: team.color, fontSize: 16 }}>{p.name}</td>
                        {["pts", "reb", "ast", "stl", "blk"].map(s => (
                          <td key={s} style={{ padding: "12px 16px", textAlign: "center", color: s === activeStat ? "#fff" : "#667", fontWeight: s === activeStat ? 700 : 400, fontSize: s === activeStat ? 17 : 15, background: s === activeStat ? `${team.color}10` : "transparent" }}>{p[s]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── MATCH HISTORY ── */}
        {activeTab === "Match History" && (
          <div className="cd" style={card}>
            <div style={{ fontSize: 10, color: "#445", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Recent Games</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#dde", marginBottom: 22 }}>Match History Log</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Wins",   val: team.history.filter(h => h.result === "W").length,               color: "#22c55e" },
                { label: "Losses", val: team.history.filter(h => h.result === "L").length,               color: "#ef4444" },
                { label: "Home W", val: team.history.filter(h => h.result === "W" && h.home).length,     color: team.color },
                { label: "Away W", val: team.history.filter(h => h.result === "W" && !h.home).length,    color: "#60a5fa" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#080c12", border: "1px solid #1e2730", borderRadius: 8, padding: "14px 18px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#445", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {team.history.map((h, i) => {
              const isW = h.result === "W";
              const rc  = isW ? "#22c55e" : "#ef4444";
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", marginBottom: 8, borderRadius: 8, background: i % 2 === 0 ? "#080c12" : "#0a0f18", border: `1px solid ${rc}20`, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: `${rc}18`, fontSize: 16, fontWeight: 900, color: rc }}>
                      {h.result}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#ccd" }}>vs {h.opp}</div>
                      <div style={{ fontSize: 12, color: "#445" }}>{h.home ? "🏠 Home" : "✈️ Away"} · {h.date}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: isW ? "#dde" : "#556", letterSpacing: 1 }}>{h.score}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SHOT CHART ── */}
        {activeTab === "Shot Chart" && (
          <div className="cd" style={card}>
            <div style={{ fontSize: 10, color: "#445", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Shooting Zones</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#dde", marginBottom: 4 }}>Shot Chart — Last 5 Games</div>
            <div style={{ fontSize: 13, color: "#445", marginBottom: 22 }}>Hover over each zone bubble to see field goal details</div>
            <ShotChart shots={team.shots} color={team.color} />
            <div style={{ marginTop: 28, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${team.color}30` }}>
                    {["Zone", "FGM", "FGA", "FG%", "Rating"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: h === "Zone" ? "left" : "center", color: "#445", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...team.shots].sort((a, b) => getPct(b.made, b.att) - getPct(a.made, a.att)).map((s, i) => {
                    const pct = getPct(s.made, s.att);
                    const hc  = heatColor(pct);
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #111827", background: i % 2 === 0 ? "transparent" : "#080c12" }}>
                        <td style={{ padding: "11px 14px", fontWeight: 600, color: "#aab" }}>{s.zone}</td>
                        <td style={{ padding: "11px 14px", textAlign: "center", color: "#778" }}>{s.made}</td>
                        <td style={{ padding: "11px 14px", textAlign: "center", color: "#778" }}>{s.att}</td>
                        <td style={{ padding: "11px 14px", textAlign: "center", fontWeight: 700, color: hc }}>{pct}%</td>
                        <td style={{ padding: "11px 14px", textAlign: "center" }}>
                          <div style={{ width: 64, height: 8, background: "#1e2730", borderRadius: 4, margin: "0 auto", overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: hc, borderRadius: 4 }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── AI PREDICTION ── */}
        {activeTab === "AI Prediction" && (
          <div className="cd" style={card}>
            <div style={{ fontSize: 10, color: "#445", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Powered by Claude AI</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#dde", marginBottom: 20 }}>Game Prediction Engine</div>
            <AIPrediction team={team} teamName={activeTeam} />
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 28, fontSize: 11, color: "#223", letterSpacing: 2 }}>
          ◈ NBA ANALYTICS HUB · 2024–25 SEASON · DEMO DATA
        </div>
      </div>
    </div>
  );
}
