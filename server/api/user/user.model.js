'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
