var app = angular.module('eventy');
app.directive('datePicker', function() {
    return {
        restrict: 'E',
        scope: {
            date: '='
        },
        templateUrl: 'app/date-picker.html',
        controller: function($scope) {
            // $scope.date = new Date();
            $scope.dateOptions = {
                dateDisabled: false,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(1990, 1, 1),
                startingDay: 1
            };
        }
    }
});