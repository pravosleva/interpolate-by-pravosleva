import { assert } from 'chai';
import interpolate from '../src';


describe(
  'interpolate test.',
  () => {
    // 1
    it(
      'interpolate.linear',
      () => {
        const expectedVal = 1.5;

        assert(interpolate.linear({ x:0.5, x1:0, y1:1, x2:1, y2:2 }) === expectedVal, 'Fuckup :(');
      },
    );

    // 2
    it(
      'interpolate.bilinear',
      () => {
        const expectedVal = 362;

        assert(interpolate.bilinear({
          x: 3,
          y: 3.5,
          x1: 1,
          y1: 1,
          x2: 6,
          y2: 5,
          q11: 210,
          q12: 590,
          q21: 210,
          q22: 590
        }) === expectedVal, 'Fuckup :(');
      },
    );

    // 3
    it(
      'interpolate.byInternalTable',
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

        assert(interpolate.byInternalTable({
          x: temperature,
          y: percentage,
          tableAsDoubleArray: dataObj,
        }) === expectedVal, 'Fuckup :(');
      },
    );
  },
);
