import React from "react";

import "./Loader.css";

function Loader() {
    return (
        <div class="loader-container">
            <div class="loader">
                <div class="loader-bubble loader-bubble-1"></div>
                <div class="loader-bubble loader-bubble-2"></div>
                <div class="loader-bubble loader-bubble-3"></div>
            </div>
            <p>Loading...</p>
        </div>
    )
}

export default Loader;