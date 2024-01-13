import React from "react";
import {TbArrowAutofitWidth, TbLineHeight} from "react-icons/tb";

import FontControl from "./FontControl";
import TextControl from "./TextControl";

import ThemeControl from "./ThemeControl";
import "./Menu.css";

function Menu(props) {

    const lhDict = [1, 1.15, 1.5, 2, 2.5, 3]  // line spacing
    const bwDict = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]; // body width

    return (
        <div className={"menu-controls menu-" + props.theme + " background"}>
            <FontControl
                font={props.serif ? "Serif" : "Sans-serif"}
                serif={props.serif}
                setSerif={props.setSerif}
                fsIndex={props.fsIndex}
                fontSizes={props.fsDict}
                incrementFontSizeIndex={props.incrementFontSizeIndex}
            />
            <div className="menu-separator border" />
            <TextControl
                value={props.bodyWidth}
                change={props.setBodyWidth}
                values={bwDict}
                hover="Content width"
                icon={<TbArrowAutofitWidth className="menu-icon" />}
            />
            <div className="menu-separator border" />
            <TextControl
                value={props.lineHeight}
                change={props.setLineHeight}
                values={lhDict}
                hover="Line spacing"
                icon={<TbLineHeight className="menu-icon" />}
            />
            <div className="menu-separator border" />
            <ThemeControl
                theme={props.theme}
                setTheme={props.setTheme}
            />
        </div>
    );
}

export default Menu;
