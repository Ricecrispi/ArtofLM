/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Artwork = require('../api/artwork/artwork.model');

//Artwork.find().removeAsync()
//  .then(function() {
//  });
//
