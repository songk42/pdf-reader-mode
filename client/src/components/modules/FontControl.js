import React from "react";

import "./Menu.css";

function FontControl(props) {
    return (
        <button
            className={`menu-font menu-${props.font.toLowerCase()}${props.serif == (props.font == "Serif") ? " menu-font-selected" : ""}`}
            style={{ backgroundImage: `url(${props.bg})` }}
            onClick={(e) => props.setSerif(props.font == "Serif")}
        >
            <label>{props.font}</label>
        </button>
    );
}

export default FontControl;