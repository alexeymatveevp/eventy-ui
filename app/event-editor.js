var app = angular.module('eventy');
app.directive('eventEditor', function($http, FileUploader, Storage) {
    return {
        restrict: 'E',
        scope: {
            newEvent: '=event',
            eventType: '=',
            editAction: '&'
        },
        templateUrl: 'app/event-editor.html',
        controller: function($scope) {

            $scope.addCreateSubEvent = function(type) {
                if (!$scope.newEvent.events) {
                    $scope.newEvent.events = [];
                }
                var subEventType = Storage.eventTypesMap[type];
                $scope.newEvent.events.push({
                    type: subEventType.type,
                    color: subEventType.color,
                    icon: subEventType.icon
                })
            };

            $scope.editAndClean = function() {
                $scope.uploader.clearQueue();
                $scope.editAction();
            };

            $scope.eventTypesMap = Storage.eventTypesMap;
            var uploader = $scope.uploader = new FileUploader({
                url: 'image',
                alias: 'imageFile',
                autoUpload: true
            });
            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                // remember the file name
                fileItem.imageRelativePath = response;
                // add image to current event
                if (!$scope.newEvent.images) {
                    $scope.newEvent.images = [];
                }
                $scope.newEvent.images.push(response);
            };
            $scope.removeImage = function(imageRelativePath) {
                $http.delete('image/?imageRelativePath=' + encodeURIComponent(imageRelativePath)).then(function() {
                    $scope.newEvent.images.splice($scope.newEvent.images.indexOf(imageRelativePath), 1);
                });
            };

        },
        controllerAs: 'ctrl'
    }
});