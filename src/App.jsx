import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { TimerProvider } from "./contexts/TimerContext";

import AppLayout from "./components/AppLayout";
import HomePage from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import ModalManager from "./components/ModalManager";

const App = () => (
  <ThemeProvider>
    <TimerProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ModalManager />
        </AppLayout>
      </Router>
    </TimerProvider>
  </ThemeProvider>
);

export default App;
