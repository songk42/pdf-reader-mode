import React from "react";

import "./Loader.css";

function Loader() {
    return (
        <div className="loader-container">
            <div className="loader">
                <div className="loader-bubble loader-bubble-1"></div>
                <div className="loader-bubble loader-bubble-2"></div>
                <div className="loader-bubble loader-bubble-3"></div>
            </div>
            <p>Loading...</p>
        </div>
    )
}

export default Loader;