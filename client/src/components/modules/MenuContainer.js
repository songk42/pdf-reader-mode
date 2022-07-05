import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";

import ISans from "../../assets/sansserif.svg";
import ISansLight from "../../assets/sansserif-light.svg";

import "./Menu.css";

function MenuContainer(props) {
    const [showMenu, setMenu] = useState(false);

    return (
        <div className="menu-container">
            <button
                className="menu-toggle"
                style={{
                    backgroundImage: `url(${props.colorScheme=="dark" ? ISansLight : ISans})`
                }}
                onClick={(e) => setMenu(!showMenu)}
                title="Type controls"
            >
            </button>
            {showMenu ? 
            <Menu
                colorScheme={props.colorScheme}
                setColorScheme={props.setColorScheme}
                setFontSize={props.setFontSize}
                setLineHeight={props.setLineHeight}
                setBodyWidth={props.setBodyWidth}
                serif={props.serif}
                setSerif={props.setSerif}
                fsLabel={props.fsLabel}
                lhLabel={props.lhLabel}
                bwLabel={props.bwLabel}
                setFsLabel={props.setFsLabel}
                setLhLabel={props.setLhLabel}
                setBwLabel={props.setBwLabel}
            />
            : <div></div>}
        </div>
    );
}

export default MenuContainer;
