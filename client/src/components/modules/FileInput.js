import React, { useState } from "react";

import { get } from "../../utilities";

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
        get(apiCall, apiInput).then((res) => {
            props.setPdfObj(res.pdf);
            props.setOutputDir(res.outputdir);
            props.setLoading(false);
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
