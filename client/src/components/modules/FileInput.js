import React, { useState } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";

function FileInput() {
    const [fileURL, setFileURL] = useState("");
    const fileUpload = React.createRef();

    function isValidPDF(file) {
        if (file.type === "application/pdf") {
            return true;
        }
        if (file.type === "" && file.name) {
            const fileName = file.name;
            const lastDotIndex = fileName.lastIndexOf(".");
            if (lastDotIndex === -1 || fileName.substr(lastDotIndex).toUpperCase() !== "PDF") return false;
            return true;
        }
        return false;
    };

    function handleSubmit(event) {
        const pdfObj = {
            fileurl: fileURL,
            filepath: null,
        };
        // if (filepath === null) {
            get("/api/getfromurl", pdfObj).then((res) => {
                alert("asdf")
            });
        // }
        
        event.preventDefault();
    }

    function resetAll() {
        setFileURL("");
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
