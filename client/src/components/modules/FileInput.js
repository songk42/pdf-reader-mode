import React, { useState, useEffect } from "react";

import Dropzone from "./Dropzone";

import "./FileInput.css"

function FileInput(props) {
    const [fileURL, setFileURL] = useState("");

    function handleUrlSubmit(event) {
        props.setLoading(true);
        const apiInput = {
            fileurl: fileURL,
        };
        let apiCall = "/api/getfromurl";
        get(apiCall, apiInput).then((res) => {
            props.setPdfObj(res.pdf);
            props.setOutputDir(res.outputdir);
            props.setLoading(false);
        })
            .catch((err) => {
                throw err;
            });
        event.preventDefault();
    }

    return (
        <div className="file-input">
            <form className="file-upload-url" onSubmit={handleUrlSubmit}>
                <label className="file-label">
                    Import PDF from URL
                </label>
                <div className="file-url-input">
                    <input
                        type="text"
                        className="file-url field border"
                        value={fileURL}
                        onChange={(e) => setFileURL(e.target.value)}
                        placeholder="Enter URL"
                    ></input>
                    <button
                        className="file-submit"
                        type="submit"
                    >
                        Upload
                    </button>
                </div>
            </form>
            <div style={{alignSelf: "center"}}>or</div>
            <Dropzone />
        </div>
    );
}

export default FileInput;
