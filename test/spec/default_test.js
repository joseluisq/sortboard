'use strict';

var fs = require('fs');
var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;

describe('Sortboard', function () {
  var sortlist;
  var Sortboard;

  jsdom({
    src: fs.readFileSync('src/sortboard.js', 'utf-8')
  });

  before(function () {
    Sortboard = global.window.Sortboard;
    document.body.innerHTML = fs.readFileSync('test/test.html', 'utf-8');
    sortlist = document.getElementById('sortlist');
  });

  it('class should be initialized successfully.', function () {
    var sb = new Sortboard(sortlist);
    expect(sb).to.be.an('object');
  });

  describe('.sortComplete()', function () {
    it('callback should be called successfully.', function (done) {
      var sb = new Sortboard(sortlist, {
        sortComplete: done
      });
    });

  });

  describe('.filterComplete()', function () {
    it('callback should be called successfully.', function (done) {
      var sb = new Sortboard(sortlist, {
        filterComplete: function () {
          done();
        }
      });

      sb.filterBy('royalty');
    });
  });

  describe('.filterComplete(data)', function () {
    it('param value `data` should have `found` and `notfound` properties.', function (done) {
      var sb = new Sortboard(sortlist, {
        filterComplete: function (data) {
          expect(data).to.have.property('found');
          expect(data).to.have.property('notfound');
          done();
        }
      });

      sb.filterBy('first-line');
    });

    it('`found` and `notfound` properties values should be an `Array` object.', function (done) {
      var sb = new Sortboard(sortlist, {
        filterComplete: function (data) {
          expect(data).to.have.property('found').that.is.an('array');
          expect(data).to.have.property('notfound').that.is.an('array');
          done();
        }
      });

      sb.filterBy('infantry');
    });
  });

});
