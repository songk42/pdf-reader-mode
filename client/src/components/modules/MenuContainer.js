import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";

import "./Menu.css";

function MenuContainer(props) {
    const [showMenu, setMenu] = useState(false);

    return (
        <div className={"menu-container menu-" + props.colorScheme}>
            <button
                className="menu-toggle"
                onClick={(e) => setMenu(!showMenu)}
            >
                Aa
                {/* <span class="hover-label">Type controls</span> */}
            </button>
            {showMenu ? 
            <Menu
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
