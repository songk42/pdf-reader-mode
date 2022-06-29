import React, { useState } from "react";
import { Link } from "react-router-dom";

import FileInput from "../modules/FileInput";
import Reader from "../modules/Reader";

import "./LandingPage.css";

function LandingPage() {
    const [pdfObj, setPdfObj] = useState({"elements": []});
    return (
        <div id="landing" className="page-container">
            <h1 className="landing-title">PDF Reader Mode</h1>
            <FileInput urlInput={true} setPdfObj={setPdfObj} />
            <Reader pdfObj={pdfObj} />
        </div>
    );
}

export default LandingPage;
