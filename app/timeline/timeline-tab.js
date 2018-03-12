function initTimelineTab() {
    let timelineJs = template2Js(getHTML(pages.TIMELINE_TAB), {});
    let ul = timelineJs.querySelector('.timeline');
    events.forEach((event) => {
        let event_type = event_types_map[event.type];
        let js = template2Js(getHTML(pages.EVENT_BLOCK), {
            event: event_type,
            bg: event_type.background
                ? 'url(img/event-background/' + event_type.background + ') no-repeat'
                : 'white'
        });

        // fill in event template
        let specific_template = getHTML('app/timeline/event-templates/' + event.type) || getHTML(pages.EVENT_TEMPLATE_DEFAULT);
        let eventJs = template2Js(specific_template, {
            event: event
        });

        // assign buttons
        eventJs.querySelector('.modify-btn').addEventListener('click', () => {
            logo.addNav(main_tab_set.getTab('timeline'), () => {
                main_tab_set.select('timeline');
                logo.removeNav('timeline');
            });
            main_tab_set.select('modify').setModifyingEvent(event);
        });

        js.querySelector('timeline-panel').appendChild(eventJs);
        ul.appendChild(js);
    });
    return new Tab('timeline', timelineJs, true)
}