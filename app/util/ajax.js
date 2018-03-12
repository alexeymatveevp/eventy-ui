var MODE_MOCK = true;

function get(url) {
    if (MODE_MOCK) {
        if (url === 'event') url = 'mock/events.json';
        else if (url === 'event-type') url = 'mock/event-types.json';
    }
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

function loadHTML(url) {
    let promise;
    if (html_templates[url]) {
        promise = new Promise((resolve) => { resolve(html_templates[url]) });
    } else promise = get(url);
    promise.then((html) => html_templates[url] = html);
    return promise;
}

function fork(promises) {
    return {
        join: (callback) => {
            let numOfTasks = promises.length;
            let forkId = randomString10();
            fork_join_map[forkId] = {
                expected: numOfTasks,
                current: 0
            };
            promises.forEach((p) => {
                p.then((data) => {
                    fork_join_map[forkId].current++;
                    if (fork_join_map[forkId].expected === fork_join_map[forkId].current) {
                        if (callback) callback(data)
                    }
                })
            });
        }
    }
}

