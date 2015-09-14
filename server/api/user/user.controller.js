/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('./user.model');


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

// Gets a list of Users
exports.index = function(req, res) {
  User.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single User from the DB
exports.show = function(req, res) {
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new User in the DB
exports.create = function(req, res) {
  User.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing User in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a User from the DB
exports.destroy = function(req, res) {
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.login = function(req, res) {
  User.find(req.body).execAsync()
    .then(function (user) {
      if (user.length != 0) {
        req.session.loggedIn = true;
        res.status(200).json({success: true});
      } else {
        res.status(200).json({success: false});
      }
    })
    .catch(handleError(res));
};

exports.logout = function (req, res) {
  req.session = null;
  res.status(200).end();
};

exports.isLoggedIn = function(req, res) {
  if (req.session.loggedIn) {
    res.status(200).json({loggedIn: req.session.loggedIn});
  } else {
    res.status(200).json({loggedIn: false});
  };
};
