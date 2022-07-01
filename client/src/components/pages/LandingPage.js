import React, { useState } from "react";
import { Link } from "react-router-dom";

import FileInput from "../modules/FileInput";
import Reader from "../modules/Reader";

import "./LandingPage.css";

function LandingPage() {
    const [pdfObj, setPdfObj] = useState({"elements": []});
    const [colorScheme, setColorScheme] = useState("light");
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.6);
    const [bodyWidth, setBodyWidth] = useState(30);

    return (
        <div
            id="landing"
            className={"page-container-" + colorScheme}>
            <h1 className="landing-title">PDF Reader Mode</h1>
            <FileInput urlInput={true} setPdfObj={setPdfObj} />
            <Reader pdfObj={pdfObj} colorScheme={colorScheme}/>
        </div>
    );
}

export default LandingPage;
