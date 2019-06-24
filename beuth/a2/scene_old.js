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
		this.lights[0] = new Light(gl, {
			position: [10, 5, 10, 1],
			color: [1, 1, 1]
		});

		this.materials = {};
		// a material
		this.materials['white'] = new Material(gl, {
			ambient: [0.1, 0.1, 0.1],
			diffuse: [1, 1, 1],
			specular: [1, 1, 1],
			shininess: 4
		});

		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
		this.modelMatrix = mat4.create();
		this.modelViewMatrix = mat4.create();
		this.normalMatrix = mat3.create();
		this.normalMatrix2 = mat3.create();

		// load some meshes for use in models
		this.gizmo = new Gizmo(gl);
		this.cube = new Cube(gl, {
			//size: 2
		});
		this.sphere = new Sphere(gl, { numLongitudes: 20, numLatitudes: 20 });

		// add models to the scene
		this.models = {
			/*gizmo: new Model(gl, {
		mesh: this.gizmo.mesh,
		program: shaders.getProgram('color')
	}),*/

			/*cube: new Model(gl, {
		mesh: this.cube.mesh,
		program: shaders.getProgram('manip')
	})*/

			sphere: new Model(gl, {
				mesh: this.sphere.mesh,
				material: this.materials['white'],
				program: shaders.getProgram('phong_vertex')
			})
		};
		console.log(this.models);
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
		this.normalMatrix = mat4.toInverseMat3(
			this.modelViewMatrix,
			this.normalMatrix
		);
		this.normalMatrix = mat3.transpose(this.normalMatrix);
		//mat4.toInverseMat3(this.modelViewMatrix, this.normalMatrix);
		//mat3.transpose(this.normalMatrix);

		switch (program.name) {
			case 'manip':
				program.setUniform('simtime', this.simtime);
				break;
			case 'phong_vertex':
				program.setUniform('light', this.lights[0]);
				program.setUniform('projectionMatrix', this.projectionMatrix);
				program.setUniform('modelViewMatrix', this.modelViewMatrix);
				program.setUniform('normalMatrix', this.normalMatrix);
				program.setUniform('viewMatrix', this.viewMatrix);
				break;
		}
	}
}

export default Scene;
