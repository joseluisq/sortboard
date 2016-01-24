import test from 'tape';
import fs from 'fs';
import { jsdom } from 'jsdom';
import Sortboard from '../dist/sortboard.min.js';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

const content = fs.readFileSync(`${__dirname}/test.html`);
document.body.innerHTML = content.toString();
const sortlist = document.getElementById('sortlist');

test('Sortboard Test Suite', t => {
  t.plan(5);

  // Test 1
  const sb1 = Sortboard.create(sortlist, {
    gutter: 10,
    filterComplete: res => {
      t.equal(res.length, 0, 'There should be no matches.');
    },
    sortComplete: () => {
      t.ok(1, 'Function sortComplete() called by default.');
    }
  });

  sb1.filterBy('unknown filter');

  // Test 2
  let matches = 0;

  const sb2 = Sortboard.create(sortlist, {
    gutter: 5,
    filterComplete: res => {
      matches = res.length;
      t.notEqual(matches, 0, 'Param should be greater than 0.');
    }
  });
  sb2.filterBy('white');

  t.equal(sb2.getFilter(), 'white', 'Filter result should be equal to expected');
  t.equal(sb2.getFoundItems().length, matches, 'Matches result should be equal to expected');
});
