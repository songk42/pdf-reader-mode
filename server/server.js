// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const validator = require("./validator");
validator.checkSetup();

// import libraries needed for the webserver to work!
const express = require("express"); // backend framework for our node server.
const path = require("path"); // provide utilities for working with file and directory paths

// get environment variables
require("dotenv").config();

const api = require("./api.js");

// create a new express server
const app = express();
app.use(validator.checkRoutes);

// allow us to parse POST request data using middleware
app.use(express.json());

// connect API routes from api.js
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "public");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
    res.sendFile(path.join(reactPath, "index.html"));
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    res.send({
        status: status,
        message: err.message,
    });
});

var server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
server.timeout = 600000; // I really hope this is actually the upper limit...
