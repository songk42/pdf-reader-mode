import React, { useState } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";

function FileInput() {
    const [fileURL, setFileURL] = useState("");
    const fileUpload = React.createRef();

    function handleSubmit(event) {
        const apiInput = {
            fileurl: fileURL,
            filepath: null,
        };
        // if (filepath === null) {
            get("/api/getfromurl", apiInput).then((pdfObj) => {
                alert(pdfObj.elements.length);
            });
        // }
        
        event.preventDefault();
    }
    
    return (
        <form className="file-input" onSubmit={handleSubmit}>
            <label>
                Paste URL:
                <input
                    type="text"
                    className="file-url"
                    value={fileURL}
                    onChange={(e) => setFileURL(e.target.value)}
                ></input>
            </label>
            <button
                className="file-submit"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}

export default FileInput;
