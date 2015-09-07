'use strict';

angular.module('artOfLmApp')
  .controller('MainCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

    $scope.getNextPage = function () {
      Restangular.getList().then(function (data) {
        $scope.artwork = data;
      });
    };

    $scope.getNextPage();

  }]);
