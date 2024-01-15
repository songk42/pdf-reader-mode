import React from "react";
import Dropzone from "./Dropzone";
import UrlInput from "./UrlInput";

import "./FileInput.css"

export default function FileInput(props) {
    return (
        <div className="file-input">
            <UrlInput
                setPdfObj={props.setPdfObj}
                setOutputDir={props.setOutputDir}
                scrollDown={props.scrollDown}
            />
            {/* <div style={{alignSelf: "center"}}>or</div>
            <Dropzone
                setPdfObj={props.setPdfObj}
                setOutputDir={props.setOutputDir}
                scrollDown={props.scrollDown}
                callAPI={callAPI}
            /> */}
        </div>
    );
}
