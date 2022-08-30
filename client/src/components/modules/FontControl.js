import React from "react";

import "./Menu.css";

function FontControl(props) {
    return (
        <div className="menu-font-container">
            <button
                className={`menu-font menu-${props.font.toLowerCase()}${props.serif == (props.font == "Serif") ? " menu-font-selected" : ""}`}
                style={{ backgroundImage: `url(${props.bg})` }}
                onClick={(e) => props.setSerif(props.font == "Serif")}
            >
                <label>{props.font}</label>
            </button>
            <div className="menu-font-underline"></div>
        </div>
    );
}

export default FontControl;