'use strict';

var app = angular.module('eventy', [
    'ngSanitize',
    'angular-timeline',
    'angular-scroll-animate',
    'ui.bootstrap',
    'ui.select',
    'angularFileUpload'
]);

app.run(function ($rootScope, $http) {
    $rootScope.inArray = function (item, array) {
        return array ? (-1 !== array.indexOf(item)) : false;
    };

    $rootScope.$on("$includeContentLoaded", function(event, templateName){
        console.log("$includeContentLoaded");
        checkImages(function() {
            stickyHeaders.load($(".followMeBar:visible"));
        });
    });
});
