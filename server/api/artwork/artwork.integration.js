'use strict';

var app = require('../..');
var request = require('supertest');

var newArtwork;

describe('Artwork API:', function() {

  describe('GET /api/artworks', function() {
    var artworks;

    beforeEach(function(done) {
      request(app)
        .get('/api/artworks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          artworks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      artworks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/artworks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/artworks')
        .send({
          name: 'New Artwork',
          info: 'This is the brand new artwork!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newArtwork = res.body;
          done();
        });
    });

    it('should respond with the newly created artwork', function() {
      newArtwork.name.should.equal('New Artwork');
      newArtwork.info.should.equal('This is the brand new artwork!!!');
    });

  });

  describe('GET /api/artworks/:id', function() {
    var artwork;

    beforeEach(function(done) {
      request(app)
        .get('/api/artworks/' + newArtwork._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          artwork = res.body;
          done();
        });
    });

    afterEach(function() {
      artwork = {};
    });

    it('should respond with the requested artwork', function() {
      artwork.name.should.equal('New Artwork');
      artwork.info.should.equal('This is the brand new artwork!!!');
    });

  });

  describe('PUT /api/artworks/:id', function() {
    var updatedArtwork

    beforeEach(function(done) {
      request(app)
        .put('/api/artworks/' + newArtwork._id)
        .send({
          name: 'Updated Artwork',
          info: 'This is the updated artwork!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedArtwork = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedArtwork = {};
    });

    it('should respond with the updated artwork', function() {
      updatedArtwork.name.should.equal('Updated Artwork');
      updatedArtwork.info.should.equal('This is the updated artwork!!!');
    });

  });

  describe('DELETE /api/artworks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/artworks/' + newArtwork._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when artwork does not exist', function(done) {
      request(app)
        .delete('/api/artworks/' + newArtwork._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
