import shaders from './engine/shaders.js';
import textures from './engine/textures.js';

import Controller from './controller.js';
import Renderer from './engine/renderer.js';
import Scene from './scene.js';

import util from './util.js';

let initWebGL = function(canvasID) {
	let canvas = util.byid(canvasID);
	if (!canvas) util.fatal('canvas not found...');

	// get WebGL rendering context for canvas element
	let glOptions = {
		alpha: true,
		depth: true,
		antialias: true
	};

	let gl;
	try {
		gl =
			canvas.getContext('webgl', glOptions) ||
			canvas.getContext('experimental-webgl', glOptions);
	} catch (ex) {
		util.fatal('could not create WebGL rendering context...', ex);
	}

	if (!gl) util.fatal('could not create WebGL rendering context...');

	// create a debugging wrapper of the context object
	// NOTE: this makes webgl really slow, if everything is fine, disable it for performance
	let useGLDebug = false;
	if (useGLDebug) {
		gl = WebGLDebugUtils.makeDebugContext(gl, function(error, funcname, args) {
			util.fatal(
				`${WebGLDebugUtils.glEnumToString(
					error
				)} was caused by call to: ${funcname}`
			);
		});
	}

	return gl;
};

let runApp = function(gl) {
	// stick the engine together
	let scene = new Scene(gl);
	let renderer = new Renderer(gl);
	let controller = new Controller(gl, scene);

	let fps = 0;
	let last = 0;
	let info = util.byid('info');

	let mainloop = function() {
		// integrate the scene
		if (!controller.paused) {
			scene.update(0.01);
		}

		// render next frame
		renderer.render(scene, controller);

		let now = performance.now();
		fps = now - last;
		last = now;
		info.textContent = `fps ${Math.round(1000 / fps)}`;

		// let the browser do the fps thing
		requestAnimationFrame(function() {
			mainloop();
		});
	};
	// start
	mainloop();
};

window.onload = function() {
	util.info('page loaded');

	let gl = initWebGL('canvas3d');

	let shadersLoaded = false;
	let texturesLoaded = false;

	// load textures and shader programs
	textures.load(gl, function() {
		util.info('textures loaded');
		texturesLoaded = true;
	});
	shaders.load(gl, function() {
		util.info('shaders loaded');
		shadersLoaded = true;
	});

	// wait until everything is loaded
	let intervalID = setInterval(function() {
		if (texturesLoaded && shadersLoaded) {
			clearInterval(intervalID);
			util.warn('starting app...');
			runApp(gl);
		}
	}, 1);
};
