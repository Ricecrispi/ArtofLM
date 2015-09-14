'use strict';

angular.module('artOfLmApp')
  .controller('ArtworkCtrl', ['$scope', 'artwork', '$state', function ($scope, artwork, $state) {
    $scope.create = function() {
      artwork.create({name: $scope.name}, $scope.file).then(function (data) {
        $state.go('main');
      });
    };
  }]);
