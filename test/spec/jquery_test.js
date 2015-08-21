'use strict';

var fs = require('fs');
var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;

describe('Sortboard (jQuery)', function () {
  var $;

  jsdom({
    src: [
      fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8'),
      fs.readFileSync('src/sortboard.js', 'utf-8')
    ]
  });

  before(function () {
    $ = global.window.jQuery;
    document.body.innerHTML = fs.readFileSync('test/test.html', 'utf-8');
  });

  it('should be initialized successfully and it should be a jQuery instance', function () {
    var $sb = $('#sortlist').sortboard();
    expect($sb).to.be.instanceof($);
  });

  describe('.sortComplete()', function () {
    it('callback should be called successfully.', function (done) {
      $('#sortlist').sortboard({
        sortComplete: done
      });
    });
  });

  describe('.filterComplete()', function () {
    it('callback should be called successfully.', function (done) {
      var $sb = $('#sortlist').sortboard({
        filterComplete: function () {
          done();
        }
      });

      $sb.sortboard('filterBy', 'royalty');
    });
  });

  describe('.filterComplete(data)', function () {
    it('param value `data` should be an Array.', function (done) {
      var $sb = $('#sortlist').sortboard({
        filterComplete: function (data) {
          expect(data).that.is.an('array');
          done();
        }
      });

      $sb.sortboard('filterBy', 'first-line');
    });

    it('`data`parameter in filterComplete() should be an Array.', function (done) {
      var $sb = $('#sortlist').sortboard({
        filterComplete: function (data) {
          expect(data).that.is.an('array');
          done();
        }
      });

      $sb.sortboard('filterBy', 'infantry');
    });
  });

});
