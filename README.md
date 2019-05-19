# interpolate-by-pravosleva

## Install

```
$ yarn add interpolate-by-pravosleva
```

## Interpolation cases usage

```javascript
import Interpolate from 'interpolate-by-pravosleva';

// Or any static method of the class if necessary:
import { linear } from 'interpolate-by-pravosleva';
```

_So, you can use methods below_

- [linear](#linear) by `{ x, x1, y1, x2, y2 }`
- [bilinear](#bilinear) by `{ x, y, x1, y1, x2, y2, q11, q12, q21, q22 }`
- [byInternalTable](#byInternalTable) by `{ x, y, tableAsDoubleArray }` _TODO: external cases_
- [getKB](#getKB) (auxiliary) for condition like `y=kx+b` by `{ x1, y1, x2, y2 }`

### linear

```javascript
console.log(
  Interpolate.linear({ x: 0.5, x1: 0, y1: 1, x2: 1, y2: 2 })
);
// 1.5
```

_This example description_
```
          |
y2= 2     |                           o
          |
y= ?      |             o
(1.5 will be found in line by x value)
y1= 1     o
          |
          ------------------------------------
          x1= 0         x= 0.5        x2= 1
```

### bilinear

```javascript
console.log(
  Interpolate.bilinear ({
    x: 3, y: 3.5,
    x1: 1, y1: 1,
    x2: 6, y2: 5,
    q11: 400, q12: 410, q21: 210, q22: 590,
  })
);
// 377.75
```

_This example description_
```
          |   q12= 410                q22= 590
y2= 5     |   o                       o
          |
          |           q= ? (377.75 will be found bilinearly)
y= 3.5    |           o
          |
          |   q11= 400                q21= 210
y1= 1     |   o                       o
          ------------------------------------
              x1= 1   x= 3            x2= 6
```

And also, you can read more about bilinear interpolation [on wiki](https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%BB%D0%B8%D0%BD%D0%B5%D0%B9%D0%BD%D0%B0%D1%8F_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F "About bilinear interpolation").

### byInternalTable

_Interpolate by table (only internal table values gives correct result) for example_

```javascript
const temperature = -21.0;
const percentage = 20.0;
/*
  About table below:
  1st horizontal line (highest row as x axis) - temperature conditions template
  1st vertical column (first left column as y axis) - percentage conditions template
*/
const tableAsDoubleArray = [
  [0.0,   -30,      -20.0,    -10.0,    0.0,     20.0,  40.0,    60.0,    80.0,    100.0],
  [0.0,   4.19,     4.19,     4.19,     4.19,    4.19,  4.19,    4.19,    4.19,    4.19],
  [25.0,  3.93000,  3.93000,  3.93,     3.95,    3.98,  4.00,    4.03,    4.05,    4.08],
  [37.0,  3.68000,  3.68,     3.70000,  3.72,    3.77,  3.82,    3.88,    3.94,    4.00],
  [45.0,  3.49000,  3.49,     3.52,     3.56,    3.62,  3.69,    3.76,    3.82,    3.89],
];

console.log(
  Interpolate.byInternalTable({
    x: temperature,
    y: percentage,
    tableAsDoubleArray,
  })
);
// 3.982
```

### getKB

```javascript
console.log(
  Interpolate.getKB({
    x1: 1, y1: 1,
    x2: 6, y2: 5,
  })
);
// { k: -0.8, b: 1.8 }
```

## Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

## License

MIT © Den Pol
