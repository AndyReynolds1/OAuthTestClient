// Required External Modules
const express = require("express");
const path = require("path");

// App Variables
const config = require('./config');
const app = express();
app.use(express.urlencoded({ extended: true }));

// App Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Routes Definitions
app.get("/", (req, res) => {
    res.render("home", { navLink: "home", title: "Home" });
});
app.get("/terminology", (req, res) => {
    res.render("terminology", { navLink: "terminology", title: "Home" });
});

app.use(require("./routes/auth-code"));
app.use(require("./routes/auth-code-pkce"));
app.use(require("./routes/client-credentials"));
app.use(require("./routes/implicit"));
app.use(require("./routes/hybrid"));
app.use(require("./routes/device-code"));

// Server Activation
app.listen(config.port, () => {
    console.log(`Listening to requests on ${config.url}:${config.port}`);
});