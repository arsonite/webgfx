import Texture from './texture.js';

let _defaultTexture = null;

/*
 * Multi purpose material. Combines properties of different types of materials
 * in one data aggregation. To be used with the appropiate program.
 */
class Material {
	constructor(gl, config) {
		if (!_defaultTexture)
			_defaultTexture = new Texture(gl, { name: 'default' });

		this.gl = gl;
		this.config = config;

		// simple
		config.ambient = config.ambient || [0, 0, 0];
		config.diffuse = config.diffuse || [1, 1, 1];
		config.specular = config.specular || [1, 1, 1];
		config.shininess = config.shininess || 32;

		// textured
		config.diffuseTexture = config.diffuseTexture || _defaultTexture;
	}

	bind(program) {
		let config = this.config;
		let gl = this.gl;

		program.setUniform('material.ambient', config.ambient);
		program.setUniform('material.diffuse', config.diffuse);

		switch (program.name) {
			case 'color':
				program.setUniform('material.specular', config.specular);
				program.setUniform('material.shininess', config.shininess);
				break;

			case 'phong_vertex':
				program.setUniform('material.specular', config.specular);
				program.setUniform('material.shininess', config.shininess);
				break;

			case 'phong_pixel':
				program.setUniform('material.specular', config.specular);
				program.setUniform('material.shininess', config.shininess);
				break;

			case 'earth':
				program.setUniform('material.specular', config.specular);
				program.setUniform('material.shininess', config.shininess);
				break;

			case 'moon':
				break;
		}
	}
}

export default Material;
