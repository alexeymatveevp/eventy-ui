class EventEditor {
    constructor(event, contentJs) {
        this.contentJs = contentJs;
        this.setEditingEvent(event);
        this.show_all_fields = false;
    }
    setEditingEvent(event) {
        this.event = event;
        this.event_type = event_types_map[event.type];
        // headline

        let headlineEl = this.showHideEventInputControl('headline');
        headlineEl.querySelector('input').value = event.headline;
        // user
        let userEl = this.showHideEventInputControl('user');
        userEl.querySelectorAll('button').forEach((b) => {
            b.addEventListener('click', () => {
                let user = b.className.split(/\s+/).find((c) => c.indexOf('event-user-') !== -1).slice('event-user-'.length);
                event.user = user;
            })
        })
        // if ()
    }
    getEvent() {
        this.syncEventModel();
        return this.event;
    }
    syncEventModel() {
        this.event.headline = this.contentJs.querySelector('.event-headline > input').value;

    }
    showHideEventInputControl(propName) {
        let el = this.contentJs.querySelector('.event-' + propName);
        if (this.event_type.fields.indexOf(propName) !== -1 || this.show_all_fields) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
        return el;
    }
    content() {
        return this.contentJs;
    }
}