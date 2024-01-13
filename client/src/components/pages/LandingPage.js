import React, { useState } from "react";

import FileInput from "../modules/FileInput";
import MenuContainer from "../modules/MenuContainer";
import Reader from "../modules/Reader";

function LandingPage() {
    const [outputdir, setOutputDir] = useState("");
    const [pdfObj, setPdfObj] = useState({"elements": []});

    const [theme, setTheme] = useState("light");
    const [fsIndex, setFontSizeIndex] = useState(3);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [bodyWidth, setBodyWidth] = useState(30);
    const [serif, setSerif] = useState(false);
    const [menuVisible, setMenuVisible] = useState(true);

    const fsDict = [-1, 12, 14, 16, 18, 20, 24, 28, 32, 40, 56, 60, 72, 96]  // font size
    function incrementFontSizeIndex(inc) {
        setFontSizeIndex(fsIndex + inc);
    }

    const [loading, setLoading] = useState(false);

    return (
        <div
            id="landing"
            className={`page-container page-container-${theme}`}>
            <h1 className="landing-title">PDF Reader Mode</h1>
            <FileInput
                urlInput={true}
                setPdfObj={setPdfObj}
                setLoading={setLoading}
                setOutputDir={setOutputDir}
            />
            <MenuContainer
                menuVisible={menuVisible}
                setMenuVisible={setMenuVisible}
                theme={theme}
                setTheme={setTheme}
                incrementFontSizeIndex={incrementFontSizeIndex}
                setLineHeight={setLineHeight}
                setBodyWidth={setBodyWidth}
                serif={serif}
                setSerif={setSerif}
                fsIndex={fsIndex}
                lineHeight={lineHeight}
                bodyWidth={bodyWidth}
                fsDict={fsDict}
            />
            <Reader
                outputdir={outputdir}
                pdfObj={pdfObj}
                theme={theme}
                serif={serif}
                fontSize={fsDict[fsIndex]}
                lineHeight={lineHeight}
                bodyWidth={bodyWidth}
                loading={loading}
            />
        </div>
    );
}

export default LandingPage;
