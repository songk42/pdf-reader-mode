import React from "react";

import "./Menu.css";

function ColorControl(props) {
    const colorLower = props.color.toLowerCase();
    return (
        <div className="menu-color-container">
            <button
                className={`menu-color${props.colorScheme==colorLower ? " menu-color-selected" : " "} menu-${colorLower}-button`}
                onClick={(e) => props.setColorScheme(colorLower)}
            >
                <label>{props.color}</label>
            </button>
            <div className="menu-color-underline"></div>
        </div>
    );
}

export default ColorControl;