// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const validator = require("./validator");
validator.checkSetup();

// import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path"); // provide utilities for working with file and directory paths
const uuid = require("uuid");

// get environment variables
require("dotenv").config();

const api = require("./api.js");

const socketManager = require("./server-socket");

// create a new express server
const app = express();
app.use(validator.checkRoutes);

// allow us to parse POST request data using middleware
app.use(express.json());

// set up a session
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        genid: function(req) { return uuid.v4(); },
    })
);

// connect API routes from api.js
app.use("/api", api);

app.use(cookieParser());

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

const server = http.Server(app);
socketManager.init(server);

server.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
