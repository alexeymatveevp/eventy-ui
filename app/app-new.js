(function() {
    document.addEventListener('app-loaded', function() {
        document.querySelector('.loading-screen').classList.add('away');
    });

    fork([
        loadHTML(pages.LOGO),
        loadHTML(pages.TIMELINE_TAB),
        loadHTML(pages.MODIFY_TAB),
        loadHTML(pages.EVENT_BLOCK),
        loadHTML(pages.EVENT_TEMPLATE_DEFAULT),
        loadHTML(pages.MY_SELECT),
        loadHTML(pages.SELECT_EVENT_SELECTION_BLOCK),
        loadHTML(pages.SELECT_EVENT_OPTION_BLOCK),
        loadHTML(pages.EVENT_EDITOR),
        get('event-type').then((list) => {
            let e_types = JSON.parse(list);
            e_types.forEach((et) => {
                event_types.push(et);
                event_types_map[et.type] = et;
            });
        }),
        get('event').then((list) => events = JSON.parse(list))
    ]).join(() => {
        // logo
        logo = new Logo(template2Js(getHTML(pages.LOGO)));
        document.body.appendChild(logo.content());

        // create main tab set
        main_tab_set = new TabSet();
        let timelineTab = initTimelineTab();
        let modifyTab = new ModifyTab();
        main_tab_set.addTab(timelineTab);
        // logo.addNav(timelineTab, () => main_tab_set.select(timelineTab.name));
        main_tab_set.addTab(modifyTab);
        document.body.appendChild(main_tab_set.content());

        document.dispatchEvent(new CustomEvent('app-loaded'));
    });


})();