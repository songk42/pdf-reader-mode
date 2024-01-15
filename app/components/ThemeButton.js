import React from "react";

import DarkTheme from "../../public/assets/theme-dark.svg";
import LightTheme from "../../public/assets/theme-light.svg";
import SepiaTheme from "../../public/assets/theme-sepia.svg";

export default function ThemeButton(props) {
    const colorLower = props.color.toLowerCase();
    function getImage() {
        const className = "menu-theme-option border" + (props.theme == colorLower ? " selected" : "");
        switch (colorLower) {
            case "dark":
                return <img className={className} src={DarkTheme} alt="Dark theme" />;
            case "light":
                return <img className={className} src={LightTheme} alt="Light theme" />;
            case "sepia":
                return <img className={className} src={SepiaTheme} alt="Sepia theme" />;
            default:
                return <div />;
        }
    }
    return (
        <div className="menu-theme-button menu-dropdown-item">
            <button
                className={"menu-theme-button"}
                onClick={(e) => props.setTheme(colorLower)}
            >
                {getImage()}
                <label className={"text" + (props.theme == colorLower ? " selected" : "")}>{props.color}</label>
            </button>
        </div>
    );
}