import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Мои заявки");
        this.updateNavigation("beneficial");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/BeneficialHome.html");
        return pageContent;
    }
}