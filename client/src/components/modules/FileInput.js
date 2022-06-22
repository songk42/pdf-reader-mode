import React, { useState } from "react";
import { Link } from "react-router-dom";

function FileInput() {
    const [fileURL, setFileURL] = useState("");
    const fileUpload = React.createRef();

    // handle submit
    function handleSubmit(event) {
        event.preventDefault();
    }

    function resetAll() {
        // setSearchText("");
    }
    
    return (
        <form className="file-input" onSubmit={handleSubmit}>
            <label>
                Upload file:
                <input
                    type="file"
                    className="file-upload"
                    ref={fileUpload}
                ></input>
            </label>
            <label>
                Or paste URL:
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
