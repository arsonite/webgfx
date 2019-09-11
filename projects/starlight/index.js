/**
 *
 */

import d from '../../script/document.js';
import u from '../../script/utility.js';

import Controller from './engine/controller.js';
import Renderer from './engine/renderer.js';
import Scene from './engine/scene.js';

/* Configuration */
const config = {};

/* Resolution-factor */
const f = 1.0;

/* Background-color for canvas */
const bg = '#111';

window.onload = () => {
	/* */
	let canvas = d.tag('canvas');
	canvas.height = canvas.offsetHeight * f;
	canvas.width = canvas.offsetWidth * f;
	window.onresize = () => {
		canvas.height = canvas.offsetHeight * f;
		canvas.width = canvas.offsetWidth * f;
	};

	/* */
	let context = canvas.getContext('2d');
	let scene = new Scene();
	let controller = new Controller(context, scene);
	let renderer = new Renderer(context, bg);

	/* */
	let fps = d.id('fps');
	let before = 0;
	const loop = () => {
		if (!controller.paused) scene.update();

		renderer.render(scene);

		requestAnimationFrame(() => {
			const now = performance.now();
			fps.innerHTML = Math.trunc(1 / ((now - before) * 0.001));
			before = now;

			loop();
		});
	};
	loop();
};
