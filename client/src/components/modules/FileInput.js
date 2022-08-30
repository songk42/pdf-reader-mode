import React, { useState, useEffect } from "react";

import { socket } from "../../client-socket";
import { get, post } from "../../utilities";

import "./FileInput.css"

function FileInput(props) {
    const [fileURL, setFileURL] = useState("");
    const fileList = React.createRef();

    function handleSubmit(event) {
        props.setLoading(true);
        // let file = fileList.current.files[0];
        const apiInput = {
            // fileurl: URL.createObjectURL(file),
            fileurl: fileURL,
        };
        let apiCall = "/api/getfromurl";
        // if (fileURL == "") {
        //     apiCall = "/api/getfromfile"
        // }
        // when is socket.id initialized?
        get(apiCall, apiInput).then((res) => {
            props.setPdfObj(res.pdf);
            props.setOutputDir(res.outputdir);
            props.setLoading(false);
        });
        event.preventDefault();
    }

    // useEffect(() => {
    //     const callback = (res) => {
    //         props.setPdfObj(res.pdf);
    //         props.setOutputDir(res.outputdir);
    //         props.setLoading(false);
    //     };
    //     socket.on("pdfRendered", callback); // call socket.emit("pdfRendered") at some point
    //     return () => {
    //         socket.off("pdfRendered", callback);
    //     }
    // }, []);

    // if (props.urlInput) {
        return (
            <form className="file-input" onSubmit={handleSubmit}>
                <label className="file-label">
                    Enter PDF URL:
                </label>
                <input
                    type="text"
                    className="file-url"
                    value={fileURL}
                    onChange={(e) => setFileURL(e.target.value)}
                ></input>
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
