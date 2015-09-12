'use strict';

angular.module('artOfLmApp')
  .controller('NavbarCtrl', function ($scope) {
    $scope.menu = [{
      'title': 'Add ',
      'state': 'main'
    }];

    $scope.isCollapsed = true;
  });
