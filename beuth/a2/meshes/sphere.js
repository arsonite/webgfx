import Mesh from '../engine/mesh.js';

let _sphereMeshes = {};

class Sphere {
	constructor(gl, config) {
		// check if we have already created sphere with the dimensions
		let key =
			'' + config.numLatitudes + '' + config.numLongitudes + '' + config.radius;
		if (!_sphereMeshes[key]) {
			console.log(
				`creating a new unit sphere mesh with resolution (${
					config.numLatitudes
				}, ${config.numLongitudes}).`
			);
			let coords = [];
			let texcoords = [];
			let normals = [];
			let indices = [];

			// generate the attributes
			for (let latitude = 0; latitude <= config.numLatitudes; ++latitude) {
				let theta = (latitude * Math.PI) / config.numLatitudes;
				let sinTheta = Math.sin(theta);
				let cosTheta = Math.cos(theta);

				for (
					let longitude = 0;
					longitude <= config.numLongitudes;
					++longitude
				) {
					let phi = (longitude * 2 * Math.PI) / config.numLongitudes;
					let cosPhi = Math.cos(phi);
					let sinPhi = Math.sin(phi);
					let x = cosPhi * sinTheta;
					let y = cosTheta;
					let z = sinPhi * sinTheta;
					coords.push(x * config.radius);
					coords.push(y * config.radius);
					coords.push(z * config.radius);
					normals.push(x);
					normals.push(y);
					normals.push(z);
					texcoords.push(1 - longitude / config.numLongitudes); // u
					texcoords.push(1 - latitude / config.numLatitudes); // v
				}
			}

			// generate the indices
			for (let latitude = 0; latitude < config.numLatitudes; ++latitude)
				for (let longitude = 0; longitude < config.numLongitudes; ++longitude) {
					let first = latitude * (config.numLongitudes + 1) + longitude;
					let second = first + config.numLongitudes + 1;

					indices.push(second);
					indices.push(first);
					indices.push(first + 1);

					indices.push(second + 1);
					indices.push(second);
					indices.push(first + 1);
				}

			_sphereMeshes[key] = new Mesh(gl, {
				coords: coords,
				texcoords: texcoords,
				normals: normals,
				indices: indices,
				primitiveType: gl.TRIANGLES
			});
		}

		this.mesh = _sphereMeshes[key];
	}
}

export default Sphere;
