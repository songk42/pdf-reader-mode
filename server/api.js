/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const express = require("express");
const fs = require("fs");
const os = require("os");
const path = require("path");
const yauzl = require("yauzl");
const { DownloaderHelper } = require('node-downloader-helper');

const tmpDir = os.tmpdir();

// fs.mkdtemp(`${tmpDir}${path.sep}`, (err, folder) => {
//     if (err)
//         console.log(err);
//     else {
//         console.log("The temporary folder path is:", folder);
//     }
// });

function isEmpty(obj) {
    for (var i in obj) {
        return false;
    }
    return true;
}

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

function extractJSON(instream, callback) {
    // ExtractPDF params
    const credentials = PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .withClientId(process.env.CLIENT_ID)
        .withClientSecret(process.env.CLIENT_SECRET)
        .withOrganizationId(process.env.ORG_ID)
        .withAccountId(process.env.ACCT_ID)
        .withPrivateKey(process.env.PRIVATE_KEY)
        .build();
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT)
        .addElementsToExtractRenditions(PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.FIGURES, PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.TABLES)
        .getStylingInfo(true)
        .build()
    const input = PDFServicesSdk.FileRef.createFromLocalFile(instream,
        PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf);
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();
    extractPDFOperation.setInput(input);
    extractPDFOperation.setOptions(options);
    // Extract
    extractPDFOperation.execute(executionContext)
        .then((res1) => {
            const outputdir = path.resolve(__dirname, "../../pdf-io/output");
            const zipname = "text-table-style-info.zip";
            // Save to temporary zip file
            res1.saveAsFile(path.join(outputdir, zipname)).then((res2) => {
                console.log("Zip file saved");
                // Unzip
                yauzl.open(path.join(outputdir, zipname), { autoClose: false, lazyEntries: true }, (err, zipfile) => {
                    if (err) throw err;
                    zipfile.readEntry();
                    zipfile.on("entry", (entry) => {
                        if (/\/$/.test(entry.fileName)) {
                            zipfile.readEntry();
                        } else {
                            fs.mkdir(
                                path.join(outputdir, path.dirname(entry.fileName)),
                                { recursive: true },
                                (err) => {
                                    if (err) throw err;
                                    zipfile.openReadStream(entry, function (err, readStream) {
                                        if (err) throw err;
                                        readStream.on("end", function () {
                                            zipfile.readEntry();
                                        });
                                        const writer = fs.createWriteStream(
                                            path.join(outputdir, entry.fileName)
                                        );
                                        readStream.pipe(writer);
                                    });
                                }
                            );
                        }
                    });
                    zipfile.on("end", (res3) => {
                        zipfile.close();
                        console.log("Unzipped");
                        // res.send({done: true});
                        const pdfObj = JSON.parse(fs.readFileSync(path.resolve(outputdir, "structuredData.json"), 'utf8'));
                        console.log("JS object created")
                        callback(pdfObj);
                    })
                });
            });
        });
}

router.get("/getfromurl", (req, res) => {
    try {
        // Download PDF from url first
        const inputdir = path.resolve(__dirname, "../../pdf-io/input");
        const fname = "input.pdf";
        fetch(req.query.fileurl, inputdir, {
            headers: { 'Content-Type': 'text/pdf' },
            fileName: fname
        })
        .then(fres => fres.blob())
        .then((blob) => {
            console.log("File downloaded");
            extractJSON(stream(blob), (pdfObj) => {
                console.log("asdf");
                res.send(pdfObj);
            });
        });
    } catch (err) {
        console.log('Exception encountered while executing operation', err);
    }
})

router.get("/getfromfile", (req, res) => {
    try {
        // this is going to have to be changed
        extractJSON(req.filepath, (pdfObj) => {
            console.log("asdf");
            res.send(pdfObj);
        });
    } catch (err) {
        console.log('Exception encountered while executing operation', err);
    }
})

// ***** Everything else (i.e. error) *****
// anything else falls to this "not found" case
router.all("*", (req, res) => {
    res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
