import * as express from "express";
import * as path from "path";
var expressHandlebars = require("express-handlebars");

const app: express.Express = express();

app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    res.render('home');
});

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