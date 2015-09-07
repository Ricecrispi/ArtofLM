'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var artworkCtrlStub = {
  index: 'artworkCtrl.index',
  show: 'artworkCtrl.show',
  create: 'artworkCtrl.create',
  update: 'artworkCtrl.update',
  destroy: 'artworkCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var artworkIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './artwork.controller': artworkCtrlStub
});

describe('Artwork API Router:', function() {

  it('should return an express router instance', function() {
    artworkIndex.should.equal(routerStub);
  });

  describe('GET /api/artworks', function() {

    it('should route to artwork.controller.index', function() {
      routerStub.get
        .withArgs('/', 'artworkCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/artworks/:id', function() {

    it('should route to artwork.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'artworkCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/artworks', function() {

    it('should route to artwork.controller.create', function() {
      routerStub.post
        .withArgs('/', 'artworkCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/artworks/:id', function() {

    it('should route to artwork.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'artworkCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/artworks/:id', function() {

    it('should route to artwork.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'artworkCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/artworks/:id', function() {

    it('should route to artwork.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'artworkCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
