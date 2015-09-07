'use strict';

angular.module('artOfLmApp')
  .controller('NavbarCtrl', function ($scope) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }];

    $scope.isCollapsed = true;
  });
