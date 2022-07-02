import React, { useState, useEffect } from "react";

import ISans from "../../assets/sansserif.svg";
import ISerif from "../../assets/serif.svg";
import IMinus from "../../assets/minus.svg";
import IPlus from "../../assets/plus.svg";
import INarrower from "../../assets/narrower.svg";
import IWider from "../../assets/wider.svg";
import ICloser from "../../assets/closer.svg";
import IFarther from "../../assets/farther.svg";

import "./Menu.css";

function Menu(props) {
    const [showMenu, setMenu] = useState(false);

    const fsDict = [-1, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40, 56, 60, 72, 96, 128]
    const lhDict = [-1, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6]
    const bwDict = [-1, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    function changeFS(inc) {
        if (!((props.fsLabel == 1 && inc == -1) || (props.fsLabel == fsDict.length-1 && inc == 1))) {
            props.setFsLabel(props.fsLabel+inc);
            props.setFontSize(fsDict[props.fsLabel+inc]);
        }
    }
    function changeLH(inc) {
        if (!((props.lhLabel == 1 && inc == -1) || (props.lhLabel == lhDict.length-1 && inc == 1))) {
            props.setLhLabel(props.lhLabel+inc);
            props.setLineHeight(lhDict[props.lhLabel+inc]);
        }
    }
    function changeBW(inc) {
        if (!((props.bwLabel == 1 && inc == -1) || (props.bwLabel == bwDict.length-1 && inc == 1))) {
            props.setBwLabel(props.bwLabel+inc);
            props.setBodyWidth(bwDict[props.bwLabel+inc]);
        }
    }

    return (
        <div className={"menu-controls menu-" + props.colorScheme}>
            <div className="menu-fonts">
                <button
                    className={`menu-font menu-sans-serif${props.serif ? "" : " menu-font-selected"}`}
                    onClick={(e) => props.setSerif(false)}
                >
                    <label>Sans-serif</label>
                    <p>Aa</p>
                </button>
                <button
                    className={`menu-font menu-serif${props.serif ?" menu-font-selected" : ""}`}
                    onClick={(e) => props.setSerif(true)}
                >
                    <label>Serif</label>
                    <p>Aa</p>
                </button>
            </div>
            <div className="menu-text-control menu-font-size">
                <button
                    className="menu-button menu-text-smaller"
                    onClick={(e) => changeFS(-1)}
                    disabled={props.fsLabel <= 1}
                    style={{
                        backgroundImage: `url(${IMinus})`
                    }}
                >
                </button>
                <span className="menu-label">{props.fsLabel}</span>
                <button
                    className="menu-button menu-text-larger"
                    onClick={(e) => changeFS(1)}
                    disabled={props.fsLabel >= fsDict.length - 1}
                    style={{
                        backgroundImage: `url(${IPlus})`
                    }}
                >
                </button>
            </div>
            <div className="menu-text-control menu-body-width">
                <button
                    className="menu-button menu-text-smaller"
                    onClick={(e) => changeBW(-1)}
                    disabled={props.bwLabel <= 1}
                    style={{
                        backgroundImage: `url(${INarrower})`
                    }}
                >
                </button>
                <span className="menu-label">{props.bwLabel}</span>
                <button
                    className="menu-button menu-text-larger"
                    onClick={(e) => changeBW(1)}
                    disabled={props.bwLabel >= bwDict.length - 1}
                    style={{
                        backgroundImage: `url(${IWider})`
                    }}
                >
                </button>
            </div>
            <div className="menu-text-control menu-line-height">
                <button
                    className="menu-button menu-text-smaller"
                    onClick={(e) => changeLH(-1)}
                    disabled={props.lhLabel <= 1}
                    style={{
                        backgroundImage: `url(${ICloser})`
                    }}
                >
                </button>
                <span className="menu-label">{props.lhLabel}</span>
                <button
                    className="menu-button menu-text-larger"
                    onClick={(e) => changeLH(1)}
                    disabled={props.lhLabel >= lhDict.length - 1}
                    style={{
                        backgroundImage: `url(${IFarther})`
                    }}
                >
                </button>
            </div>
            <div className="menu-color-scheme">
                <button
                    className="menu-color menu-light-button"
                    onClick={(e) => props.setColorScheme("light")}
                >
                    <label>Light</label>
                </button>
                <button
                    className="menu-color menu-dark-button"
                    onClick={(e) => props.setColorScheme("dark")}
                >
                    <label>Dark</label>
                </button>
                <button
                    className="menu-color menu-sepia-button"
                    onClick={(e) => props.setColorScheme("sepia")}
                >
                    <label>Sepia</label>
                </button>
            </div>
        </div>
    );
}

export default Menu;
