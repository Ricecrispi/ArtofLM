'use strict';

angular.module('artOfLmApp')
  .controller('MainCtrl', ['$scope', 'artwork', function($scope, artwork) {

    $scope.getNextPage = function () {
      Artwork.get().then(function (data) {
        $scope.artwork = data;
      });
    };

    $scope.getNextPage();

  }]);
