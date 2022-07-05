import React from "react";

import "./Menu.css";

function ColorControl(props) {
    const colorLower = props.color.toLowerCase();
    return (
        <button
            className={`menu-color${props.colorScheme==colorLower ? " menu-color-selected" : " "} menu-${colorLower}-button`}
            onClick={(e) => props.setColorScheme(colorLower)}
        >
            <label>{props.color}</label>
        </button>
    );
}

export default ColorControl;