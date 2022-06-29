import React, { useState } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";

function FileInput(props) {
    const [fileURL, setFileURL] = useState("");
    const fileList = React.createRef();

    function handleSubmit(event) {
        // let file = fileList.current.files[0];
        const apiInput = {
            // fileurl: URL.createObjectURL(file),
            fileurl: fileURL,
        };
        console.log(apiInput);
        let apiCall = "/api/getfromurl";
        // if (fileURL == "") {
        //     apiCall = "/api/getfromfile"
        // }
        get(apiCall, apiInput).then((pdfObj) => {
            props.setPdfObj(pdfObj);
        });

        event.preventDefault();
    }

    // if (props.urlInput) {
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
    // }

    // return (
    //     <form className="file-input" onSubmit={handleSubmit}>
    //         <label>
    //             Upload PDF:
    //             <input type="file" accept="text/pdf" ref={fileList} />
    //         </label>
    //         <button
    //             className="file-submit"
    //             type="submit"
    //         >
    //             Submit
    //         </button>
    //     </form>
    // );
}

export default FileInput;
