/* eslint-disable no-console */

const interpolate = require('../lib').default;
// const { awesomeFunction } = require('../lib');
const defaultVal = interpolate.linear({ x:0.5, x1:0, y1:1, x2:1, y2:2 });
// const val = awesomeFunction();

// defaultVal === 1.5
console.log(defaultVal);
// val === 'I am just an Awesome Function'
// console.log(val);
