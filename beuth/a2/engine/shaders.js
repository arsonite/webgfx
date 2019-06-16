import util from '../util.js';
import Program from './program.js';

// define all to be loaded glsl files
let _shaderPairs = {
	color: { files: ['color.vert', 'color.frag'], codes: ['', ''] },
	phong_vertex: {
		files: ['phong_vertex.vert', 'phong_vertex.frag'],
		codes: ['', '']
	},
	phong_pixel: {
		files: ['phong_pixel.vert', 'phong_pixel.frag'],
		codes: ['', '']
	},
	manip: { files: ['manip.vert', 'manip.frag'], codes: ['', ''] }
};

const NUM_SHADERPAIRS = Object.keys(_shaderPairs).length;
let _numLoaded = 0;
let _onLoadedCallback = () => {};

let _gl;
let _programs = {};
let _createPrograms = function() {
	// create all required GPU programs from vertex and fragment shaders
	for (let name in _shaderPairs) {
		_programs[name] = new Program(_gl, {
			name: name,
			codes: _shaderPairs[name].codes
		});
	}
};

// automatically prepended precision header for all fragment shaders
let _precisionHeader = `
    #if GL_FRAGMENT_PRECISION_HIGH == 1
        // highp is supported
        precision highp int;
        precision highp float;
    #else
        // high is not supported
        precision mediump int;
        precision mediump float;
    #endif
`;

let _loadShader = function(path, response) {
	if (typeof response !== 'function') util.fatal('need response callback');

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				response(xhr.responseText);

				// create the programs when all glsl files are loaded
				if (++_numLoaded === NUM_SHADERPAIRS * 2) {
					_createPrograms();
					_onLoadedCallback();
				}
			}
		}
	};

	xhr.open('GET', path, true);
	xhr.send();
};

let shaderLoader = {
	load: function(gl, onLoaded) {
		_gl = gl;
		_onLoadedCallback = onLoaded;

		const VERT = 0;
		const FRAG = 1;
		for (let pair in _shaderPairs) {
			pair = _shaderPairs[pair];
			_loadShader('shaders/' + pair.files[VERT], code => {
				pair.codes[VERT] = code;
			});
			_loadShader('shaders/' + pair.files[FRAG], code => {
				pair.codes[FRAG] = _precisionHeader + code;
			});
		}
	},

	getCodes(name) {
		return _shaderPairs[name].codes;
	},

	getProgram(name) {
		return _programs[name];
	}
};

export default shaderLoader;
