'use strict';

angular.module('artOfLmApp')
  .controller('ArtworkCtrl', ['$scope', 'artwork', '$state', function ($scope, artwork, $state) {
    $scope.artwork = artwork;

    $scope.create = function () {
      artwork.create({name: $scope.name}, $scope.file).success(function (data) {
        $state.go('main');
      });

    };
  }]);
