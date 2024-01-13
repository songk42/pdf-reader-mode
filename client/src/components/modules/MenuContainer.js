import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";
import "./Menu.css";

function MenuContainer(props) {
    if (props.menuVisible) {
    return (
        <div className="menu-container">
            <Menu
                theme={props.theme}
                setTheme={props.setTheme}
                incrementFontSizeIndex={props.incrementFontSizeIndex}
                setLineHeight={props.setLineHeight}
                setBodyWidth={props.setBodyWidth}
                serif={props.serif}
                setSerif={props.setSerif}
                fsIndex={props.fsIndex}
                lineHeight={props.lineHeight}
                bodyWidth={props.bodyWidth}
                fsDict={props.fsDict}
            />
        </div>
    );} else {
        return (
            <div className="menu-container" />
        )
    }
}

export default MenuContainer;
