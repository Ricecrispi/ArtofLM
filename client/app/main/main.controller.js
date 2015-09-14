'use strict';

angular.module('artOfLmApp')
  .controller('MainCtrl', ['$scope', 'artwork', function($scope, artwork) {
    $scope.artworkList = [];
    $scope.limit = 10

    $scope.loadMore = function() {
      artwork.loadMore({skip: $scope.artworkList.length, limit: $scope.limit})
        .then(function(data) {
        $scope.artworkList.push.apply($scope.artworkList, data);
      }, function(error) {

      });
    };

   $scope.delete = function(item) {
     artwork.delete(item._id).then(function(data) {
       $scope.artworkList.splice($scope.artworkList.indexOf(item), 1);
       });
   };

    $scope.loadMore();

  }]);
