/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database
| - Sets up server middleware (i.e. addons that enable things like json parsing)
| - Hooks up all the backend routes specified in api.js
| - Fowards frontend routes that should be handled by the React router
| - Sets up error handling in case something goes wrong when handling a request
| - Actually starts the webserver
*/

// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const validator = require("./validator");
validator.checkSetup();

// import libraries needed for the webserver to work!
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user.
const path = require("path"); // provide utilities for working with file and directory paths
require("dotenv").config();

const api = require("./api.js");

// create a new express server
const app = express();
app.use(validator.checkRoutes);

// allow us to parse POST request data using middleware
app.use(express.json());

// set up a session, which will persist login data across requests
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// post size limit
const bodyParser = require("body-parser");
app.use(
    bodyParser.json({
        limit: "50mb",
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
    })
);

// this checks if the user is logged in, and populates "req.user"
// app.use(auth.populateCurrentUser);

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

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
