import React from "react";
import Dropzone from "./Dropzone";
import UrlInput from "./UrlInput";
import { get } from "../../utilities";

import "./FileInput.css"

function FileInput(props) {
    function callAPI(apiCall, apiInput) {
        get(apiCall, apiInput).then((res) => {
            props.setPdfObj(res.pdf);
            props.setOutputDir(res.outputdir);
            props.scrollDown();
        })
        .catch((err) => {
            throw err;
        });
    }
    return (
        <div className="file-input">
            <UrlInput
                setPdfObj={props.setPdfObj}
                setOutputDir={props.setOutputDir}
                scrollDown={props.scrollDown}
                callAPI={callAPI}
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

export default FileInput;
