import React, { useState, useEffect } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

function Menu(props) {
    const [showMenu, setMenu] = useState(false);
    const [fsLabel, setFsLabel] = useState(3);
    const [lhLabel, setLhLabel] = useState(4);
    const [bwLabel, setBwLabel] = useState(3);

    const fsDict = [-1, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40, 56, 60, 72, 96, 128]

    function changeFS(inc) {
        if (!((fsLabel == 1 && inc == -1) || (fsLabel == 15 && inc == 1))) {
            setFsLabel(fsLabel+inc);
            props.setFontSize(fsDict[fsLabel+inc1]);
        }
    }

    return (
        <div className="menu-controls">
            <div className="menu-fonts">
                <button
                    className="menu-font menu-sans-serif"
                    onClick={(e) => props.setSerif(false)}
                >
                    <label>Sans-serif</label>
                    <span>Aa</span>
                </button>
                <button
                    className="menu-font menu-serif"
                    onClick={(e) => props.setSerif(true)}
                >
                    <label>Serif</label>
                    <span>Aa</span>
                </button>
            </div>
            <div className="menu-text menu-font-size">
                <button
                    className="menu-text-smaller"
                    onClick={(e) => changeFS(-1)}
                >
                    <label><IoRemove /></label>
                </button>
                <span>{fsLabel}</span>
                <button
                    className="menu-text-larger"
                    onClick={(e) => changeFS(1)}
                >
                    <label><IoAdd /></label>
                </button>
            </div>
        </div>
    );
}

export default Menu;
