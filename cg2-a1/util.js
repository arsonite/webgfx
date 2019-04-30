/*
 * Loose collection of helper functions.
 */
const util = {
  byid: id => {
    return document.getElementById(id);
  },

  /* Convenient error-throw */
  fatal: msg => {
    throw new Error(msg);
  },

  /* ES5-compatible array-check */
  isArray: arr => {
    return Object.prototype.toString.call(arr) === '[object Array]';
  },

  /* Returns a number between min and max */
  rand: (min, max) => {
    return min + (max - min) * Math.random();
  },

  /* Returns an integer between min and max */
  irand: (min, max) => {
    return Math.round(min + (max - min) * Math.random());
  },

  /* Helper: convert a byte (0...255) to a 2-digit hex string */
  _byte2hex: byte => {
    let string = byte.toString(16); // convert to hex string
    return string.length === 1 // eventually pad with leading 0
      ? '0' + string
      : string;
  },

  /* Generates a random color in hex notation #rrggbb */
  randRGBHex: () => {
    return `#
      ${util._byte2hex(Math.floor(Math.random() * 256))}
      ${util._byte2hex(Math.floor(Math.random() * 256))}
      ${util._byte2hex(Math.floor(Math.random() * 256))}`.replace(/\s+/gm, '');
  }
};

// generates a random color in byte notation [0-255, 0-255, 0-255]
util.randRGBByte = () => {
  return [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ];
};

// generates a random color in normalized notation [0-1, 0-1, 0-1]
util.randRGBNorm = () => {
  return [Math.random(), Math.random(), Math.random()];
};

// interpolates between a and b with t from [0, 1]
util.interpol = (a, b, t) => {
  return (1 - t) * a + t * b;
};

// interpolates rgba channels between colora and colorb with t from [0, 1]
util.lerpRGBA = (colora, colorb, t) => {
  let oot = 1 - t;
  return [
    oot * colora[0] + t * colorb[0],
    oot * colora[1] + t * colorb[1],
    oot * colora[2] + t * colorb[2],
    oot * colora[3] + t * colorb[3]
  ];
};

export default util;
