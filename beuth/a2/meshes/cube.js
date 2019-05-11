import Mesh from '../engine/mesh.js';

/*
Cube-faces
Front:          Back:
D ---- C    >   H ---- G
|      |        |      |
|      |        |      |
A------B    >   E ---- F
*/
let _coords = [
    /* Front-face */
    -1, -1, 1,    // A: 0
    1, -1, 1,     // B: 1
    1, 1, 1,      // C: 2
    -1, 1, 1,     // D: 3

    /* Back-face */
    -1, -1, -1,   // E: 4
    1, -1, -1,    // F: 5
    1, 1, -1,     // G: 6
    -1, 1, -1,    // H: 7
];

let _indices = [
    /* Front */
    0, 1,
    1, 2,
    2, 3,
    3, 0,

    /* Back */
    4, 5,
    5, 6,
    6, 7,
    7, 4,

    /* Left-Side */
    0, 4,
    3, 7,

    /* Right-Side */
    1, 5,
    2, 6,
];

let _colors = [
    1, 1, 1, 1,
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 1,

    1, 1, 1, 1,
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 1
];

let _mesh = null;

class Cube {
    constructor(gl, config = {}) {
        this.pos = config.pos;
        this.size = config.size;

        if (this.pos !== undefined) {
            _coords.forEach(coord => {

            });
        }

        if (this.size !== undefined) {
            for (let i = 0, n = _coords.length; i < n; i++) {
                _coords[i] += this.size;
            }
        }

        console.log(_coords);

        if (!_mesh) {
            _mesh = new Mesh(gl, {
                coords: _coords,
                colors: _colors,
                indices: _indices,
                primitiveType: gl.LINES
            });
            this.mesh = _mesh;
        }
    }
}

export default Cube;