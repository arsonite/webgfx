/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 * Modified by Burak Günaydin (853872)
 */

const _ = undefined;
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
class StellarBody {
	constructor(
		name = 'test',
		extension = 'map',
		filetype = 'jpg',
		position = { x: 0, y: 0, z: 0 },
		type = 'Planet'
	) {
		this.model = new THREE.Object3D();
		this.texture = new THREE.TextureLoader().load(
			`${texturePath}${name}_${extension}.${filetype}`
		);
		this.position;
	}
}

/* Light */
let light = new THREE.PointLight(0xffff00, 1);
light.castShadow = true;

/* Skybox */
let textureSky = new THREE.TextureLoader().load(`${texturePath}skybox.jpg`);
let skyGeometry = new THREE.SphereBufferGeometry(300, 32, 32);
let skyMaterial = new THREE.MeshBasicMaterial({ map: textureSky });
skyMaterial.side = THREE.BackSide;
let sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

const stellarBodies = [new StellarBody('earth')];

/* Cameras */
class Camera {
	constructor(config) {
		let exists = (element, defaultValue) =>
			element !== _ ? element : defaultValue;

		this.fov = exists(config.fov, 90);
		this.ratio = exists(config.ratio, window.innerWidth / window.innerHeight);
		this.near = exists(config.near, 0.1);
		this.far = exists(config.far, 1000);

		this.ortho = exists(config.ortho, false);

		this.position = exists(config.position, { x: 0, y: 5, z: 5 });
		this.rotation = exists(config.rotation, 0);

		if (this.ortho) {
			this.inner = new THREE.OrthographicCamera(
				this.fov,
				this.ratio,
				this.near,
				this.far
			);
		} else {
			this.inner = new THREE.PerspectiveCamera(
				this.fov,
				this.ratio,
				this.near,
				this.far
			);
		}
		this.inner.position.x = this.position.x;
		this.inner.position.y = this.position.y;
		this.inner.position.z = this.position.z;
	}
}

let cameras = [
	new Camera({ rotation: 10 }),
	new Camera({ rotation: 2 }),
	new Camera({})
];
let cameraIndex = 0;

/* Apply transformation on window resize */
window.onresize = () => {
	config.render.width = window.innerWidth;
	config.render.height = window.innerHeight;
};

window.onload = () => {
	/* Setup simulation */
	let delta = 1 / 60;
	let time = -delta;

	let currentCamera = cameras[cameraIndex];

	let update = function() {
		time += delta;

		if (currentCamera.rotation > 0) {
			currentCamera.inner.position.x = currentCamera.rotation * Math.sin(time);
			currentCamera.inner.position.z = currentCamera.rotation * Math.cos(time);
		}
		currentCamera.inner.lookAt(new THREE.Vector3(0, 0, 0));
	};

	/* Simulation loop */
	let render = function() {
		requestAnimationFrame(render);

		update();
		renderer.render(scene, currentCamera.inner);
	};

	render();
};
