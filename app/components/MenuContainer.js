import React from "react";

import Menu from "./Menu";
import styles from "./MenuContainer.module.css";

export default function MenuContainer(props) {
    if (props.readerVisible) {
    return (
        <div className={styles.menu_container}>
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
                scrollUp={props.scrollUp}
            />
        </div>
    );} else {
        return (
            <div className={styles.menu_container} />
        )
    }
}

