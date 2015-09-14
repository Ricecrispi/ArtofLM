'use strict';

angular.module('artOfLmApp')
  .service('artwork', ['Restangular', 'Upload', function (Restangular, Upload) {

    this.loadMore = function (params) {
      return Restangular.all('api/artworks/load-more').getList(params);
    };

    this.create = function (details, file) {
      return Upload.upload({
        url: 'api/artworks/',
        fields: details,
        file: file
      });
    };

    this.delete = function (id) {
      return Restangular.all('api/artworks/' + id).remove()
    };

    return this;
  }]);
