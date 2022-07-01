import React, { useState } from "react";

import FileInput from "../modules/FileInput";
import MenuContainer from "../modules/MenuContainer";
import Reader from "../modules/Reader";

import "./LandingPage.css";

function LandingPage() {
    const [pdfObj, setPdfObj] = useState({"elements": []});
    const [colorScheme, setColorScheme] = useState("light");
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.6);
    const [bodyWidth, setBodyWidth] = useState(30);
    const [serif, setSerif] = useState(false);

    return (
        <div
            id="landing"
            className={`page-container-${colorScheme} page-container-${serif ? "serif" : "sans-serif"}`}>
            <h1 className="landing-title">PDF Reader Mode</h1>
            <FileInput urlInput={true} setPdfObj={setPdfObj} />
            <MenuContainer
                setFontSize={setFontSize}
                setLineHeight={setLineHeight}
                setBodyWidth={setBodyWidth}
                setSerif={setSerif}
            />
            <Reader
                pdfObj={pdfObj}
                colorScheme={colorScheme}
                fontSize={fontSize}
                lineHeight={lineHeight}
                bodyWidth={bodyWidth}
            />
        </div>
    );
}

export default LandingPage;
