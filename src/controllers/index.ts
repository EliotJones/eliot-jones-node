import {Router, Request, Response} from "express";
import * as repo from "../models/postRepository";

const index = Router();

index.get("/", function(req: Request, res: Response, next) {
    var page = 1;
    var pageQuery = req.query.page;
    
    if (pageQuery) {
        var requestedPage = parseInt(pageQuery);
        
        !isNaN(requestedPage) && (page = requestedPage);
    }
    
    repo.getPagedList(page, 5, r => {
        res.render("index", { data : { pagedList: r } })
    });
})

export default index;