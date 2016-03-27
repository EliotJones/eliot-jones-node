import * as express from "express";
import * as path from "path";
var expressHandlebars = require("express-handlebars");

import index from "./controllers/index";

const app: express.Express = express();

app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);

if (app.get("env") === "development") {
    app.use((error: any, req, res, next) => {
        res.status(error["status"] || 500);
        res.render("error", {
            message: error.message,
            error
        });
    });
};

app.use((error: any, req, res, next) => {
    res.status(error["status"] || 500);
    res.render("error", {
        message: error.message,
        error: {}
    });
    return null;
});

export default app;