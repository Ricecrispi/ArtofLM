'use strict';

angular.module('artOfLmApp')
  .service('auth', function (Restangular) {
    this.login = function (user) {
      return Restangular.all('api/users/login').post(user);
    };

    this.logout = function () {
      return Restangular.all('api/users/logout').post();
    };

    //this.currentUser = function() {
    //  return Restangular.all('api/user/curent-user').post();
    //};

    this.isLoggedIn = function() {
      return Restangular.all('api/users/is-logged-in').post();
    };

    return this;
  });
