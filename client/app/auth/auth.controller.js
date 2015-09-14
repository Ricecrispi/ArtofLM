'use strict';

angular.module('artOfLmApp')
  .controller('AuthCtrl', ['$scope', 'auth', '$state', function ($scope, auth, $state) {
    $scope.user = null;
    $scope.fail = false;
    $scope.login = function() {
      auth.login($scope.user).then(function(data) {
        if (data.success) {
          $state.go('main');
        } else {
          $scope.fail = true;
        }
      }, function (error){
        $scope.fail = true;
      });
    };
  }]);
