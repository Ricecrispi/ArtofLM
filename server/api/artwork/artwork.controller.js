/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/artworks              ->  index
 * POST    /api/artworks              ->  create
 * GET     /api/artworks/:id          ->  show
 * PUT     /api/artworks/:id          ->  update
 * DELETE  /api/artworks/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Artwork = require('./artwork.model');
var uuid = require('node-uuid');
var multiparty = require('multiparty');
var  fs = require('fs');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Artworks
exports.index = function(req, res) {
  Artwork.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Artwork from the DB
exports.show = function(req, res) {
  Artwork.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Artwork in the DB
exports.create = function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
    var file = files.file[0];
    var contentType = file.headers['content-type'];
    var tmpPath = file.path;
    var extIndex = tmpPath.lastIndexOf('.');
    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
    // uuid is for generating unique filenames.
    var fileName = uuid.v4() + extension;
    var destPath = 'client/assets/artwork/' + fileName;

    // Server side file type checker.
    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
      fs.unlink(tmpPath);
      return res.status(400).send('Unsupported file type.');
    }

    fs.rename(tmpPath, destPath, function(err) {
      if (err) {
        handleError(res);
      };
      Artwork.createAsync({url: 'assets/artwork/' + fileName, name: fields.name})
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
    });
  });
};

// Load more Artwork
exports.loadMore = function (req, res) {
  Artwork.find().skip(req.query.skip).limit(req.query.limit)
  .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};


// Updates an existing Artwork in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Artwork.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Artwork from the DB
exports.destroy = function(req, res) {
  Artwork.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
