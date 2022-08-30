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
const { http, https } = require('follow-redirects');
const { DownloaderHelper } = require('node-downloader-helper');


// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();
const socketManager = require("./server-socket");

function extractJSON(infile, outputdir, callback) {
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
    const input = PDFServicesSdk.FileRef.createFromLocalFile(infile,
        PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf);
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();
    extractPDFOperation.setInput(input);
    extractPDFOperation.setOptions(options);
    // Extract
    extractPDFOperation.execute(executionContext)
        .then((res1) => {
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
                        fs.unlink(path.resolve(outputdir, zipname), (err) => {
                            if (err) throw err;
                            console.log("Zip file deleted");
                            const pdfObj = JSON.parse(fs.readFileSync(path.resolve(outputdir, "structuredData.json"), 'utf8'));
                            console.log("JS object created")
                            callback({
                                outputdir: outputdir,
                                pdf: pdfObj
                            });
                        })
                    })
                });
            });
        });
}

router.get("/getfromurl", (req, res) => {
    try {
        const sessionId = req.session.id;
        // res.send({}); // "request received"
        // make temporary directory
        fs.mkdtemp(path.join(os.tmpdir(), 'prm-'), (err, folder) => {
            if (err) throw err;
            // Download PDF from url first
            const fname = "input.pdf";
            const inputpath = path.join(folder, fname);
            let source = http;
            if (req.query.fileurl.slice(0, 5) == "https") {
                source = https;
            }
            source.get(req.query.fileurl, (res2) => {
                // const filePath = fs.createWriteStream(inputpath);
                // res2.pipe(filePath);
                // filePath.on("finish", () => {
                //     filePath.close();
                //     console.log("File downloaded");
                //     extractJSON(path.join(folder, fname), folder, (pdfObj) => {
                //         res.send(pdfObj);
                //     });
                // })
                console.log(res2.responseUrl);
            });

            // const dl = new DownloaderHelper(req.query.fileurl, folder, {
            //     headers: {
            //         'Accept': 'application/pdf',
            //         'Content-Type': 'application/pdf'
            //     },
            //     fileName: fname
            // });
            // dl.on('end', () => {
            //     console.log("File downloaded");
            //     extractJSON(path.join(folder, fname), folder, (pdfObj) => {
            //         res.send(pdfObj);
            //         // socketManager.getSocketFromSessionID(sessionId).emit("pdfRendered", pdfObj);
            //     });
            // });
            // dl.on('error', (err) => console.log("Download failed: ", err.message));
            // dl.start().catch(err => console.error(err));
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

router.post("/initsocket", (req, res) => {
    if (req.session.id) {
        socketManager.addSession(req.session.id, socketManager.getSocketFromSocketID(req.body.socketid));
    }
    res.send({});
});

// ***** Everything else (i.e. error) *****
// anything else falls to this "not found" case
router.all("*", (req, res) => {
    res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
