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

router.get("/getfromurl", (req, res) => {
    try {
        // Initial setup, create credentials instance.
        const credentials =  PDFServicesSdk.Credentials
            .serviceAccountCredentialsBuilder()
            .withClientId(process.env.CLIENT_ID)
            .withClientSecret(process.env.CLIENT_SECRET)
            .withOrganizationId(process.env.ORG_ID)
            .withAccountId(process.env.ACCT_ID)
            .withPrivateKey(process.env.PRIVATE_KEY)
            .build();
        // Create an ExecutionContext using credentials
        const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
        // Build extractPDF options
        const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
            .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
            // .addElementsToExtractRenditions(PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.FIGURES)
            .getStylingInfo(true)
            .build()
        // Create a new operation instance.
        const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();
        // input = PDFServicesSdk.FileRef.createFromLocalFile(
        //     req.query.filepath,
        //     PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
        // );
        // Download PDF from url first
        const inputdir = path.resolve(__dirname, "../input");
        const fname = "input.pdf";
        const outname = path.resolve(__dirname, "../output/text-table-style-info.zip");
        const dl = new DownloaderHelper(req.query.fileurl, inputdir, {
            headers: {'Content-Type': 'text/pdf'},
            fileName: fname
        });
        dl.on('end', () => {
            console.log("file downloaded");
            // Then create the ExtractPDF input
            const input = PDFServicesSdk.FileRef.createFromLocalFile(`${inputdir}${path.sep}${fname}`,
                PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf);
            // Set operation input from a source file.
            extractPDFOperation.setInput(input);
            // Set options
            extractPDFOperation.setOptions(options);
            extractPDFOperation.execute(executionContext)
                .then((result) => {
                    result.saveAsFile(outname).then((res) => {
                        console.log("zip file saved")
                    })
                })
                .catch(err => {
                    if(err instanceof PDFServicesSdk.Error.ServiceApiError
                        || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                        console.log("Exception encountered while executing operation", err);
                    } else {
                        console.log("Exception encountered while executing operation", err);
                    }
                });
        });
        dl.on('error', (err) => console.log("download failed: ", err.message));
        dl.start().catch(err => console.error(err));
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
