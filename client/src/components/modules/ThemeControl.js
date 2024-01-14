import React, { useState } from "react";
import { MdInvertColors } from "react-icons/md"

import ThemeButton from "./ThemeButton";
import "./Menu.css";

function ThemeControl(props) {
    const [dropdownClassName, setDropdownClass] = useState("menu-theme-list menu-dropdown background hide");

    function toggleDropdown() {
        if (dropdownClassName == "menu-theme-list menu-dropdown background hide") {
            setDropdownClass("menu-theme-list menu-dropdown background");
        } else {
            setDropdownClass("menu-theme-list menu-dropdown background hide");
        }
    }

    return (
        <div className="menu-theme">
            <button
                className="menu-theme-selector menu-button menu-label"
                onClick={(e) => toggleDropdown()}
                title={"Color scheme"}
            >
                <label>{props.font}</label>
                <MdInvertColors className="menu-theme-icon" />
            </button>
            <div className={dropdownClassName}>
                <ThemeButton
                    theme={props.theme}
                    setTheme={props.setTheme}
                    color="Light"
                />
                <ThemeButton
                    theme={props.theme}
                    setTheme={props.setTheme}
                    color="Dark"
                />
                <ThemeButton
                    theme={props.theme}
                    setTheme={props.setTheme}
                    color="Sepia"
                />
            </div>
        </div>
    );
}

export default ThemeControl;