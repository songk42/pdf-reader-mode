import React, { useState } from "react";

import "./Menu.css";

function TextControl(props) {
    const [dropdownClassName, setDropdownClass] = useState("menu-font-list menu-dropdown background hide");

    function toggleDropdown() {
        if (dropdownClassName == "menu-font-list menu-dropdown background hide") {
            setDropdownClass("menu-font-list menu-dropdown background");
        } else {
            setDropdownClass("menu-font-list menu-dropdown background hide");
        }
    }

    return (
        <div className="menu-text-control" title={props.hover}>
            <button
                className="menu-text-selector menu-dropdown-selector menu-label field"
                onClick={(e) => toggleDropdown()}
                >
                {props.icon}
            </button>
            {/* <label className="text-selector-label">{props.value}</label> */}
            <ul className={dropdownClassName}>
                {props.values.map((value) =>
                    <li className="menu-dropdown-item" onClick={(e) => {props.change(value); toggleDropdown();}}><a>{value}</a></li>
                )}
            </ul>
        </div>
    );
}

export default TextControl;
