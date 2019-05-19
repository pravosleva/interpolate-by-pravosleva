import { assert } from 'chai';
import Immutable from 'immutable';

import { linear, bilinear, byInternalTable, getKB } from '../src';


describe(
  'Test for static methods of Interpolate class.',
  () => {
    it(
      '1. linear',
      () => {
        const expectedVal = 1.5;

        assert(linear({ x: 0.5, x1: 0, y1: 1, x2: 1, y2: 2 }) === expectedVal, 'Fuckup :(');
      },
    );

    it(
      '2. bilinear',
      () => {
        const expectedVal = 377.75;
        const testedVal = bilinear({
          x: 3, y: 3.5,
          x1: 1, y1: 1,
          x2: 6, y2: 5,
          q11: 400, q12: 410, q21: 210, q22: 590,
        });

        assert(testedVal === expectedVal, `Fuckup :( testedVal is ${testedVal}`);
      },
    );

    it(
      '3.1. byInternalTable (internal point)',
      () => {
        const temperature = -21.0;
        const percentage = 20.0;
        const dataObj = [
          [0.0,   -30,      -20.0,    -10.0,    0.0,     20.0,  40.0,    60.0,    80.0,    100.0],
          [0.0,   4.19,     4.19,     4.19,     4.19,    4.19,  4.19,    4.19,    4.19,    4.19],
          [25.0,  3.93000,  3.93000,  3.93,     3.95,    3.98,  4.00,    4.03,    4.05,    4.08],
          [37.0,  3.68000,  3.68,     3.70000,  3.72,    3.77,  3.82,    3.88,    3.94,    4.00],
          [45.0,  3.49000,  3.49,     3.52,     3.56,    3.62,  3.69,    3.76,    3.82,    3.89],
        ];
        const expectedVal = 3.982;

        assert(byInternalTable({
          x: temperature,
          y: percentage,
          tableAsDoubleArray: dataObj,
        }) === expectedVal, 'Fuckup :(');
      },
    );

    /*
    it(
      '3.2. byInternalTable (external x point)',
      () => {
        const temperature = -40.0;
        const percentage = 20.0;
        const tableAsDoubleArray = [
          [0.0,   -30,      -20.0,    -10.0,    0.0,     20.0,  40.0,    60.0,    80.0,    100.0],
          [0.0,   4.19,     4.19,     4.19,     4.19,    4.19,  4.19,    4.19,    4.19,    4.19],
          [25.0,  3.93000,  3.93000,  3.93,     3.95,    3.98,  4.00,    4.03,    4.05,    4.08],
          [37.0,  3.68000,  3.68,     3.70000,  3.72,    3.77,  3.82,    3.88,    3.94,    4.00],
          [45.0,  3.49000,  3.49,     3.52,     3.56,    3.62,  3.69,    3.76,    3.82,    3.89],
        ];
        const expectedVal = 3.982;
        const testedVal = byInternalTable({
          x: temperature,
          y: percentage,
          tableAsDoubleArray,
        });

        assert( testedVal === expectedVal, `Fuckup :( testedVal is ${testedVal}`);
      },
    );
    */

    it(
      '4. getKB',
      () => {
        const expectedObj = Immutable.Map({ k: -0.8, b: 1.8 });
        const coeffs = getKB({
          x1: 1, y1: 1,
          x2: 6, y2: 5,
        });
        const testedObj = Immutable.Map(coeffs);

        assert(testedObj.equals(expectedObj), `Fuckup :( coeffs is ${JSON.stringify(coeffs)}`);
      },
    );
  },
);
