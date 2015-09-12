'use strict';

angular.module('artOfLmApp')
  .controller('ArtworkCtrl', ['$scope', 'artwork', '$state', function ($scope, Artwork, $state) {
    $scope.artwork = Artwork;

    $scope.create = function () {
      artwork.create({name: $scope.name}, file).success(function (data) {
        $state.go('main');
      });

    };
  }]);
