import React, { useRef, useState } from "react";

import About from "../modules/About";
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
    const [readerVisible, setReaderVisible] = useState(false);

    const fsDict = [-1, 12, 14, 16, 18, 20, 24, 28, 32, 40, 56, 60, 72, 96]  // font size
    function incrementFontSizeIndex(inc) {
        setFontSizeIndex(fsIndex + inc);
    }

    const scrollRef = useRef(null);
    const readRef = useRef(null);

    function scrollToTop() {
        scrollRef.current.scrollIntoView({behavior: "smooth"});
        setReaderVisible(false);
    }

    function scrollToRead() {
        readRef.current.scrollIntoView({behavior: "smooth"});
        setReaderVisible(true);
    }

    return (
        <div
            id="landing"
            className={`page-container page-container-${theme}`}>
            <h1 className="landing-title" ref={scrollRef}>PDF Reader Mode</h1>
            <FileInput
                setPdfObj={setPdfObj}
                setOutputDir={setOutputDir}
                scrollDown={scrollToRead}
            />
            {/* TODO: add a "scroll-to-read" button */}
            <div className="scroll-to-read" ref={readRef} />
            <MenuContainer
                readerVisible={readerVisible}
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
                scrollUp={scrollToTop}
            />
            <Reader
                readerVisible={readerVisible}
                outputdir={outputdir}
                pdfObj={pdfObj}
                theme={theme}
                serif={serif}
                fontSize={fsDict[fsIndex]}
                lineHeight={lineHeight}
                bodyWidth={bodyWidth}
            />
            <About />
        </div>
    );
}

export default LandingPage;
