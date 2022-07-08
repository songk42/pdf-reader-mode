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
    function handleKids(kids, ppath) {
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
                if (kid.Path.includes("/Span")) {
                    content.push(<span className={classes}>{newContent}</span>);
                }
                else if (kid.Path.includes("Sub")) {
                    content.push(<span className={classes + " newline"}>{newContent}<br /></span>);
                }
                else if (kid.Path.includes("/LBody")) {
                    content.push(<li className={classes}>{content}</li>);
                }
                else {
                    content.push(newContent);
                }
            }
        }
        return content;
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
            last = path[path.length - 2];
        }
        if (last.slice(0, 10) == "HyphenSpan") {
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
            return <p className={classes + " footnote"}>{content}</p>;
        }
        if (last.slice(0, 5) == "LBody") {
            return <li className={classes}>{content}</li>;
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

    function getPageContent() {
        let pageContent = []
        let table = []
        let row = [];
        let cell = [];
        let rowLabel = "TR";
        let cellLabel = "TH";
        for (const obj of props.pdfObj.elements) {
            var path = obj.Path.split("/");
            // process tables separately
            if (path.length > 3 && path[3].slice(0, 5) == "Table") {
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
                        table.push(<tr>{row}</tr>)
                        row = [];
                    }
                    if (last.slice(0, 2) != "TD" && last.slice(0, 2) != "TH") {
                        cell.push(renderElement(obj));
                    }
                }
            }
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
                className={`reader-container reader-container-${props.colorScheme} reader-container-${props.serif ? "serif" : "sans-serif"}`}
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
            className={`reader-container reader-container-${props.colorScheme} reader-container-${props.serif ? "serif" : "sans-serif"}`}
            style={{
                "fontSize": `${props.fontSize}px`,
                "lineHeight": `${props.lineHeight}em`,
                "width": `${props.bodyWidth}em`
            }}>
            {/* {tmpObj.elements.map((e) => renderElement(e))} */}
            {getPageContent()}
        </div>
    );
}

export default Reader;
