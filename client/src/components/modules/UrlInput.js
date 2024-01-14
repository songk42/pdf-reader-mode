import React, { useState } from "react";

function UrlInput(props) {
    const [fileURL, setFileURL] = useState("");

    function handleUrlSubmit(event) {
        const apiInput = {
            fileurl: fileURL,
        };
        let apiCall = "/api/getfromurl";
        props.callAPI(apiCall, apiInput);
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