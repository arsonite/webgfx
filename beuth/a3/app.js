/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 * Modified by Burak Günaydin (853872)
 */

/* Global configuration */
let config = {
	render: {
		factor: 2,
		width: window.innerWidth,
		height: window.innerHeight
	},

	camera: {
		fov: 90,
		ratio: window.innerWidth / window.innerHeight,
		nearClip: 0.1,
		farClip: 1000
	}
};

/* Setup the renderer */
let renderer = new THREE.WebGLRenderer();
renderer.setSize(
	config.render.width * config.render.factor,
	config.render.height * config.render.factor
); // Render size
document.body.appendChild(renderer.domElement);

/* Create a scene */
let scene = new THREE.Scene();
let axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/* Create a camera */
let camera = new THREE.PerspectiveCamera(
	config.camera.fov,
	config.camera.ratio,
	config.camera.nearClip,
	config.camera.farClip
);
let radius = 10;

/* Apply transformation on window resize */
window.onresize = () => {
	config.render.width = window.innerWidth;
	config.render.height = window.innerHeight;

	config.camera.ratio = config.render.width / config.render.height;

	camera = new THREE.PerspectiveCamera(
		config.camera.fov,
		config.camera.ratio,
		config.camera.nearClip,
		config.camera.farClip
	);
};

window.onload = () => {
	/* Setup simulation */
	let delta = 1 / 60;
	let time = -delta;

	let update = function() {
		time += delta;

		camera.position.x = radius * Math.sin(time);
		camera.position.z = radius * Math.cos(time);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
	};

	/* A3.1.1 */
	let geometry = new THREE.BoxGeometry(1, 1, 1);
	let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	let cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	camera.position.z = 5;

	/* Simulation loop */
	let render = function() {
		requestAnimationFrame(render);

		update();
		renderer.render(scene, camera);
	};

	render();
};
