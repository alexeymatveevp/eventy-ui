// stores all html templates, key is html file name, value = html string
var html_templates = {};

// stores map of resolved fork-joins; key is forkId, value is { expected: 10, current: 4 }
var fork_join_map = {};

// list / map of event types
var event_types = [];
var event_types_map = {};

// current list of events
var events = [];

var logo; // logo instance
var main_tab_set; // main navigation tab set
