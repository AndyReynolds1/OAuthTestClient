const express = require("express");
var router = express.Router();
const crypto = require("crypto");
const base64url = require("base64url");

const config = require("../config");
const functions = require("../functions");

var title = "Auth Code With PKCE";
var path = "auth-code-pkce";
var callbackUrl = config.url + ":" + config.port + "/" + path + "/callback";

// home
router.get("/auth-code-pkce", (req, res) => {
    
    res.render("settings", {
        mode: path,
        title: title,
        action: "/" + path + "/initiate",
        response_type: "code",
        scope: "user.read",
        code_verifier: config.code_verifier,
        code_challenge_method: "S256"
    });
});

// initiate
router.post("/auth-code-pkce/initiate", (req, res) => {

    // Hash code_verifier
    const base64Digest = crypto.createHash("sha256").update(req.body.code_verifier).digest("base64");
    const code_challenge = base64url.fromBase64(base64Digest);

    // Settings
    var settings = {
        client_id: config.clientId,
        response_type: req.body.response_type,
        redirect_uri: callbackUrl,
        scope: req.body.scope ? encodeURIComponent(req.body.scope) : "https%3A%2F%2Fgraph.microsoft.com%2Fuser.read",
        response_mode: req.body.response_mode,
        code_challenge: code_challenge,
        code_challenge_method: req.body.code_challenge_method,
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
        + "&code_challenge=" + settings.code_challenge
        + "&code_challenge_method=" + settings.code_challenge_method

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
router.get("/auth-code-pkce/callback", (req, res) => {

    res.render("callback", { 
        title: title,
        text: "Details returned in query string",
        data: req.query,
        path: path
    })

});
router.post("/auth-code-pkce/callback", (req, res) => {

    res.render("callback", { 
        title: title, 
        text: "Details returned in POST data" ,
        data: req.body,
        path: path
    })

});

// token
router.get("/auth-code-pkce/token", (req, res) => {

    // Build post data
    var postData = {
        client_id: config.clientId,
        code: req.query.code,
        redirect_uri: callbackUrl,
        grant_type: "authorization_code",
        client_secret: config.clientSecret,
        code_verifier: config.code_verifier
    }
    
    functions.getAccessToken(req, res, postData, title, path);

});

// user
router.get("/auth-code-pkce/user", (req, res) => {

    functions.getUserDetailsFromApi(req, res, title, path);

});

module.exports = router;