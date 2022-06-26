/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

function isEmpty(obj) {
    for (var i in obj) {
        return false;
    }
    return true;
}

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/gettext", (req, res) => {
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
            .getStylingInfo(true)
            .build()
    
        // Create a new operation instance.
        const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();
        let input;
        if (req.query.fileurl === null) {
            input = PDFServicesSdk.FileRef.createFromLocalFile(
                req.query.filepath,
                PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
            );
        } else {
            input = PDFServicesSdk.FileRef.createFromURL(req.query.fileurl);
        }
    
        // Set operation input from a source file.
        extractPDFOperation.setInput(input);
    
        // Set options
        extractPDFOperation.setOptions(options);
    
        extractPDFOperation.execute(executionContext)
            .then((result) => {
                result.saveAsFile('../output/text-table-style-info.zip').then((res) => {
                    console.log("zip file saved")
                })
            })
            .catch(err => {
                if(err instanceof PDFServicesSdk.Error.ServiceApiError
                    || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                    console.log('Exception encountered while executing operation', err);
                } else {
                    console.log('Exception encountered while executing operation', err);
                }
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
