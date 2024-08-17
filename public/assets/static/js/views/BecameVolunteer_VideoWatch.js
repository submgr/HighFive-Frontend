import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Подготовка");
        this.updateNavigation("volunteer");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/BecameVolunteer_VideoWatch.html");
        return pageContent;
    }
}