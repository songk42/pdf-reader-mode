import React from "react";

import "./Menu.css";

function TextControl(props) {
    return (
        <div className="menu-text-control">
            <button
                className="menu-button menu-text-smaller"
                onClick={(e) => props.increment(-1)}
                disabled={props.num <= 1}
                style={{ backgroundImage: `url(${props.bgSmall})` }}
                title={props.hoverSmall}
            >
            </button>
            <span className="menu-label">{props.num}</span>
            <button
                className="menu-button menu-text-larger"
                onClick={(e) => props.increment(1)}
                disabled={props.num >= props.max - 1}
                style={{ backgroundImage: `url(${props.bgLarge})` }}
                title={props.hoverLarge}
            >
            </button>
        </div>
    );
}

export default TextControl;
