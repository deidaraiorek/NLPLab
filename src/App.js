import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./index.css";
import People from "./pages/People";
import Blog from "./pages/Blog";
import Research from "./pages/Research";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
import { RequestsProvider } from "./contexts/RequestContext";

function App() {
  return (
    <RequestsProvider>
    <AuthProvider>
    <Router>
      <div className="font-sans">
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/people" element={<People />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/research" element={<Research />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path= "/login" element={<Authentication />} />
          {/* Define the component for the home route */}
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
    </AuthProvider>
    </RequestsProvider>
  );
}

export default App;
