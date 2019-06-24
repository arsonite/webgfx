import shaders from './engine/shaders.js';
import textures from './engine/textures.js';

import Camera from './engine/camera.js';
import Light from './engine/light.js';
import Material from './engine/material.js';
import Program from './engine/program.js';

import Gizmo from './meshes/gizmo.js';
import Sphere from './meshes/sphere.js';
import Cube from './meshes/cube.js';
import Model from './engine/model.js';

import { mat3, mat4 } from '../lib/gl-matrix-1.3.7.js';

class Scene {
	constructor(gl) {
		// store the WebGL rendering context
		this.gl = gl;
		this.simtime = 0;

		this.camera = new Camera(gl);
		this.camera.lookAt([0, 0.5, 10], [0, 0, 0], [0, 1, 0]);

		this.lights = [];
		// a light
		/*
		this.lights[0] = new Light(gl, {
			position: [10, 5, 20, 1],
			color: [1, 0.8, 0.5]
		});
		*/
		this.lights[0] = new Light(gl, {
			position: [10, 5, 20, 1],
			color: [1, 1, 1]
		});
		//Aufgabe 2.2.3
		this.lights[1] = new Light(gl, {
			position: [-5, 10, 2, 1],
			color: [0.3, 0.9, 0.1]
		});
		this.lights[2] = new Light(gl, {
			position: [15, 5, 15, 1],
			color: [0.5, 0.2, 1]
		});

		this.materials = {};
		// a material
		this.materials['white'] = new Material(gl, {
			ambient: [0.5, 0.5, 0.5],
			diffuse: [0.8, 0.8, 0.8],
			specular: [1, 1.3, 1.5],
			shininess: 3
		});

		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
		this.modelMatrix = mat4.create();
		this.modelViewMatrix = mat4.create();
		this.normalMatrix = mat3.create();

		// load some meshes for use in modelsthis.gizmo = new Gizmo(gl);
		this.gizmo = new Gizmo(gl);
		this.cube = new Cube(gl, {
			//size: 2
		});
		this.sphere = new Sphere(gl, { numLongitudes: 100, numLatitudes: 100 });

		this.earth = new Sphere(gl, {
			numLongitudes: 100,
			numLatitudes: 100,
			radius: 4
		});
		this.moon = new Sphere(gl, {
			numLongitudes: 100,
			numLatitudes: 100,
			radius: 1
		});

		// add models to the scene
		this.models = {
			/*
			//Aufgabe 2.1
			gizmo: new Model(gl, {
				mesh: this.gizmo.mesh,
				program: shaders.getProgram('color')
			})
			'cube'  : new Model(gl, { mesh: this.cube.mesh, program: shaders.getProgram('manip') }),
			*/
			/*
			//Aufgabe 2.2.1
			sphere: new Model(gl, {
				mesh: this.sphere.mesh,
				material: this.materials['white'],
				program: shaders.getProgram('phong_vertex')
			})
			*/
			/*
			//Aufgabe 2.2.2
			sphere: new Model(gl, {
				mesh: this.sphere.mesh,
				material: this.materials['white'],
				program: shaders.getProgram('phong_vertex')
			}),
			sphere2: new Model(gl, {
				mesh: this.sphere.mesh,
				material: this.materials['white'],
				program: shaders.getProgram('phong_pixel'),
				transform: mat4.translate(mat4.identity(), [-5, -1, 1])
			})
			*/

			//Aufgabe 2.3
			earth: new Model(gl, {
				mesh: this.earth.mesh,
				material: this.materials['white'],
				program: shaders.getProgram('earth')
			}),
			moon: new Model(gl, {
				mesh: this.moon.mesh,
				material: this.materials['white'],
				program: shaders.getProgram('moon'),
				transform: mat4.translate(mat4.identity(), [-5, 5, 5])
			})
		};

		/*
		//Aufgabe 2.2.3
		const max = 10;
		const n = 100;

		for (let i = 0; i < n; i++) {
			let random = [];
			for (let i2 = 0, n2 = 3; i2 < n2; i2++) {
				const positive = Math.random() < 0.5;
				random[i2] = Math.random() * (positive ? max : -max);
			}

			this.models[i] = new Model(gl, {
				mesh: this.sphere.mesh,
				material: this.materials['white'],
				program: shaders.getProgram('phong_pixel'),
				transform: mat4.translate(mat4.identity(), random)
			});
		}
		*/
	}

