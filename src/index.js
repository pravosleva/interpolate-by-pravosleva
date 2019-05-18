/* eslint-disable no-plusplus, prefer-const, object-curly-newline, object-property-newline */

export default class Interpolate {
  static linear({
    x,
    x1, y1,
    x2, y2,
  }) {
    if (x1 === x2) {
      return ((y1 + y2) / 2);
    }
    return ((((x - x1) * (y2 - y1)) / (x2 - x1)) + y1);
  }

  static getKB({ x1, y1, x2, y2 }) {
    const k = (y1 - y2) / (x2 - x1);
    const b = y1 - (k * x1);

    return { k, b };
  }

  static bilinear({
    x, y,
    x1, y1,
    x2, y2,
    q11, q12, q21, q22,
  }) {
    const interResult1 = Interpolate.linear({
      x,
      x1, y1: q11,
      x2, y2: q12,
    });
    const interResult2 = Interpolate.linear({
      x,
      x1, y1: q21,
      x2, y2: q22,
    });

    // console.log(`bilinear between ${interResult1} & ${interResult2}`);
    return Interpolate.linear({
      x: y,
      x1: y1, y1: interResult1,
      x2: y2, y2: interResult2,
    });
  }

  static byInternalTable({ x, y, tableAsDoubleArray }) {
    /*
      SHORT DESCRIPTION

      tableAsDoubleArray should be realized as:
        head_y  | head_x  | head_x  | ..
        head_y  | value   | value   | ..
        head_y  | value   | value   | ..

      See also this example for tableAsDoubleArray:
        [
          [ 0.0,   0.0,  10.0,  20.0],
          [12.2, 3.977, 3.998, 4.019],
          [16.0, 3.894, 3.915, 3.936],
          [19.8, 3.852, 3.873, 3.894]
        ]

      BUT REMEMBER THAT:
        Your point should be have place in particular rectangle
        the first row & column is table headers (not values)
        |  |  |  |  |  |
        |  | * * * * * *
        |  | * Inside  *
    */
    try {
      let i1;
      let i2;
      let j1;
      let j2;

      for (i2 = 1; tableAsDoubleArray[i2][0] < y; i2++);
      i1 = i2 - 1;

      for (j2 = 1; tableAsDoubleArray[0][j2] < x; j2++);
      j1 = j2 - 1;

      return Interpolate.bilinear({
        x, y,
        x1: tableAsDoubleArray[0][j1], y1: tableAsDoubleArray[i1][0],
        x2: tableAsDoubleArray[0][j2], y2: tableAsDoubleArray[i2][0],
        q11: tableAsDoubleArray[i1][j1],
        q12: tableAsDoubleArray[i1][j2],
        q21: tableAsDoubleArray[i2][j1],
        q22: tableAsDoubleArray[i2][j2],
      });
    } catch (err) { return 0.0; }
  }
}
