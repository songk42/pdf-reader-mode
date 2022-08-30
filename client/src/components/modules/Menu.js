import React, { useState } from "react";

import FontControl from "./FontControl";
import TextControl from "./TextControl";

import ISans from "../../assets/sansserif.svg";
import ISerif from "../../assets/serif.svg";
import IMinus from "../../assets/minus.svg";
import IPlus from "../../assets/plus.svg";
import INarrower from "../../assets/narrower.svg";
import IWider from "../../assets/wider.svg";
import ICloser from "../../assets/closer.svg";
import IFarther from "../../assets/farther.svg";
import ISansLight from "../../assets/sansserif-light.svg";
import ISerifLight from "../../assets/serif-light.svg";
import IMinusLight from "../../assets/minus-light.svg";
import IPlusLight from "../../assets/plus-light.svg";
import INarrowerLight from "../../assets/narrower-light.svg";
import IWiderLight from "../../assets/wider-light.svg";
import ICloserLight from "../../assets/closer-light.svg";
import IFartherLight from "../../assets/farther-light.svg";

import "./Menu.css";
import ColorControl from "./ColorControl";

function Menu(props) {
    const [showMenu, setMenu] = useState(false);

    const fsDict = [-1, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40, 56, 60, 72, 96, 128]
    const lhDict = [-1, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6]
    const bwDict = [-1, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];

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
                <FontControl
                    font="Sans-serif"
                    serif={props.serif}
                    setSerif={props.setSerif}
                    bg={props.colorScheme=="dark" ? ISansLight : ISans}
                />
                <FontControl
                    font="Serif"
                    serif={props.serif}
                    setSerif={props.setSerif}
                    bg={props.colorScheme=="dark" ? ISerifLight : ISerif}
                />
            </div>
            <TextControl
                num={props.fsLabel}
                increment={changeFS}
                bgSmall={props.colorScheme=="dark" ? IMinusLight : IMinus}
                bgLarge={props.colorScheme=="dark" ? IPlusLight : IPlus}
                hoverSmall="Decrease font size"
                hoverLarge="Increase font size"
            />
            <TextControl
                num={props.bwLabel}
                increment={changeBW}
                bgSmall={props.colorScheme=="dark" ? INarrowerLight : INarrower}
                bgLarge={props.colorScheme=="dark" ? IWiderLight : IWider}
                hoverSmall="Decrease content width"
                hoverLarge="Increase content width"
            />
            <TextControl
                num={props.lhLabel}
                increment={changeLH}
                bgSmall={props.colorScheme=="dark" ? ICloserLight : ICloser}
                bgLarge={props.colorScheme=="dark" ? IFartherLight : IFarther}
                hoverSmall="Decrease line height"
                hoverLarge="Increase line height"
            />
            <div className="menu-color-scheme">
                <ColorControl
                    colorScheme={props.colorScheme}
                    setColorScheme={props.setColorScheme}
                    color="Light"
                />
                <ColorControl
                    colorScheme={props.colorScheme}
                    setColorScheme={props.setColorScheme}
                    color="Dark"
                />
                <ColorControl
                    colorScheme={props.colorScheme}
                    setColorScheme={props.setColorScheme}
                    color="Sepia"
                />
            </div>
        </div>
    );
}

export default Menu;
