class TabSet {
    constructor() {
        this.tabs = [];
        this.contentJs = template2Js('<div class="tabset"></div>');
    }
    select(posOrName) {
        let prop;
        if (typeof posOrName === 'string') {
            prop = 'name';
        } else {
            prop = 'pos';
        }
        let selected;
        this.tabs.forEach((tab) => {
            if (tab[prop] === posOrName) {
                tab.select();
                selected = tab;
            } else {
                tab.unselect();
            }
        });
        return selected;
    }
    addTab(tab) {
        tab.pos = this.tabs.length;
        this.tabs.push(tab);
        this.contentJs.appendChild(tab.content());
    }
    getTab(name) {
        for (let tab of this.tabs) {
            if (tab.name === name) return tab;
        }
    }
    content() {
        return this.contentJs;
    }
}

class Tab {
    constructor(name, contentJs, selected) {
        this.name = name;
        this.contentJs = contentJs;
        if (!selected) {
            this.unselect();
        }
    }
    select() {
        this.contentJs && this.contentJs.classList.remove('hidden');
        this.selected = true;
    }
    unselect() {
        this.contentJs && this.contentJs.classList.add('hidden');
        this.selected = false;
    }
    content() {
        return this.contentJs;
    }
}