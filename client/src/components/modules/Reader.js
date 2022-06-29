import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";

function Reader(props) {
    // can you assign html tags to variables?
    // warning: p can't be a child of p
    function renderElement(element) {
        let content = [];
        if ("Text" in element) {
            content = [element.Text];
        }
        if ("Kids" in element) {
            content = content.concat(element.Kids.map((kid, index) => renderElement(kid)));
            // add a key to each kid
        }
        var path = element.Path.split("/");
        var last = path[path.length - 1];
        if (last == "StyleSpan") {
            last = path[path.length-2];
        }
        if (last.slice(0, 10) == "HyphenSpan") {
            return;
        }
        if (last.slice(0, 5) == "Title") {
            return <h1>{content}</h1>; // but add "title" class
        }
        if (last.slice(0, 2) == "H6") {
            return <h6>{content}</h6>;
        }
        if (last.slice(0, 2) == "H5") {
            return <h5>{content}</h5>;
        }
        if (last.slice(0, 2) == "H4") {
            return <h4>{content}</h4>;
        }
        if (last.slice(0, 2) == "H3") {
            return <h3>{content}</h3>;
        }
        if (last.slice(0, 2) == "H2") {
            return <h2>{content}</h2>;
        }
        if (last[0] == "H") {
            return <h1>{content}</h1>;
        }
        if (last[0] == "P") {
            return <p>{content}</p>;
        }
        if (last[0] == "R") {
            // wrong; doesn't account for "content"
            if ("Reference" in element) {
                return <a href={element.Reference}>{element.Text}</a>;
            }
            return <a href="#">{element.Text}</a>;
        }
        if (last.slice(0, 5) == "Lbody") {
            return <li>{content}</li>;
        }
        if (last[0] == "L") {
            return <ul>{content}</ul>;
        }
        if (last.slice(0, 5) == "Table") {
            return <table>{content}</table>;
        }
        if (last.slice(0, 2) == "TR") {
            return <tr>{content}</tr>;
        }
        if (last.slice(0, 2) == "TH") {
            return <th>{content}</th>;
        }
        if (last.slice(0, 2) == "TH") {
            return <td>{content}</td>;
        }
        if (last.slice(0, 3) == "Sub") {
            return <p>{content}</p>;
        }
        return <div>{content}</div>;
    }

    var tmpObj = {
        "elements": [
        {
            "Font": {
                "italic": false,
                "monospaced": false,
                "subset": true,
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
                        "subset": true,
                        "weight": 700
                    },
                    "Path": "//Document/P/ParagraphSpan/Sub",
                    "Text": "IreneSolaiman",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P/ParagraphSpan/Sub/Reference",
                    "Text": "∗ ",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P/ParagraphSpan/Sub[2]",
                    "Text": "OpenAI",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": true,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P/ParagraphSpan/Sub[3]",
                    "Text": "irene@openai.com ",
                },
                {
                    "Font": {
                        "font_type": "Type1",
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 700
                    },
                    "Path": "//Document/P/ParagraphSpan[2]/Sub",
                    "Text": "ChristyDennison",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P/ParagraphSpan[2]/Sub/Reference",
                    "Text": "∗ ",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P/ParagraphSpan[2]/Sub[2]",
                    "Text": "OpenAI",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": true,
                        "subset": true,
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
                "subset": true,
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
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P[2]",
                    "Text": "Languagemodelscangenerateharmfulandbiasedoutputsandexhibitun"
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P[2]/HyphenSpan",
                    "Text": "-",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P[2]",
                    "Text": "desirablebehavior.WeproposeaProcessforAdaptingLanguageModelstoSociety(PALMS)withValues-TargetedDatasets,aniterativeprocesstosigniﬁcantlychangemodelbehaviorbycraftingandﬁne-tuningonadatasetthatreﬂectsapredeterminedsetoftargetvalues.Weevaluateourprocessusingthreemetrics:quantitativemetricswithhumanevaluationsthatscoreoutputadherencetoatargetvalue,andtoxicityscoringonout",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P[2]/HyphenSpan[2]",
                    "Text": "-",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P[2]",
                    "Text": "puts;andqualitativemetricsanalyzingthemostcommonwordassociatedwithagivensocialcategory.Througheachiteration,weaddadditionaltrainingdatasetexamplesbasedonobservedshortcomingsfromevaluations.PALMSperformssigniﬁcantlybetteronallmetricscomparedtobaselineandcontrolmodelsforabroadrangeofGPT-3languagemodelsizeswith",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
                        "weight": 400
                    },
                    "Path": "//Document/P[2]/HyphenSpan[3]",
                    "Text": "-",
                },
                {
                    "Font": {
                        "italic": false,
                        "monospaced": false,
                        "subset": true,
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

    return (
        <div>
            {props.pdfObj.elements.map((e) => renderElement(e))}
        </div>
    );
}

export default Reader;
