'use strict';

angular.module('artOfLmApp')
  .controller('MainCtrl', ['$scope', 'artwork', function($scope, artwork) {

    $scope.getNextPage = function () {
      artwork.get().then(function (data) {
        $scope.artwork = data;
      });
    };

   // $scope.getNextPage();

  }]);
