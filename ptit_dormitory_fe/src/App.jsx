import React from "react";
import { Routes, Route } from "react-router-dom";
import { Frame } from "./view/Frame";
import { PowerMonitoring } from "./view/PowerMonitoring";
import { Reports } from "./view/Reports";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Frame />} />
      <Route path="/power-monitoring" element={<PowerMonitoring />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default App;