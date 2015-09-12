'use strict';

angular.module('artOfLmApp')
  .service('artwork', ['Restangular', 'Upload', function (Restangular, Upload) {

    this.get = function () {
      return Restangular.getList();
    };

    this.create = function (details, file) {
      return Upload.upload({
        url: 'api/artworks/',
        fields: details,
        file: file
      });
    };

    this.update = function (details, file) {

    };

    return this;
  }]);
