import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Frame } from "./view/Frame";
import { PowerMonitoring } from "./view/PowerMonitoring";
import { Reports } from "./view/Reports";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Frame />} />
        <Route path="/power-monitoring" element={<PowerMonitoring />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  </StrictMode>
);