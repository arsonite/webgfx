import d from './document.js';
import u from './utility.js';

const f = 1.0;

window.onload = () => {
	let canvas = d.tag('canvas');
	canvas.height = canvas.offsetHeight * f;
	canvas.width = canvas.offsetWidth * f;
	window.onresize = () => {
		canvas.height = canvas.offsetHeight * f;
		canvas.width = canvas.offsetWidth * f;
	};
	let context = canvas.getContext('2d');
	canvas.back

	/*
	let scene = new Scene();
	scene.add(emitters);
	emitters.forEach(emitter => {
		scene.add(emitter.getDraggers());
	});

	let controller = new Controller(context, scene);
	let renderer = new Renderer(context, 'rgb(10, 20, 30)');

	var before = 0;
	var fps = 0;

	let mainloop = function () {
		if (!controller.paused) {
			scene.update();
		}

		renderer.render(scene, controller);

		context.font = '12pt Arial';
		context.fillStyle = '#FFF';
		context.fillText(`fps: ${fps}`, 10, 25);

		requestAnimationFrame(() => {
			let now = performance.now();
			fps = Math.trunc(1 / ((now - before) * 0.001));
			before = now;

			mainloop();
		});
	};
	mainloop();
	*/
};
