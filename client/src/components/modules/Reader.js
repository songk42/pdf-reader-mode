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
        const plen = ppath.length;
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
                    content.push(<div className={classes + " newline"}>{newContent}</div>);
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
        if (last.slice(0, 5) == "Lbody") {
            return <li className={classes}>{content}</li>;
        }
        if (last[0] == "L") {
            return <ul className={classes}>{content}</ul>;
        }
        if (last.slice(0, 5) == "Table") {
            // return <table className={classes}>{content}</table>;
            return <img src={`/home/skim52/pdf-io/output/${element.filePaths[0]}`}></img>; // this is hard-coded for now
            // I dislike this for accessibility reasons
        }
        if (last.slice(0, 2) == "TR") {
            return <tr className={classes}>{content}</tr>;
        }
        if (last.slice(0, 2) == "TH") {
            return <th className={classes}>{content}</th>;
        }
        if (last.slice(0, 2) == "TD") {
            return <td className={classes}>{content}</td>;
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

    const tmpObj = {
        "elements": [
            {
                "Font": {
                    "italic": false,
                    "monospaced": false,
                    "weight": 700
                },
                "Path": "//Document/Title",
                "Text": "Process for Adapting Language Models to Society (PALMS) with Values-Targeted Datasets ",
            },
            {
                "Kids": [
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 700
                        },
                        "Path": "//Document/P/ParagraphSpan/Sub",
                        "Text": "IreneSolaiman",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P/ParagraphSpan/Sub/Reference",
                        "Text": "∗ ",
                        "attributes": {
                            "BaselineShift": 3.625,
                            "TextPosition": "Sup"
                        }
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P/ParagraphSpan/Sub[2]",
                        "Text": "OpenAI",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": true,
                            "weight": 400
                        },
                        "Path": "//Document/P/ParagraphSpan/Sub[3]",
                        "Text": "irene@openai.com ",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 700
                        },
                        "Path": "//Document/P/ParagraphSpan[2]/Sub",
                        "Text": "ChristyDennison",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P/ParagraphSpan[2]/Sub/Reference",
                        "Text": "∗ ",
                        "attributes": {
                            "BaselineShift": 3.625,
                            "TextPosition": "Sup"
                        }
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P/ParagraphSpan[2]/Sub[2]",
                        "Text": "OpenAI",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": true,
                            "weight": 400
                        },
                        "Path": "//Document/P/ParagraphSpan[2]/Sub[3]",
                        "Text": "christy@openai.com ",
                    }
                ],
                "Path": "//Document/P",
            },
            {
                "Font": {
                    "italic": false,
                    "monospaced": false,
                    "weight": 700
                },
                "Path": "//Document/H1",
                "Text": "Abstract ",
            },
            {
                "Kids": [
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P[2]",
                        "Text": "Languagemodelscangenerateharmfulandbiasedoutputsandexhibitun",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P[2]",
                        "Text": "desirablebehavior.WeproposeaProcessforAdaptingLanguageModelstoSociety(PALMS)withValues-TargetedDatasets,aniterativeprocesstosigniﬁcantlychangemodelbehaviorbycraftingandﬁne-tuningonadatasetthatreﬂectsapredeterminedsetoftargetvalues.Weevaluateourprocessusingthreemetrics:quantitativemetricswithhumanevaluationsthatscoreoutputadherencetoatargetvalue,andtoxicityscoringonout",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P[2]",
                        "Text": "puts;andqualitativemetricsanalyzingthemostcommonwordassociatedwithagivensocialcategory.Througheachiteration,weaddadditionaltrainingdatasetexamplesbasedonobservedshortcomingsfromevaluations.PALMSperformssigniﬁcantlybetteronallmetricscomparedtobaselineandcontrolmodelsforabroadrangeofGPT-3languagemodelsizeswith",
                    },
                    {
                        "Font": {
                            "italic": false,
                            "monospaced": false,
                            "weight": 400
                        },
                        "Path": "//Document/P[2]",
                        "Text": "outcompromisingcapabilityintegrity.WeﬁndthattheeﬀectivenessofPALMSincreaseswithmodelsize.Weshowthatsigniﬁcantlyadjustinglanguagemodelbehaviorisfeasiblewithasmall,hand-curateddataset.",
                    }
                ],
                "Path": "//Document/P[2]",
            },
        ]
    };

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
            {props.pdfObj.elements.map((e) => renderElement(e))}
        </div>
    );
}

export default Reader;
