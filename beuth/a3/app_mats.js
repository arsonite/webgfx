//------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera1 = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera1.position.z = 35;

var camera2 = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera2.position.y = 35;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Configure renderer clear color
renderer.setClearColor('#000000');

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

//shadow

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append Renderer to DOM
document.body.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material

const objects = [];

//textures
var textureSun = new THREE.TextureLoader().load('./textures/sun_map.jpg');
var textureEarth = new THREE.TextureLoader().load('./textures/earth_map.jpg');
var textureMars = new THREE.TextureLoader().load('./textures/mars_map.jpg');
var textureMoon = new THREE.TextureLoader().load('./textures/moon_map.jpg');
var textureSky = new THREE.TextureLoader().load('./textures/skybox.jpg');

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

//skybox
var skyGeometry = new THREE.SphereBufferGeometry(300, 32, 32);
var skyMaterial = new THREE.MeshBasicMaterial({ map: textureSky });
skyMaterial.side = THREE.BackSide;
var sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

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

//scene.add(light);

//scene.add(directionalLight);

//functions

var i = 0;
var axis = new THREE.Vector3(0.5, 0.5, 0);
var cam1 = true;
var cam2 = false;
// Render Loop
var render = function() {
	requestAnimationFrame(render);

	objects.forEach(obj => {
		obj.rotation.y += 0.01;
	});
	marsOrbit.rotation.y += 0.005;
	earthOrbit.rotation.y += 0.05;

	document.onkeydown = function(event) {
		switch (event.key) {
			case '1':
				cam1 = true;
				cam2 = false;
				break;
				console.log('1');
			case '2':
				cam1 = false;
				cam2 = true;
				break;
				console.log('1');
		}
	};

	if (cam1) {
		camera1.lookAt(sunsystem.getWorldPosition());
		renderer.render(scene, camera1);
	} else if (cam2) {
		camera2.lookAt(sunsystem.getWorldPosition());
		renderer.render(scene, camera2);
	}

	// Render the scene
};

render();
