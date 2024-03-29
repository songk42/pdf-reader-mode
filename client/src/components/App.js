import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { socket } from "../client-socket";
import { get, post } from "../utilities";

import "../utilities.css";
import "./App.css";

import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

function App() {
    useEffect(() => {
        // post("/api/initsocket", { socketid: socket.id });
    });
    return (
        <div className="root-page-container">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
