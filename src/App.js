import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./index.css";
import Publication from "./pages/Publication";
import People from "./pages/People";
import Blog from "./pages/Blog";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/publications" element={<Publication />} />
          <Route path="/people" element={<People />} />
          <Route path="/blogs" element={<Blog />} />
          {/* Define the component for the home route */}
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
