import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hexToRgb, contrast, linkColor, rgbTriplet } from '../src/lib/color.ts';

test('hexToRgb parses six-digit hex', () => {
  assert.deepEqual(hexToRgb('#ffffff'), [255, 255, 255]);
  assert.deepEqual(hexToRgb('#D8703A'), [216, 112, 58]);
  assert.throws(() => hexToRgb('red'));
});

test('contrast of black on white is 21, white on white is 1', () => {
  assert.ok(Math.abs(contrast('#000000', '#ffffff') - 21) < 0.01);
  assert.ok(Math.abs(contrast('#ffffff', '#ffffff') - 1) < 0.01);
});

test('linkColor keeps dark accents and darkens light ones to 3:1 on white', () => {
  assert.equal(linkColor('#1F3A8A'), '#1f3a8a');
  const amber = linkColor('#F5A847');
  assert.notEqual(amber, '#f5a847');
  assert.ok(contrast(amber, '#ffffff') >= 3);
});

test('rgbTriplet gives space separated channels for CSS', () => {
  assert.equal(rgbTriplet('#2E6BFF'), '46 107 255');
});
