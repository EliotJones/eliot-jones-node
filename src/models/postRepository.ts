import * as fs from "fs";
import {PagedResult, Post, PostMetadata} from "./entities";
import * as path from "path";
import * as fileReader from "./readMultipleFiles";
import {transform} from "./markdown";

export function getPagedList(page: number, size: number, callback: (result: PagedResult) => void): void {
    fs.readdir("posts", function(err, files) {
        if (err) {
            throw err;
        }

        var metadata = getPostsMetadata(files);
        var start = (page - 1) * size;
        var postsToRead = metadata.slice(start, start + size);
        var filenames = postsToRead.map(m => path.join(__dirname, "..", "posts", m.filename));

        fileReader.readAll(filenames, (err, results) => {
            if (err && err.length) {
                throw "error reading files";
            }
            
            processFiles(page, metadata.length/size, postsToRead, results, callback);        
        });
    });
}

function getPostsMetadata(files: string[]): PostMetadata[] {
    return files.map(name => {
        return new PostMetadata(name);
    }).sort((a, b) => {
        if (a.date === b.date) {
            return 0;
        }
        return a.date > b.date ? -1 : 1;
    });
}

function processFiles(page: number, 
    totalPages: number,
    postsToRead: PostMetadata[],
    results: string[],
    callback: (pagedResult: PagedResult) => void): void {

    var pagedList: PagedResult = {
        page: page,
        totalPages: totalPages,
        posts: results.map(function(text, i) {
            var post: Post = {
                content: transform(text),
                date: postsToRead[i].date
            };

            return post;
        })
    }

    callback(pagedList);
}

function getPost(filename: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void {
    fs.readFile(path.join(__dirname, "..", "posts", filename), "UTF8", callback);
}