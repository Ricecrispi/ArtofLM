'use strict';

angular.module('artOfLmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('artwork', {
        url: '/artwork',
        templateUrl: 'app/artwork/artwork.html',
        controller: 'ArtworkCtrl'
      });
  });
