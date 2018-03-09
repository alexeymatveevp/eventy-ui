var app = angular.module('eventy');
app.directive('userSelect', function() {
    return {
        restrict: 'E',
        scope: {
            user: '=?',
            onSelect: '&',
            onDeselect: '&',
            users: '='
        },
        templateUrl: 'app/user-select.html',
        controller: function($scope) {
            this.onSelect = $scope.onSelect;
            this.onDeselect = $scope.onSelect;
            $scope.$watch('ctrl.user', function(value) {
                $scope.user = value;
            });
        },
        controllerAs: 'ctrl'
    }
});