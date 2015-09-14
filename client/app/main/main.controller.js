'use strict';

angular.module('artOfLmApp')
  .controller('MainCtrl', ['$scope', 'artwork', 'auth', function($scope, artwork, auth) {
    $scope.artworkList = [];
    $scope.limit = 10
    $scope.loggedIn = false;

    $scope.isLoggedIn = function() {
        auth.isLoggedIn().then(function (data) {
          $scope.loggedIn = data.loggedIn;
        }, function (error) {

        });
    };

    $scope.logout = function() {
      auth.logout().then(function(data) {
        $scope.artworkList = [];
        $scope.loadMore();
        $scope.isLoggedIn();
      }, function (error) {

      })
    };

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
    $scope.isLoggedIn();

  }]);
