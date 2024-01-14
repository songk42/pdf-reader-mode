import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import "./Dropzone.css"

function Dropzone(props) {
    const onDrop = useCallback(acceptedFiles => {
        // assert(acceptedFiles.length == 1);
        const file = acceptedFiles[0];
        const apiInput = {
            fileurl: URL.createObjectURL(file),
        };
        props.callAPI("/api/getfromfile", apiInput);
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop
    });

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