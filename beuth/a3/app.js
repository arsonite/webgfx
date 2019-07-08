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
		factor: 1,
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
renderer.setClearColor('#000000');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/* Create a scene */
let scene = new THREE.Scene();
//let axesHelper = new THREE.AxesHelper(2);
//scene.add(axesHelper);

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

const objects = [];

//textures
var textureSun = new THREE.TextureLoader().load('./textures/sun_map.jpg');
var textureEarth = new THREE.TextureLoader().load('./textures/earth_map.jpg');
var textureMars = new THREE.TextureLoader().load('./textures/mars_map.jpg');
var textureMoon = new THREE.TextureLoader().load('./textures/moon_map.jpg');

//light
var light = new THREE.PointLight(0xfffff0, 2);
light.castShadow = true;

// sunsystem
var sunsystem = new THREE.Object3D();
scene.add(sunsystem);

//earthorbit
var earthOrbit = new THREE.Object3D();
earthOrbit.position.set(20, 0, 0);
sunsystem.add(earthOrbit);

//marsOrbit
var marsOrbit = new THREE.Object3D();
marsOrbit.position.set(0, 0, 0);
sunsystem.add(marsOrbit);

//Sun
var sunGeometry = new THREE.SphereBufferGeometry(6, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial({ map: textureSun });
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);
sun.add(light);
sun.add(earthOrbit);
sun.add(marsOrbit);
sunsystem.add(sun);

//earth
var earthGeometry = new THREE.SphereBufferGeometry(2, 32, 32);
var earthMaterial = new THREE.MeshPhongMaterial({ map: textureEarth });
var earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.receiveShadow = true;
earth.castShadow = true;
earth.position.set(20, 0, 0);

sun.add(earth);

//moon
var moonGeometry = new THREE.SphereBufferGeometry(0.5, 32, 32);
var moonMaterial = new THREE.MeshPhongMaterial({ map: textureMoon });
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.castShadow = true;
moon.receiveShadow = true;
moon.position.x = 3;
//contolls moon speed
earthOrbit.add(moon);

//mars
var marsGeometry = new THREE.SphereBufferGeometry(0.5, 32, 32);
var marsMaterial = new THREE.MeshPhongMaterial({ map: textureMars });
var mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.receiveShadow = true;
mars.castShadow = true;

mars.position.x = 10;
marsOrbit.add(mars);

objects.push(sun);
objects.push(earth);
objects.push(mars);
objects.push(moon);

// lights

//groups

// sceneAdds
scene.add(sunsystem);

/* Cameras */
let cameras = [
	new Camera({ position: { x: 0, y: 10, z: 50 }, rotation: 10 }),
	new Camera({ focus: earth }),
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
		currentCamera.inner.lookAt(currentCamera.focus);
	};

	/* Simulation loop */
	let render = function() {
		objects.forEach(obj => {
			obj.rotation.y += 0.01;
		});
		marsOrbit.rotation.y += 0.005;
		earthOrbit.rotation.y += 0.05;

		let currentCamera = cameras[cameraIndex];

		requestAnimationFrame(render);

		update();
		renderer.render(scene, currentCamera.inner);
	};

	render();
};
