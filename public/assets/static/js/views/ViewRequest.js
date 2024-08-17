import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Просмотр заявки");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/ViewRequest.html");
        return pageContent;
    }
}