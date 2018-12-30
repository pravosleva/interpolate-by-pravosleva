# interpolate-by-pravosleva

_NPM Module Boilerplate based_

## Install

```
yarn add interpolate-by-pravosleva
```

## Usage samples

### Linear interpolation example
```javascript
import interpolate from 'interpolate-by-pravosleva';

console.log(
  interpolate.linear({ x:0.5, x1:0, y1:1, x2:1, y2:2 })
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
          x1= 0         x=0.5         x2= 1
```

### Bilinear interpolation example
```javascript
import interpolate from 'interpolate-by-pravosleva';

console.log(
  interpolate.bilinear ({
    x: 3,
    y: 3.5,
    x1: 1,
    y1: 1,
    x2: 6,
    y2: 5,
    q11: 210,
    q12: 590,
    q21: 210,
    q22: 590,
  })
);
// 362
```

_This example description_
```
          |   q12= 590                q22= 590
y2= 5     |   o                       o
          |
          |           q= ? (362 will be found)
y= 3.5    |           o
          |
          |   q11= 210                q21= 210
y1= 1     |   o                       o
          ------------------------------------
              x1= 1   x=3             x2= 6
```

And also, you can read more about bilinear interpolation [on wiki](https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%BB%D0%B8%D0%BD%D0%B5%D0%B9%D0%BD%D0%B0%D1%8F_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F "About bilinear interpolation").

### Interpolate by table (only internal table values):
```javascript
import interpolate from 'interpolate-by-pravosleva';

let temperature = -21.0,
  percentage = 20.0,
  dataObj = [
    [0.0,   -30,      -20.0,    -10.0,    0.0,     20.0,  40.0,    60.0,    80.0,    100.0],
    [0.0,   4.19,     4.19,     4.19,     4.19,    4.19,  4.19,    4.19,    4.19,    4.19],
    [25.0,  3.93000,  3.93000,  3.93,     3.95,    3.98,  4.00,    4.03,    4.05,    4.08],
    [37.0,  3.68000,  3.68,     3.70000,  3.72,    3.77,  3.82,    3.88,    3.94,    4.00],
    [45.0,  3.49000,  3.49,     3.52,     3.56,    3.62,  3.69,    3.76,    3.82,    3.89],
  ];
console.log(
  interpolate.byInternalTable({
    x: temperature,
    y: percentage,
    tableAsDoubleArray: dataObj
  })
);
// 3.982
```

# Original ReadMe

[![Build Status](https://travis-ci.org/flexdinesh/npm-module-boilerplate.svg?branch=master)](https://travis-ci.org/flexdinesh/npm-module-boilerplate) [![dependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate) [![devDependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/dev-status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Start developing your NPM module in seconds** ✨

Readymade boilerplate setup with all the best practices to kick start your npm/node module development.

Happy hacking =)

## Features

* **ES6/ESNext** - Write _ES6_ code and _Babel_ will transpile it to ES5 for backwards compatibility
* **Test** - _Mocha_ with _Istanbul_ coverage
* **Lint** - Preconfigured _ESlint_ with _Airbnb_ config
* **CI** - _TravisCI_ configuration setup
* **Minify** - Built code will be minified for performance

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

## Installation
Just clone this repo and remove `.git` folder.


## License

MIT © Dinesh Pandiyan
