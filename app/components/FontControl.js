import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function FontControl(props) {
    const [dropdownClassName, setDropdownClass] = useState("menu-font-list menu-dropdown background hide");

    function toggleDropdown() {
        if (dropdownClassName == "menu-font-list menu-dropdown background hide") {
            setDropdownClass("menu-font-list menu-dropdown background");
        } else {
            setDropdownClass("menu-font-list menu-dropdown background hide");
        }
    }

    return (
        <div className="menu-font-container">
            <div className="menu-font-type" title={"Font family"}>
                <button
                    className="menu-font-selector menu-dropdown-selector field"
                    onClick={(e) => toggleDropdown()}
                >
                    <label>{props.font}</label>
                    <MdOutlineKeyboardArrowDown />
                </button>
                <ul className={dropdownClassName}>
                    <li className="menu-dropdown-item" onClick={(e) => { props.setSerif(false); toggleDropdown(); }}><a className={!props.serif ? "text selected" : "text"}>Sans serif</a></li>
                    <li className="menu-dropdown-item" onClick={(e) => { props.setSerif(true); toggleDropdown(); }}><a className={props.serif ? "text selected" : "text"}>Serif</a></li>
                </ul>
            </div>
            <div className="menu-font-size-selector">
                <button
                    className="menu-button menu-font-size-button menu-text-smaller text"
                    onClick={(e) => props.incrementFontSizeIndex(-1)}
                    disabled={props.fsIndex <= 1}
                    title={"Decrease font size"}
                >
                    -
                </button>
                <label
                    className="font-size-label menu-label field"
                    title={"Font size"}
                >
                    {props.fontSizes[props.fsIndex]}
                </label>
                <button
                    className="menu-button menu-font-size-button menu-text-larger text"
                    onClick={(e) => props.incrementFontSizeIndex(1)}
                    disabled={props.fsIndex >= props.fontSizes.length - 1}
                    title={"Increase font size"}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default FontControl;