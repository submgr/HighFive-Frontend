import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Подобрать заявку");
        this.updateNavigation("volunteer");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/VolunteerAvailableRequests.html");
        return pageContent;
    }
}