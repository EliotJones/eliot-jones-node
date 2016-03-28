import * as marked from "marked";

export function transform(content: string) {
    return marked(content);
}