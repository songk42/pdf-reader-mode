import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import "./Dropzone.css"

function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop
    });

    function handleFileSubmit(event) {
        props.setLoading(true);
        let file = fileList.current.files[0];
        const apiInput = {
            fileurl: URL.createObjectURL(file),
        };
        get("/api/getfromfile", apiInput).then((res) => {
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
        <div className="file-upload-local field border" {...getRootProps()}>
            <div className="file-upload-local-inner field border">
                <input {...getInputProps()} />
                <div className="file-upload-local-text">Drag & drop or choose file to upload</div>
            </div>
        </div>
    )
}

export default Dropzone;