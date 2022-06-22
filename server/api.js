/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

function isEmpty(obj) {
    for (var i in obj) {
        return false;
    }
    return true;
}

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// ***** Everything else (i.e. error) *****
// anything else falls to this "not found" case
router.all("*", (req, res) => {
    res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
