
/*
 * Loose collection of helper functions
 */
let util = {}

// handy shortcut
util.byid = function(id) {
    return document.getElementById(id)
}

let _logLevel = 0
util.setLogLevel = function(level) {
    _logLevel = level
}

util.log  = function(msg) { if (_logLevel <= 0) console.log(`%c${msg}`, 'color: grey') }
util.info = function(msg) { if (_logLevel <= 1) console.log(`%c${msg}`, 'color: green') }
util.warn = function(msg) { if (_logLevel <= 2) console.log(`%c${msg}`, 'color: orange') }
util.crit = function(msg) { if (_logLevel <= 3) console.log(`%c${msg}`, 'color: red') }

util.fatal = function(msg) {
    throw new Error(msg)
}

util.isArray = function(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

// returns a number between min and max
util.rand = function(min, max) {
    return min + (max - min) * Math.random()
}

// returns an integer between min and max
util.irand = function(min, max) {
    return Math.round(
        min + (max - min) * Math.random()
    )
}

// helper: convert a byte (0...255) to a 2-digit hex string
let _byte2hex = function(byte) {
    let string = byte.toString(16)  // convert to hex string
    return string.length === 1 ?    // eventually pad with leading 0
        '0' + string : string 
}

// generates a random color in hex notation #rrggbb
util.randRGBHex = function() {
    return `# 
        ${_byte2hex(Math.floor(Math.random() * 256))}
        ${_byte2hex(Math.floor(Math.random() * 256))}
        ${_byte2hex(Math.floor(Math.random() * 256))}
    `
}

// generates a random color in byte notation [0-255, 0-255, 0-255]
util.randRGBByte = function() {
    return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ]
}

// generates a random color in normalized notation [0-1, 0-1, 0-1]
util.randRGBNorm = function() {
    return [
        Math.random(),
        Math.random(),
        Math.random()
    ]
}

// interpolates between a and b with t from [0, 1]
util.lerp = function(a, b, t) {
    return (1 - t) * a + t * b
}

// interpolates rgba channels between colora and colorb with t from [0, 1]
util.lerpRGBA = function(colora, colorb, t) {
    let oot = 1 - t
    return [
        oot * colora[0] + t * colorb[0],
        oot * colora[1] + t * colorb[1],
        oot * colora[2] + t * colorb[2],
        oot * colora[3] + t * colorb[3]
    ]
}

util.length = function(vec) {
    return Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1])
}

util.normalize = function(vec) {
    let len = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2])
    len = len ? 1.0 / len : 0.0
    return [
        vec[0] * len, 
        vec[1] * len, 
        vec[2] * len
    ]
}


export default util
