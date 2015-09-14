'use strict';

angular.module('artOfLmApp')
  .controller('ArtworkCtrl', ['$scope', 'artwork', '$state', 'auth', function ($scope, artwork, $state, auth) {
    $scope.art = {};

    $scope.create = function() {
      artwork.create({name: $scope.art.name}, $scope.art.file).then(function (data) {
        $state.go('main');
      });
    };

    $scope.isLoggedIn = function() {
      auth.isLoggedIn().then(function (data) {
        $scope.loggedIn = data.loggedIn;
      }, function () {

      });
    };

    $scope.isLoggedIn();
  }]);
