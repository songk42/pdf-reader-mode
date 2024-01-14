import React from "react";

import Loader from "./Loader";

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
    function handleKids(kids) {
        let content = [];
        for (var kid of kids) {
            let classes = "";
            if ("Font" in kid) classes = getClasses(kid.Font);
            let newContent = "";
            if ("Text" in kid) {
                newContent = kid.Text.replace(/\ue020/g, " ");
                if ("attributes" in kid) {
                    if ("TextPosition" in kid.attributes) {
                        if (kid.attributes.TextPosition == "Sup") newContent = <sup>{newContent}</sup>;
                        else if (kid.attributes.TextPosition == "Sub") newContent = <sub>{newContent}</sub>;
                    }
                }
                if (kid.Path.includes("/Span") || kid.Path.includes("/StyleSpan")) {
                    content.push(<span className={classes}>{newContent}</span>);
                }
                else if (kid.Path.includes("Sub")) {
                    content.push(<span className={classes + " newline"}>{newContent}<br /></span>);
                }
                else if (kid.Path.includes("Reference")) {
                    let ref = '#';
                    if ("Reference" in kid && kid.Reference.slice(0, 5) != "Page ") {
                        ref = kid.Reference;
                    }
                    content.push(<a className={classes} href={ref}>{newContent}</a>);
                }
                else if (!kid.Path.includes("/Lbl")) {
                    content.push(newContent);
                }
            }
        }
        return content;
    };

    function handleList(kids, layer=1) {
        // kids = array of JS objects
        let list = []; // is there a way to determine ordered/unorderedness?
        let listItem = [];
        let nested = false;
        let nestedItems = [];
        // list processing
        for (var i in kids) {
            let currentLayer = kids[i].Path.match(/\/L\b|(\/L\[)/g).length;
            if (nested) {
                if (currentLayer == layer) {
                    listItem.push(<ul>{handleList(nestedItems, layer+1)}</ul>);
                    nestedItems = [];
                    nested = false;
                }
                else {
                    nestedItems.push(kids[i]);
                }
            }
            else {
                let kidPath = kids[i].Path.split('/');
                if (currentLayer > layer) {
                    nested = true;
                    nestedItems.push(kids[i]);
                }
                else if (kidPath.length == 5 && kidPath[4].slice(0, 2) == "LI") {
                    list.push(<li>{listItem}</li>);
                    listItem = [];
                }
                // nested lists
                // else if count("/L") > layer
                // find the first time this ceases to be true
                // then call handleList on that subset
                else {
                    listItem.push(renderElement(kids[i]));
                }
            }
        }
        if (listItem.length > 0) {
            list.push(<li>{listItem}</li>);
        }
        return list;
    };

    function renderElement(element) {
        // get content
        let content = [];
        if ("Text" in element) {
            let text = element.Text.replace(/\ue020/g, " ");
            if ("attributes" in element) {
                if ("TextPosition" in element.attributes) {
                    if (element.attributes.TextPosition == "Sup") text = <sup>{text}</sup>;
                    else if (element.attributes.TextPosition == "Sub") text = <sub>{text}</sub>;
                }
            }
            content = [text];
        }
        if ("Kids" in element) {
            content = content.concat(handleKids(element.Kids));
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
            last = path[path.length - 2];
        }
        if (last.slice(0, 10) == "HyphenSpan") {
            return;
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
        if (last == "P" || (last.length > 1 && last.slice(0, 2) == "P[")) {
            return <p className={classes}>{content}</p>;
        }
        if (last[0] == "R") {
            if ("Reference" in element && element.Reference.slice(0, 5) != "Page ") {
                return <a className={classes} href={element.Reference}>{content}</a>;
            }
            return <a className={classes} href="#">{content}</a>;
        }
        if (last.includes("Span")) {
            return <span className={classes}>{content}</span>;
        }
        if (last.slice(0, 4) == "Foot") {
            return <p className={classes + " footnote"}>{content}</p>;
        }
        if (last.slice(0, 5) == "LBody" || last.slice(0, 3) == "Lbl") {
            return <span className={classes}>{content}</span>;
        }
        if (last[0] == "L" || (last.length > 1 && last.slice(0, 2) == "L[")) {
            return <ul className={classes}>{content}</ul>;
        }
        if (last.slice(0, 3) == "Sub") {
            return <p className={classes}>{content}</p>;
        }
        if (last.slice(0, 4) == "Sect") {
            return <div className={classes + "section"}>{content}</div>;
        }
        if (last.slice(0, 5) == "Aside") {
            return <aside className={classes}>{content}</aside>;
        }
        if (last.slice(0, 6) == "Figure") {
            let path = element.filePaths[0];
            if (path.slice(0, 7) == "figure/") {
                path = "figures/" + path.slice(7);
            }
            // return <img src={require(`./../../../../../pdf-io/output/${path}`).default}></img>; // this is hard-coded for now
        }
        return <div className={classes}>{content}</div>;
    }

    function getPageContent(mainObj) {
        let pageContent = []
        let table = []
        let row = [];
        let cell = [];
        let rowLabel = "TR";
        let cellLabel = "TH";
        for (const obj of mainObj.elements) {
            var path = obj.Path.split("/");
            // process tables separately
            if (path.length > 3 && path[3].slice(0, 5) == "Table") {
                // table processing
                let last = path[path.length - 1];
                if (last.slice(0, 5) == "Table") {
                    if (table.length > 0) {
                        pageContent.push(<table><tbody>{table}</tbody></table>);
                        table = [];
                        rowLabel = "TR";
                        cellLabel = "TH";
                    }
                }
                else {
                    if (path.length > 5 && path[5] != cellLabel) {
                        if (cellLabel[1] == "H") {
                            row.push(<th>{cell}</th>);
                        }
                        else if (cellLabel[1] == "D") {
                            row.push(<td>{cell}</td>);
                        }
                        cellLabel = path[5];
                        cell = [];
                    }
                    if (path.length > 4 && path[4] != rowLabel) {
                        rowLabel = path[4];
                        table.push(<tr>{row}</tr>);
                        row = [];
                    }
                    if (last.slice(0, 2) != "TD" && last.slice(0, 2) != "TH") {
                        cell.push(renderElement(obj));
                    }
                }
            }
            // process lists separately
            else if (path.length > 3 && (path[3] == "L" || (path[3].length > 1 && path[3].slice(0, 2) == "L["))) {
                // residual table processing/adding
                if (cell.length > 0) {
                    if (cellLabel[1] == "H") {
                        row.push(<th>{cell}</th>);
                    }
                    else if (cellLabel[1] == "D") {
                        row.push(<td>{cell}</td>);
                    }
                    cell = [];
                }
                if (row.length > 0) {
                    table.push(<tr>{row}</tr>);
                    row = [];
                }
                if (table.length > 0) {
                    pageContent.push(<table><tbody>{table}</tbody></table>);
                    table = [];
                    rowLabel = "TR";
                    cellLabel = "TH";
                }
                pageContent.push(<ul>{handleList(obj.Kids)}</ul>);
            }
            // everything else
            else {
                // residual table processing/adding
                if (cell.length > 0) {
                    if (cellLabel[1] == "H") {
                        row.push(<th>{cell}</th>);
                    }
                    else if (cellLabel[1] == "D") {
                        row.push(<td>{cell}</td>);
                    }
                    cell = [];
                }
                if (row.length > 0) {
                    table.push(<tr>{row}</tr>);
                    row = [];
                }
                if (table.length > 0) {
                    pageContent.push(<table><tbody>{table}</tbody></table>);
                    table = [];
                    rowLabel = "TR";
                    cellLabel = "TH";
                }
                pageContent.push(renderElement(obj));
            }
        }
        if (cell.length > 0) {
            if (cellLabel[1] == "H") {
                row.push(<th>{cell}</th>);
            }
            else if (cellLabel[1] == "D") {
                row.push(<td>{cell}</td>);
            }
            cell = [];
        }
        if (row.length > 0) {
            table.push(<tr>{row}</tr>);
            row = [];
        }
        if (table.length > 0) {
            pageContent.push(<table><tbody>{table}</tbody></table>);
            table = [];
            rowLabel = "TR";
            cellLabel = "TH";
        }
        return pageContent;
    }

    if (props.loading) {
        return (
            <div
                className={`reader-container reader-container-${props.theme} reader-container-${props.serif ? "serif" : "sans-serif"}`}
                style={{
                    "fontSize": `${props.fontSize}px`,
                    "lineHeight": `${props.lineHeight}em`,
                    "width": `${props.bodyWidth}em`
                }}>
                <Loader />
            </div>
        );
    }

    return (
        <div
            className={`reader-container reader-container-${props.theme} reader-container-${props.serif ? "serif" : "sans-serif"}`}
            style={{
                "fontSize": `${props.fontSize}px`,
                "lineHeight": `${props.lineHeight}em`,
                "width": `${props.bodyWidth}em`
            }}>
            {getPageContent(props.pdfObj)}
        </div>
    );
}

export default Reader;
