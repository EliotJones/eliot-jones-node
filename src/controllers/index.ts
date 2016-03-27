import {Router, Request, Response} from "express";

const index = Router();

index.get("/", function (req:Request, res:Response, next) {
    res.render("index");
})

export default index;