/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
'use server';

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require("fs");
const os = require("os");
const path = require("path");
const yauzl = require("yauzl");
const { http, https } = require('follow-redirects');

export async function getFromUrl(fileurl: string) {
    'use server';
    // make temporary directory
    const now = new Date(Date.now()).toISOString();
    fs.mkdtemp(path.join(os.tmpdir(), `prm-${now}-`), (err: Error, folder: string) => {
        if (err) {
            throw `error: could not create temporary directory\n${err}`;
        }
        // Download PDF from url first
        const fname = "prm-input.pdf";
        const inputpath: string = path.join(folder, fname);
        let source = http;
        if (fileurl.slice(0, 5) == "https") {
            source = https;
        }
        source.get(fileurl, (res2) => {
            const filePath = fs.createWriteStream(inputpath);
            res2.pipe(filePath);
            filePath.on("finish", () => {
                filePath.close();
                console.log("File downloaded");
                extractJSON(path.join(folder, fname), folder, (pdfObj) => {
                    return pdfObj;
                });
            })
        });
    });
    return Response.json({ }, {status: 500});
}

function extractJSON(infile: string, outputdir: string, callback) {
    // ExtractPDF params
    const credentials = PDFServicesSdk.Credentials
        .servicePrincipalCredentialsBuilder()
        .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
        .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
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
                            const pdfStr = fs.readFileSync(path.resolve(outputdir, "structuredData.json"), 'utf8');
                            const pdfObj = JSON.parse(pdfStr);
                            pdfObj["outputdir"] = outputdir;
                            console.log("JS object created")
                            console.log(typeof outputdir)
                            callback(JSON.stringify(pdfObj));
                        })
                    })
                });
            });
        })
        .catch((err) => {
            throw err;
        });
}
