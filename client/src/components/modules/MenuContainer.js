import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";

function MenuContainer(props) {
    const [showMenu, setMenu] = useState(false);

    return (
        <div className={"menu-" + props.colorScheme}>
            <button
                className="menu-toggle"
                onClick={(e) => setMenu(!showMenu)}
            >
                Aa
                {/* <span class="hover-label">Type controls</span> */}
            </button>
            {showMenu ? 
            <Menu
                setFontSize={props.setFontSize}
                setLineHeight={props.setLineHeight}
                setBodyWidth={props.setBodyWidth}
                setSerif={props.setSerif}
            />
            : <div></div>}
        </div>
    );
}

export default MenuContainer;
