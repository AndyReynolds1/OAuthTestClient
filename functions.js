const axios = require("axios");
const url = require("url");
const config = require("./config");

module.exports = {

    // Function used by auth code, auth code with PKCE and hybrid flows
    getAccessToken: function (req, res, postData, title, path) {

        var tokenUrl = config.token_endpoint;
        var headers = {"Content-Type": "application/x-www-form-urlencoded"};

        var apiResponse;
        var apiError;
        var idTokenData;

        axios.post(tokenUrl, new url.URLSearchParams(postData), { headers: headers }).then(response => {

            apiResponse = response.data;
    
            // Check for id_token JWT when using OIDC scopes
            if (apiResponse.id_token) {
                idTokenData = JSON.parse(Buffer.from(apiResponse.id_token.split(".")[1], 'base64').toString('utf-8'));
            }
    
        }).catch(error => {
            console.log("ERROR!");
            console.log(error.response.data);
    
            apiResponse = error.response.data;
            apiError = true;
                
        }).then(function () {

            res.render("token", {
                title: title,
                tokenUrl: tokenUrl,
                headers: headers,
                postData: postData,
                tokenResponse: apiResponse,
                idTokenData: idTokenData,
                error: apiError,
                path: path
            })
        });
    },

    // Function to lookup current user from userinfo API, or if using the client credentials flow searches for a specific user ID via the user search API
    getUserDetailsFromApi: function (req, res, title, path, userId) {
        
        var apiUrl =  !userId ? config.userinfo_endpoint : config.userSearch_endpoint + "/" + userId;
        var authHeader = "Bearer " + req.query.access_token;
        var headers = { "Authorization": authHeader };

        var apiResponse;
        var apiError;

        axios.get(apiUrl , { headers: headers }).then(response => {

            apiResponse = response.data;

        }).catch(error => {

            console.log("ERROR!");
            console.log(error.response.data.error);

            apiResponse = error.response.data.error;
            apiError = true;

        }).then(function () {

            res.render("user", {
                title: title,
                apiUrl: apiUrl,
                headers: headers,
                apiResponse: apiResponse,
                error: apiError,
                path: path
            })
        });
    }
};