var app = angular.module('eventy');
app.factory('Storage', function() {
    return {
        eventTypesMap: {}, // type to entity map
        eventTypes: [] // all types of events
    }
});