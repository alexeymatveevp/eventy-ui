var app = angular.module('eventy');
app.directive('typeSelect', function() {
    return {
        restrict: 'E',
        scope: {
            type: '=?',
            onSelect: '&',
            onDeselect: '&',
            eventTypes: '='
        },
        templateUrl: 'app/type-select.html',
        controller: function($scope) {
            this.onSelect = $scope.onSelect;
            this.onDeselect = $scope.onDeselect;
            $scope.$watch('ctrl.type', function(value) {
                $scope.type = value;
            });
            $scope.$watch('type', function(value) {
                $scope.ctrl.type = value;
            });
            // $scope.$on('event-created', function() {
            //     $scope.ctrl.type = undefined;
            // });
        },
        controllerAs: 'ctrl'
    }
});