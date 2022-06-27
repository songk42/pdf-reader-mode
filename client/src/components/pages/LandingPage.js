import React from "react";
import { Link } from "react-router-dom";

import FileInput from "../modules/FileInput";

import "./LandingPage.css";

function LandingPage() {
    return (
        <div id="landing" className="page-container">
            <h1 className="landing-title">PDF Reader Mode</h1>
            <FileInput />
        </div>
    );
}

export default LandingPage;
