import React, { useState } from "react";
import { getFromUrl } from "../extractjson.ts";

function UrlInput(props) {
    const [fileURL, setFileURL] = useState("");

    function handleUrlSubmit(event) {
        getFromUrl(fileURL).then((res) => {
            const resParsed = JSON.parse(res);
            props.setPdfObj(JSON.parse(resParsed));
            props.setOutputDir(resParsed.outputdir);
            props.scrollDown();
        })
        .catch((err) => {
            throw err;
        });
        event.preventDefault();
    }

    return (
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
    );
}

export default UrlInput;