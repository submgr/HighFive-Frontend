export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
        document.getElementById("header-title-onswipe").textContent = title;
        document.getElementById("header-title-ontopfixed").textContent = title;
    }

    updateNavigation(direction) {
        $(".active-nav").removeClass("active-nav");
        $(".btn_footer_" + direction).addClass("active-nav");
    }

    async getHtml() {
        return "";
    }
}