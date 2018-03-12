class MySelect {
    constructor(options, selectedTemplate, optionTemplate) {
        this.options = options;
        this.selectedTemplate = selectedTemplate;
        this.optionTemplate = optionTemplate;
        this.onSelectListeners = [];
        this.init();
    }
    init() {
        this.selectedOption = undefined;
        this.contentJs = template2Js(getHTML(pages.MY_SELECT));

        // selected area
        this.selectedAreaEl = this.contentJs.querySelector('.my-select-selected');
        this.selectedAreaEl.addEventListener('click', (e) => {
            this.openDropdown();
            e.stopPropagation();
            hideOnClickOutside(this.selectOptionsEl, this.closeDropdown.bind(this));
        });
        this.updateSelectedArea();

        // options dropdown
        this.selectOptionsEl = this.contentJs.querySelector('.my-select-options');
        for (let option of this.options) {
            let optionJs = template2Js(this.optionTemplate, {
                option: option
            });
            optionJs.addEventListener('click', () => {
                this.select(option);
                this.closeDropdown();
            });
            this.selectOptionsEl.appendChild(optionJs);
        }
    }
    updateSelectedArea() {
        let selectedJs = template2Js(this.selectedTemplate, {
            option: this.selectedOption
        });
        this.selectedAreaEl.innerHTML = selectedJs.outerHTML;
    }
    select(option) {
        this.selectedOption = option;
        this.updateSelectedArea();
        for (let listener of this.onSelectListeners) {
            listener(option);
        }
    }
    openDropdown() {
        this.selectOptionsEl.classList.remove('hidden');
    }
    closeDropdown() {
        this.selectOptionsEl.classList.add('hidden')
    }
    onSelect(callback) {
        this.onSelectListeners.push(callback);
    }
    content() {
        return this.contentJs;
    }
}