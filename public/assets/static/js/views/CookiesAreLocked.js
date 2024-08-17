import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Ошибка");
        this.updateNavigation("error");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/CookiesAreLocked.html");
        return pageContent;
    }
}