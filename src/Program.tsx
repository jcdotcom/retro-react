export default class Program{
    title: string;
    content: string[];

    constructor(title = "null", content = ["o"]){
        this.title = title;
        this.content = content;
    }
}