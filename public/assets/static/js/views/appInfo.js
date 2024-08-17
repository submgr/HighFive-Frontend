import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Дай пять!");
        this.updateNavigation("about");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/appInfo.html");
        return pageContent;
    }
}