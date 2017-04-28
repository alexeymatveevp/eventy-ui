'use strict';

var EventyCtrl = function($rootScope, $http, $document, $timeout, $scope, $q, FileUploader, Storage) {

    var ctrl = this;

    $scope.log = function() {
        window.s = $scope;
        console.log($scope);
    };

    ctrl.activeTab = 0;
    $scope.events = [];
    $scope.eventTypes = Storage.eventTypes;
    $scope.eventTypesMap = Storage.eventTypesMap;
    $scope.newEvent = {};
    $scope.modifyEvent = {};
    $scope.showAllFieldsCreate = false;
    $scope.showAllFieldsModify = false;

    $scope.users = [{
        name: 'alex'
    }, {
        name: 'zhopka'
    }];

    $scope.eventsFilter = {
        filterType: undefined,
        eventsOrderBy: 'creationDate' // new first
    };

    $scope.listEvents = function() {
        $scope.fillEventTypes().then(function() {
            $http.get('event').then(function(res) {
                var events = res.data;
                events.forEach(function(e) {
                    $scope.createDateObjects(e);
                    var type = Storage.eventTypesMap[e.type];
                    e.color = type.color;
                    e.icon = type.icon;
                    e.when = moment(e.creationDate).fromNow();
                    $scope.events.push(e)
                });

            })
        });

    };

    $scope.fillEventTypes = function() {
        var p = $http.get('event-type');
        p.then(function(res) {
            var eventTypes = res.data;
            eventTypes.forEach(function(e) {
                Storage.eventTypesMap[e.type] = e; // fill the map
                Storage.eventTypes.push(e)
            });
        });
        return p;
    };

    $scope.eventsFilterFn = function(event, index, events) {
        $scope.scrollHack();
        var showThisEvent = true;
        if ($scope.eventsFilter.filterType) {
            showThisEvent = event.type == $scope.eventsFilter.filterType.type;
        }
        if (!showThisEvent) {
            return false;
        }
        if ($scope.eventsFilter.user) {
            showThisEvent = event.user && event.user == $scope.eventsFilter.user.name;
        }
        return showThisEvent;
    };

    /** Create section */
    $scope.createEventServer = function() {
        $scope.newEvent.when = 'now';
        $http({
            url: 'event',
            method: 'POST',
            data: $scope.newEvent,
            transformResponse: [function (data) {
                return data;
            }]
        }).then(function(res) {
            $scope.newEvent.creationDate = new Date().toISOString();
            $scope.newEvent.id = res.data;
            $scope.events.push($scope.newEvent);
            // cleanup
            ctrl.selectedType = undefined;
            $scope.newEvent = {};
            $scope.createSubEventType = undefined;
            ctrl.activeTab = 0;
        });
    };

    $scope.selectTypeToCreate = function(type) {
        $scope.newEvent.type = type.type;
        $scope.newEvent.color = type.color;
        $scope.newEvent.icon = type.icon;
        $scope.createSubEventType = undefined;
    };

    $scope.addCreateSubEvent = function(type) {
        if (!$scope.newEvent.events) {
            $scope.newEvent.events = [];
        }
        $scope.createSubEventType = Storage.eventTypesMap[type];
        $scope.newEvent.events.push({
            type: $scope.createSubEventType.type,
            color: $scope.createSubEventType.color,
            icon: $scope.createSubEventType.icon
        })
    };

    /** Modification section */
    $scope.navigateModifyEvent = function(event) {
        $scope.modifyEvent = event;
        $scope.modifyEventType = Storage.eventTypesMap[$scope.modifyEvent.type];
        ctrl.activeTab = 2;
    };

    $scope.saveModificationsServer = function() {
        $http({
            url: 'event',
            method: 'PUT',
            data: $scope.modifyEvent,
            transformResponse: [function (data) {
                return data;
            }]
        }).then(function(res) {
            $scope.modifyEvent = undefined;
            $scope.modifySubEventType = undefined;
            ctrl.activeTab = 0;
        })
    };

    $scope.changeEventType = function(newType) {
        $scope.modifyEventType = newType;
        $scope.modifyEvent.type = newType.type;
    };

    $scope.addModifySubEvent = function() {
        if (!$scope.modifyEvent.events) {
            $scope.modifyEvent.events = [];
        }
        $scope.modifyEvent.events.push({
            type: $scope.modifySubEventType.type,
            color: $scope.modifySubEventType.color,
            icon: $scope.modifySubEventType.icon
        })
    };

    /** Delete section */
    $scope.deleteEvent = function(event) {
        $http({
            url: 'event/' + event.id,
            method: 'DELETE',
            transformResponse: [function (data) {
                return data;
            }]
        }).then(function(res) {
            var idx = $scope.events.indexOf(event);
            $scope.events.splice(idx, 1);
        })
    };

    /** Utils */
    $scope.createDateObjects = function(ge) {
        if (ge.date) {
            ge.date = new Date(ge.date);
        }
        if (ge.start) {
            ge.start = new Date(ge.start);
        }
        if (ge.end) {
            ge.end = new Date(ge.end);
        }
        if (ge.events) {
            ge.events.forEach(function(e) {
                if (e.date) {
                    e.date = new Date(e.date);
                }
                if (e.start) {
                    e.start = new Date(e.start);
                }
                if (e.end) {
                    e.end = new Date(e.end);
                }
            });
        }
    };
    $scope.scrollHack = function() {
        var st = document.body.scrollTop;
        document.body.scrollTop = st+1;
        document.body.scrollTop = st;
    };

    $scope.listEvents();

    /** Special handling for each event type */
    $scope.filterEventByType = function(events, type) {
        if (events && type) {
            return events.filter(function(e) {
                return e.type == type;
            });
        }
    };

    /** Some animations */
    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementIn = function($el) {
        $el.removeClass('timeline-hidden');
        $el.addClass('bounce-in');
    };

    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementOut = function($el) {
        $el.addClass('timeline-hidden');
        $el.removeClass('bounce-in');
    };

    $scope.leftAlign = function() {
        $scope.side = 'left';
    };

    $scope.rightAlign = function() {
        $scope.side = 'right';
    };

    $scope.defaultAlign = function() {
        $scope.side = ''; // or 'alternate'
    }

};

angular.module('eventy').controller('EventyCtrl', EventyCtrl);
