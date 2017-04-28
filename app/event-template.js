var app = angular.module('eventy');
app.directive('eventTemplate', function($http) {
    return {
        restrict: 'E',
        // scope: {
        //     type: '='
        // },
        template: '<ng-include src="template"/>',
        // templateUrl: resolveTemplate,
        // controller: function($scope) {
        //
        // }
        link: function postLink(scope) {
            console.log(scope.event.type);
            $http.get('app/event-templates/' + scope.event.type + '.html').then(function() {
                scope.template = 'app/event-templates/' + scope.event.type + '.html';
            }, function() {
                scope.template = 'app/event-templates/default.html';
            });
        }
    }
});