	update(deltatime) {
		this.simtime += deltatime;

		// let the camera roate around the center of the scene
		let distance = 15;
		this.camera.lookAt(
			[distance * Math.sin(this.simtime), 6, distance * Math.cos(this.simtime)],
			[0, 0, 0],
			[0, 1, 0]
		);

		/*
		this.lights[2].position = [
			100,
			100 * Math.cos(this.simtime),
			100 * Math.sin(this.simtime),
			1
		];
		*/
	}

	render() {
		// get the actual camera matrices
		this.projectionMatrix = this.camera.getProjection();
		this.viewMatrix = this.camera.getView();

		// render all models
		for (let name in this.models) {
			let model = this.models[name];

			mat4.multiply(this.viewMatrix, model.transform, this.modelViewMatrix);
			this.setupProgram(model.program);
			model.render();
		}
	}

	setupProgram(program) {
		// bind program before setting uniforms
		program.use();

		// set this matrices for all programs
		program.setUniform('projectionMatrix', this.projectionMatrix);
		program.setUniform('modelViewMatrix', this.modelViewMatrix);

		// create normal matrix for lighting calculations
		/*this.normalMatrix = mat4.toInverseMat3(
			this.modelViewMatrix,
			this.normalMatrix
		);
		this.normalMatrix = mat3.transpose(this.normalMatrix);*/
		mat4.toInverseMat3(this.modelViewMatrix, this.normalMatrix);
		mat3.transpose(this.normalMatrix);

		program.setUniform('normalMatrix', this.normalMatrix);

		const light = this.lights[0];
		const { position, color } = light;

		const ambience = 0.5;
		const ambientLight = [0.25, 0.5, 0.75];

		switch (program.name) {
			case 'manip':
				program.setUniform('simtime', this.simtime);
				break;

			// Aufgabe 2.2.1
			case 'phong_vertex':
				program.setUniform('light.position', position);
				program.setUniform('light.color', color);
				program.setUniform('ambientLight', ambientLight);
				program.setUniform('viewMatrix', this.viewMatrix);
				break;

			// Aufgabe 2.2.2
			case 'phong_pixel':
				program.setUniform('light.position', position);
				program.setUniform('light.color', color);

				// Aufgabe 2.2.3
				//program.setUniform('lights', [this.lights[1], this.lights[2]]);

				program.setUniform('ambientLight', ambientLight);
				program.setUniform('viewMatrix', this.viewMatrix);
				break;

			case 'earth':
				program.setUniform('light.position', position);
				program.setUniform('light.color', color);
				program.setUniform('ambientLight', ambientLight);
				program.setUniform('viewMatrix', this.viewMatrix);

				program.use();
				program.setTexture('dayTex', 0, textures.getTexture('earthDay'));
				program.setTexture('nightTex', 1, textures.getTexture('earthNight'));
				program.setTexture('waterTex', 2, textures.getTexture('earthWater'));
				program.setTexture('cloudTex', 3, textures.getTexture('earthCloud'));
				break;

			case 'moon':
				program.setUniform('light.position', position);
				program.setUniform('light.color', color);
				program.setUniform('ambientLight', ambientLight);
				program.setUniform('viewMatrix', this.viewMatrix);

				program.use();
				program.setTexture('moonTex', 0, textures.getTexture('moon'));
				break;
		}
	}
}

export default Scene;
