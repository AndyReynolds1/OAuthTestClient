const axios = require("axios");
const config = require("./config");

module.exports = {

    getuserDetailsFromApi: function (req, res, title, path, userId) {
        
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