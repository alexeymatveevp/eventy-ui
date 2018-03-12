let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomString10() {
    let text = "";
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function template2Js(template, data) {
    let tmp = document.createElement('template');
    tmp.innerHTML = Mustache.to_html(template.trim(), data);
    return tmp.content.firstChild;
}

function getHTML(url) {
    return html_templates[url];
}

function hideOnClickOutside(element, handler) {
    const outsideClickListener = (event) => {
        if (!element.contains(event.target)) {
            handler();
            removeClickListener();
        }
    };
    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    };
    document.addEventListener('click', outsideClickListener)
}

function getEventType(type) {
    return event_types_map[type];
}

function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}