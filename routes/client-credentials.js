const express = require("express");
var router = express.Router();
const axios = require("axios");
const url = require("url");

const config = require("../config");
const functions = require("../functions");

var title = "Client Credentials";
var path = "client-credentials";

// home
router.get("/client-credentials", (req, res) => {
    
    res.render("settings", {
        mode: path,
        title: title,
        action: "/" + path + "/token",
        grant_type: "client_credentials",
        scope: "https://graph.microsoft.com/.default"
    });
});

// token
router.post("/client-credentials/token", (req, res) => {

    var tokenUrl = config.token_endpoint;
    var headers = {"Content-Type": "application/x-www-form-urlencoded"};

    // Build post data
    var data = {
        client_id: config.clientId,
        grant_type: "client_credentials",
        client_secret: config.clientSecret,
        scope: req.body.scope ? req.body.scope : "https://graph.microsoft.com/.default"
    }

    var apiResponse;
    var apiError;
    
    axios.post(tokenUrl, new url.URLSearchParams(data), { headers: headers }).then(response => {

        apiResponse = response.data;
                
    }).catch(error => {
        console.log("ERROR!");
        console.log(error.response.data);

        apiResponse = error.response.data;
        apiError = true;
            
    }).then(function () {

        res.render("token", {

            title, title,
            tokenUrl: tokenUrl,
            headers: headers,
            postData: data,
            tokenResponse: apiResponse,
            error: apiError,
            path: path
        });
    });

});

// user
router.get("/client-credentials/user", (req, res) => {

    functions.getUserDetailsFromApi(req, res, title, path, config.userId);

});


module.exports = router;