import React, { useState } from "react";

import FileInput from "../modules/FileInput";
import MenuContainer from "../modules/MenuContainer";
import Reader from "../modules/Reader";

function LandingPage() {
    const [outputdir, setOutputDir] = useState("");
    const [pdfObj, setPdfObj] = useState({"elements": []});

    const [colorScheme, setColorScheme] = useState("light");
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.6);
    const [bodyWidth, setBodyWidth] = useState(30);
    const [serif, setSerif] = useState(false);
    const [fsLabel, setFsLabel] = useState(3);
    const [lhLabel, setLhLabel] = useState(4);
    const [bwLabel, setBwLabel] = useState(3);

    const [loading, setLoading] = useState(false);

    return (
        <div
            id="landing"
            className={`page-container page-container-${colorScheme}`}>
            <h1 className="landing-title">PDF Reader Mode</h1>
            <FileInput
                urlInput={true}
                setPdfObj={setPdfObj}
                setLoading={setLoading}
                setOutputDir={setOutputDir}
            />
            <MenuContainer
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                setFontSize={setFontSize}
                setLineHeight={setLineHeight}
                setBodyWidth={setBodyWidth}
                serif={serif}
                setSerif={setSerif}
                fsLabel={fsLabel}
                lhLabel={lhLabel}
                bwLabel={bwLabel}
                setFsLabel={setFsLabel}
                setLhLabel={setLhLabel}
                setBwLabel={setBwLabel}
            />
            <Reader
                pdfObj={pdfObj}
                colorScheme={colorScheme}
                serif={serif}
                fontSize={fontSize}
                lineHeight={lineHeight}
                bodyWidth={bodyWidth}
                loading={loading}
            />
        </div>
    );
}

export default LandingPage;
