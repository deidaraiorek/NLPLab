import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./index.css";
import Publication from "./pages/Publication";
import People from "./pages/People";
import Blog from "./pages/Blog";
import Research from "./pages/Research";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/publications" element={<Publication />} />
          <Route path="/people" element={<People />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/research" element={<Research />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Define the component for the home route */}
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
