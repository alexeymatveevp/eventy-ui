class ModifyTab extends Tab {
    constructor() {
        super('modify');
        this.initModifyTab()
    }
    initModifyTab() {
        this.contentJs = template2Js(getHTML(pages.MODIFY_TAB));
        let selectJs = this.contentJs.querySelector('.type-select');
        this.typeSelect = new MySelect(
            event_types,
            getHTML(pages.SELECT_EVENT_SELECTION_BLOCK),
            getHTML(pages.SELECT_EVENT_OPTION_BLOCK)
        );
        selectJs.appendChild(this.typeSelect.content());
    }
    setModifyingEvent(event) {
        let modifyingEvent = JSON.parse(JSON.stringify(event));
        // set type
        let et = getEventType(event.type);
        this.typeSelect.select(et);
        this.typeSelect.onSelect((et) => {
            modifyingEvent.type = et.type;
        });
        // editor
        this.editorJs = this.contentJs.querySelector('.modify-editor');
        clearNode(this.editorJs);
        this.editorJs.appendChild(template2Js(getHTML(pages.EVENT_EDITOR), {
            eventType: et
        }));
        this.editor = new EventEditor(modifyingEvent, this.editorJs);
    }
}