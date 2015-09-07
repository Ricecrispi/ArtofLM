'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ArtworkSchema = new Schema({
  name: String,
  url: String
});

module.exports = mongoose.model('Artwork', ArtworkSchema);
