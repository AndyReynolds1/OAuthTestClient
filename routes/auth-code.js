const express = require("express");
var router = express.Router();

const config = require("../config");
const functions = require("../functions");

var title = "Auth Code";
var path = "auth-code";
var callbackUrl = config.url + ":" + config.port + "/" + path + "/callback";

// home
router.get("/auth-code", (req, res) => {
    
    res.render("settings", {
        mode: path,
        title: title,
        action: "/" + path + "/initiate",
        response_type: "code",
        scope: "user.read"
    });
});


// initiate
router.post("/auth-code/initiate", (req, res) => {

    // Settings
    var settings = {
        client_id: config.clientId,
        response_type: req.body.response_type,
        redirect_uri: callbackUrl,
        scope: req.body.scope ? encodeURIComponent(req.body.scope) : "https%3A%2F%2Fgraph.microsoft.com%2Fuser.read",
        response_mode: req.body.response_mode,
        state: req.body.state,
        prompt: req.body.prompt ? "consent" : null
    };

    // Build redirect URL
    var redirectUrl = config.authorization_endpoint
        + "?client_id=" + settings.client_id
        + "&response_type=" + settings.response_type
        + "&redirect_uri=" + settings.redirect_uri
        + "&scope=" + settings.scope
        + "&response_mode=" + settings.response_mode
        
        if (settings.state != "") {
            redirectUrl += "&state=" + settings.state
        };
        if (settings.prompt) {
            redirectUrl += "&prompt=" + settings.prompt
        }

    res.render("initiate", {
        title: title,
        authorization_endpoint: config.authorization_endpoint + "?",
        settings: settings,
        redirectUrl: redirectUrl,
        restartUrl: "/" + path
    });

});

// callback
router.get("/auth-code/callback", (req, res) => {

    res.render("callback", { 
        title: title,
        text: "Details returned in query string",
        data: req.query,
        path: path
    })

});
router.post("/auth-code/callback", (req, res) => {

    res.render("callback", { 
        title: title, 
        text: "Details returned in POST data" ,
        data: req.body,
        path: path
    })

});

// token
router.get("/auth-code/token", (req, res) => {

    // Build post data
    var postData = {
        client_id: config.clientId,
        code: req.query.code,
        redirect_uri: callbackUrl,
        grant_type: "authorization_code",
        client_secret: config.clientSecret
    }
    
    functions.getAccessToken(req, res, postData, title, path);

});

// user
router.get("/auth-code/user", (req, res) => {

    functions.getUserDetailsFromApi(req, res, title, path);

});

module.exports = router;