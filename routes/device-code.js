const express = require("express");
var router = express.Router();
const axios = require("axios");
const url = require("url");

const config = require("../config");
const functions = require("../functions");

var title = "Device Code";
var path = "device-code";
var callbackUrl = "http://localhost:" + config.port + "/" + path + "/callback";

// home
router.get("/device-code", (req, res) => {
    
    res.render("settings", {
        mode: path,
        title: title,
        action: "/" + path + "/initiate",
        client_id: config.clientId,
        scope: "https://graph.microsoft.com/user.read"
    });
});

// initiate
router.post("/device-code/initiate", (req, res) => {

    var deviceEndpointUrl = config.device_authorization_endpoint;
    var headers = {"Content-Type": "application/x-www-form-urlencoded"};

    // Build post data
    var data = {
        client_id: config.clientId,
        scope: req.body.scope ? req.body.scope : "https://graph.microsoft.com/user.read"
    }

    var apiResponse;
    var apiError;
    
    axios.post(deviceEndpointUrl, new url.URLSearchParams(data), { headers: headers }).then(response => {

        apiResponse = response.data;
                
    }).catch(error => {
        console.log("ERROR!");
        console.log(error.response.data);

        apiResponse = error.response.data;
        apiError = true;
            
    }).then(function () {

        res.render("callback", {

            title, title,
            deviceEndpointUrl: deviceEndpointUrl,
            postData: data,
            headers: headers,
            data: apiResponse,
            error: apiError,
            path: path
        });
    });

});

// token
router.get("/device-code/token", (req, res) => {

    var tokenUrl = config.token_endpoint;
    var headers = {"Content-Type": "application/x-www-form-urlencoded"};

    // Build post data
    var data = {
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        client_id: config.clientId,
        device_code: req.query.device_code
    }

    var apiResponse;
    var apiError;
    
    axios.post(tokenUrl, new url.URLSearchParams(data), { headers: headers }).then(response => {

        apiResponse = response.data;

        if (apiResponse.error)
            apiError = true;
                
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
            path: path,
            user_code: req.query.user_code,
            verification_uri: req.query.verification_uri
        });
    });

});

// user
router.get("/device-code/user", (req, res) => {

    functions.getuserDetailsFromApi(req, res, title, path);

});

module.exports = router;