import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";

import "./Reader.css";

function Reader(props) {
    // can you assign html tags to variables?
    function getClasses(fontinfo) {
        let classes = [`wt-${fontinfo.weight}`];
        if (fontinfo.italic) {
            classes.push("italic");
        }
        if (fontinfo.monospaced) {
            classes.push("monospaced");
        }
        return classes.join(" ");
    }
    function handleKids(kids, ppath) {
        const plen = ppath.length;
        let content = [];
        for (var kid of kids) {
            let classes = "";
            if ("Font" in kid) classes = getClasses(kid.Font);
            if ("Text" in kid) {
                if (kid.Path.includes("/Span")) {
                    content.push(<span className={classes}>{kid.Text.replace(/\ue020/g, " ")}</span>);
                }
                else if (kid.Path.includes("Sub")) {
                    content.push(<div className={classes+" newline"}>{kid.Text.replace(/\ue020/g, " ")}</div>);
                }
                else {
                    content.push(kid.Text.replace(/\ue020/g, " "));
                }
            }
        }
        return content;
    };

    function renderElement(element) {
        // get content
        let content = [];
        if ("Text" in element) {
            content = [element.Text.replace(/\ue020/g, " ")];
        }
        if ("Kids" in element) {
            content = content.concat(handleKids(element.Kids, element.Path));
            // add a key to each kid
        }
        // get font info
        let font = {};
        if ("Font" in element) {
            font = element.Font;
        }
        else if ("Kids" in element) {
            for (var kid of element.Kids) {
                if (kid.Path == element.Path) {
                    font = kid.Font;
                    break;
                }
            }
        }
        const classes = getClasses(font);
        // get html info
        const path = element.Path.split("/");
        let last = path[path.length - 1];
        if (last == "StyleSpan") {
            last = path[path.length-2];
        }
        if (last.slice(0, 10) == "HyphenSpan") {
            return <span className={classes}>{content}</span>;
        }
        if (last.slice(0, 5) == "Title") {
            return <h1 className={classes + " title-text"}>{content}</h1>; // but add "title" class
        }
        if (last.slice(0, 2) == "H6") {
            return <h6 className={classes}>{content}</h6>;
        }
        if (last.slice(0, 2) == "H5") {
            return <h5 className={classes}>{content}</h5>;
        }
        if (last.slice(0, 2) == "H4") {
            return <h4 className={classes}>{content}</h4>;
        }
        if (last.slice(0, 2) == "H3") {
            return <h3 className={classes}>{content}</h3>;
        }
        if (last.slice(0, 2) == "H2") {
            return <h2 className={classes}>{content}</h2>;
        }
        if (last[0] == "H") {
            return <h1 className={classes}>{content}</h1>;
        }
        if (last[0] == "P") {
            return <p className={classes}>{content}</p>;
        }
        if (last[0] == "R") {
            // if ("Reference" in element) {
            //     return <a className={classes} href={element.Reference}>{content}</a>;
            // }
            return <a className={classes} href="#">{content}</a>;
        }
        if (last.slice(0, 4) == "Foot") {
            return <p className={classes+" footnote"}>{content}</p>;
        }
        if (last.slice(0, 5) == "Lbody") {
            return <li className={classes}>{content}</li>;
        }
        if (last[0] == "L") {
            return <ul className={classes}>{content}</ul>;
        }
        if (last.slice(0, 5) == "Table") {
            return <table className={classes}>{content}</table>;
        }
        if (last.slice(0, 2) == "TR") {
            return <tr className={classes}>{content}</tr>;
        }
        if (last.slice(0, 2) == "TH") {
            return <th className={classes}>{content}</th>;
        }
        if (last.slice(0, 2) == "TH") {
            return <td className={classes}>{content}</td>;
        }
        if (last.slice(0, 3) == "Sub") {
            return <p className={classes}>{content}</p>;
        }
        if (last.slice(0, 4) == "Sect") {
            return <div className={classes+"section"}>{content}</div>;
        }
        if (last.slice(0, 5) == "Aside") {
            return <aside className={classes}>{content}</aside>;
        }
        if (last.slice(0, 6) == "Figure") {
            return <img src={`../../../../../pdf-io/output/${element.filePaths[0]}`}></img>; // this is hard-coded for now
        }
        return <div className={classes}>{content}</div>;
    }

    return (
        <div>
            {/* {tmpObj.elements.map((e) => renderElement(e))} */}
            {props.pdfObj.elements.map((e) => renderElement(e))}
        </div>
    );
}

export default Reader;
