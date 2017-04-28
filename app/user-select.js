var app = angular.module('eventy');
app.directive('userSelect', function() {
    return {
        restrict: 'E',
        scope: {
            user: '=?',
            onSelect: '&',
            users: '='
        },
        templateUrl: 'app/user-select.html',
        controller: function($scope) {
            this.onSelect = $scope.onSelect;
            $scope.$watch('ctrl.user', function(value) {
                $scope.user = value;
            });
        },
        controllerAs: 'ctrl'
    }
});