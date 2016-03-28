import * as fs from "fs";

export function readAll(filePaths: string[],
    callback: (errors: NodeJS.ErrnoException[], result: string[]) => void) {
        
    var result: string[] = [];
    var errors: NodeJS.ErrnoException[] = [];
    var count = filePaths.length;

    if (!filePaths || !filePaths.length) {
        callback([], []);
        return;
    }

    filePaths.forEach((s, i) => {

        fs.readFile(s, "UTF8", (err: NodeJS.ErrnoException, data: string) => {
            --count;

            if (err) {
                errors[i] = err;
            }

            if (data) {
                result[i] = data;
            }

            if (!count) {
                callback(errors, result);
            }
        });
    });
}