export class PostMetadata{
    filename : string;
    date: Date;
    name: string;
        
    constructor(filename: string){
        this.filename = filename;
        this.name = filename.substr(0, filename.indexOf("_"))
        .split("-").join(" ");
        this.date = this.parseDate(filename);
    }
    
    private parseDate(filename: string):Date {
        let datePart = filename.substr(filename.indexOf("_") + 1, 8);
        
        var day = parseInt(datePart.slice(0, 2));
        var month = parseInt(datePart.slice(2, 4));
        var year = parseInt(datePart.slice(4, 8));
        
        return new Date(year, month, day);
    }
}

export interface PagedResult {
    page: number;
    totalPages: number;
    posts: Post[];
}

export class Post{
    date: Date;
    content: string;
    
    
}