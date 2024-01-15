// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const validator = require("./validator");
validator.checkSetup();

// import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path"); // provide utilities for working with file and directory paths
const uuid = require("uuid");

// get environment variables
require("dotenv").config();

const api = require("./api");

const socketManager = require("./server-socket");

// create a new express server
const app = express();
app.use(validator.checkRoutes);

// allow us to parse POST request data using middleware
app.use(express.json());

app.use(cors());
app.options('*', cors())

// set up a session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        genid: (req) => uuid.v4()
    })
);

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

const port = 3000;
const server = http.Server(app);
socketManager.init(server);

server.listen(port, () => {
    console.log("Server running");
});
