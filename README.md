A sleek, interactive NBA analytics dashboard built with React and Recharts — featuring live team stats, shot charts, match history, and an AI-powered game prediction engine powered by Claude AI.
# 🏀 NBA Sports Analytics Dashboard

A sleek, interactive NBA analytics dashboard built with **React** and **Recharts** — featuring live team stats, shot charts, match history, and an AI-powered game prediction engine powered by **Claude AI**.

![Dashboard Preview](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) ![Recharts](https://img.shields.io/badge/Recharts-2.x-22b5bf?style=flat) ![Claude AI](https://img.shields.io/badge/Claude-AI%20Powered-orange?style=flat) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)

---

## ✨ Features

### 📊 Overview Tab
- **KPI Cards** — Record, PPG, Opponent PPG, Point Differential, Current Streak
- **Season Trend Chart** — Line chart comparing points scored vs allowed across 6 months
- **Strengths Radar** — Spider chart visualizing team profile across 6 attributes (Offense, Defense, 3-PT, Clutch, Rebounding, Pace)
- **Player Stats Bar Chart** — Toggle between Points, Rebounds, Assists, Steals, Blocks
- **Player Averages Table** — Full roster breakdown with highlighted active stat

### 📋 Match History Tab
- Win/Loss summary cards (Total Wins, Losses, Home Wins, Away Wins)
- Color-coded game log with opponent, date, home/away indicator, and final score

### 🏀 Shot Chart Tab
- Interactive SVG half-court diagram with shooting zone bubbles
- Hover tooltips showing FGM/FGA and shooting percentage per zone
- Heat map coloring — 🟢 Hot (60%+) · 🟡 Average (45–59%) · 🔴 Cold (<45%)
- Sortable zone breakdown table with rating bars

### ⚡ AI Prediction Tab
- **Claude AI-powered** game prediction engine
- Analyzes team stats, current streak, and recent match results
- Returns win probability, predicted score, verdict, and confidence level
- Breaks down Key Factor, Player to Watch, and Risk Factor

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Recharts | Charts (Line, Bar, Radar) |
| Vite | Build tool & dev server |
| Claude API (claude-sonnet) | AI game prediction |
| SVG | Custom shot chart court |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sports-dashboard.git
cd sports-dashboard

# Install dependencies
npm install
npm install recharts
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
sports-dashboard/
├── src/
│   ├── App.jsx          # Main dashboard component
│   └── main.jsx         # React entry point
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## 🤖 AI Prediction Setup

The AI Prediction tab uses the [Anthropic Claude API](https://www.anthropic.com). The API key is handled via the Claude.ai artifact environment. If running standalone, add your key to the fetch headers:

```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_ANTHROPIC_API_KEY",
  "anthropic-version": "2023-06-01"
}
```

> ⚠️ Never commit API keys to GitHub. Use environment variables (`.env`) instead.

---

## 📸 Screenshots

| Overview | Shot Chart | AI Prediction |
|---|---|---|
| Team stats, charts & radar | Interactive court heatmap | Claude-powered analysis |

---

## 🌐 Live Demo

Deployed on Vercel: [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## 📄 License

MIT License — feel free to use, modify, and share.

---

## 👤 Author

**Prakhar**  
Computer Science (Data Science) · Technocrats Institute of Technology  

[![GitHub](https://img.shields.io/badge/GitHub-YOUR__USERNAME-181717?style=flat&logo=github)](https://github.com/YOUR_USERNAME)

---

> 📌 *Data shown is for demonstration purposes only and is not real NBA statistics.*
