# 🕒 Multi-Timer App

A minimal, multi timer application where users can create, manage, and interact with multiple customizable timers grouped by categories. Built with React and Vite.

## ✨ Features

- **Add new timers with:**
  - Name
  - Duration (hours, minutes, seconds)
  - Category
- **Group timers by categories** (expand/collapse view)
- **Timer controls:** Start, Pause, Reset, Delete
- **Bulk actions at category level:** Start All, Pause All, Reset All
- **Timer progress visualization** with a simple progress bar
- **Optional halfway alert** with message
- **Modal popup** when a timer completes
- **History screen** to view all completed timers
- **Persistent storage** via localStorage

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Harshil233/Multi-timer-app.git
cd Multi-timer-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**
   The app will be available at: [http://localhost:5173](http://localhost:5173)

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: CSS
- **Persistence**: localStorage

## ⚙️ Implementation Details

- Timers are stored locally using localStorage (no backend or external DB)
- Unique timer IDs are generated using `Date.now()` timestamp
- Time is internally managed in seconds and displayed as hh:mm:ss
- Timer countdowns use `setInterval` updated every second
- A halfway alert will only trigger once per timer, if set
- When a timer hits 0, it's automatically marked as Completed
- Pause and Start button are disabled as soon as the timer gets completed
- Minimal third-party dependencies — no external CSS libraries or frameworks are used
- Basic CSS is used to maintain a clean, simple UI
