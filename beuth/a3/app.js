/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 * Modified by Burak Günaydin (853872)
 */
import StellarBody from './StellarBody.mjs';
import Camera from './Camera.mjs';
import Vector from './Vector.mjs';

const texturePath = './textures/';

/* Global configuration */
let config = {
	render: {
		factor: 2,
		width: window.innerWidth,
		height: window.innerHeight
	}
};

/* Setup the renderer */
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(
	config.render.width * config.render.factor,
	config.render.height * config.render.factor
); // Render size
document.body.appendChild(renderer.domElement);

/* Create a scene */
let scene = new THREE.Scene();
let axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/* A3.1.1 */
/*
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
*/

/* A3.1.2 */
/* Skybox */
let sky = {
	texture: new THREE.TextureLoader().load(`${texturePath}skybox.jpg`),
	geometry: new THREE.SphereBufferGeometry(100, 100, 100)
};
sky.material = new THREE.MeshBasicMaterial({ map: sky.texture });
sky.material.side = THREE.BackSide;
scene.add(new THREE.Mesh(sky.geometry, sky.material));

/* Solarsystem-node-tree

 * Sun  >   Mercury
 *      >   Venus
 *      >   Earth   > Moon (Luna)
 *      >   Mars
 *      >   Jupiter
 *      >   Saturn
 *      >   Uranus
 *      >   Neptune
 *      >   Pluto
 */
let solarsystem = [];

let sun = new StellarBody({ name: 'sun', size: 10, type: 'Star' });
solarsystem.push(sun);
console.log(sun);

solarsystem.forEach(stellarBody => {
	scene.add(stellarBody.mesh);
});
scene.add(solarsystem);

/* Cameras */
let cameras = [
	new Camera({ position: { x: 0, y: 10, z: 50 }, rotation: 10 }),
	new Camera({ rotation: 2 }),
	new Camera({ position: { x: 0, y: 50, z: 0 } })
];
let cameraIndex = 0;

/* Apply transformation on window resize */
window.onresize = () => {
	config.render.width = window.innerWidth;
	config.render.height = window.innerHeight;
};

window.onload = () => {
	/* Register shortcuts */
	document.onkeydown = e => {
		e.preventDefault();

		if (Number.isInteger(Number.parseInt(e.key))) {
			const index = Number.parseInt(e.key) - 1;
			if (cameras[index]) {
				cameraIndex = index;
			}
		} else {
			switch (e.key) {
				case 'c':
					if (cameraIndex === cameras.length - 1) {
						cameraIndex = 0;
						return;
					}
					cameraIndex++;
					break;
			}
		}
	};

	/* Setup simulation */
	let delta = 1 / 60;
	let time = -delta;

	let update = function() {
		time += delta;

		let currentCamera = cameras[cameraIndex];

		if (currentCamera.rotation > 0) {
			currentCamera.inner.position.x = currentCamera.rotation * Math.sin(time);
			currentCamera.inner.position.z = currentCamera.rotation * Math.cos(time);
		}
		currentCamera.inner.lookAt(new THREE.Vector3(0, 0, 0));
	};

	/* Simulation loop */
	let render = function() {
		let currentCamera = cameras[cameraIndex];

		requestAnimationFrame(render);

		update();
		renderer.render(scene, currentCamera.inner);
	};

	render();
};
