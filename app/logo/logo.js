class Logo {
    constructor(contentJs) {
        this.contentJs = contentJs;
        this.navs = [];
    }
    addNav(tab, action) {
        this.navs.push(tab);
        let navEl = this.contentJs.querySelector('.logo-navigation');
        let tabNavEl = template2Js('<div class="tab-nav tab-nav-{{name}}">{{ name }}</div>', { name: tab.name });
        tabNavEl.addEventListener('click', action);
        navEl.appendChild(tabNavEl);
    }
    removeNav(name) {
        for (let nav of this.navs) {
            if (nav.name === name) {
                this.navs.splice(this.navs.indexOf(nav), 1);
                let el = this.content().querySelector('.tab-nav-' + name);
                el.parentNode.removeChild(el);
                break;
            }
        }
    }
    content() {
        return this.contentJs;
    }
}