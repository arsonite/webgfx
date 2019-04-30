class Vector {
  constructor() {
    this.e = 0.03125;
  }

  // add two vectors, returns new vector
  add = (a, b) => {
    return [a[0] + b[0], a[1] + b[1]];
  };

  // subtract two vectors, returns new vector
  sub = (a, b) => {
    return [a[0] - b[0], a[1] - b[1]];
  };

  // dot product / scalar product of two vectors, return scalar value
  dot = (a, b) => {
    return a[0] * b[0] + a[1] * b[1];
  };

  // multiply vector by scalar, returns new vector
  mult = (v, s) => {
    return [s * v[0], s * v[1]];
  };

  // returns squared length of a vector
  square = v => {
    return this.dot(v, v);
  };

  // returns length of a vector
  length = v => {
    return Math.sqrt(this.dot(v, v));
  };

  // project a point onto a line defined by two points.
  // return scalar parameter of where point p is projected
  // onto the line. the line segment between a and b
  // corresponds to the value range [0:1]
  projectPointOnLine = (p, a, b) => {
    var dv = vec2.sub(b, a);
    return vec2.square(dv) < EPSILON * EPSILON
      ? 0
      : vec2.dot(vec2.sub(p, a), dv) / vec2.dot(dv, dv);
  };
}

export default Vector;
