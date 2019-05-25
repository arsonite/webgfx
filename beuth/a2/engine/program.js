import util from '../util.js';

class Shader {
	constructor(gl, config) {
		// compile and attach fragment shader
		this.glShader = gl.createShader(config.type);
		gl.shaderSource(this.glShader, config.code);
		gl.compileShader(this.glShader);

		// check successful compilation
		if (!gl.getShaderParameter(this.glShader, gl.COMPILE_STATUS)) {
			util.fatal(
				`creating shader failed: ${gl.getShaderInfoLog(this.glShader)}`
			);
			gl.deleteShader(this.glShader);
		}
	}
}

let _currentProgram = null;
let _boundTextures = [];

let _glTypeToString = function(gl, type) {
	switch (type) {
		case gl.FLOAT:
			return 'FLOAT';
		case gl.FLOAT_VEC2:
			return 'FLOAT_VEC2';
		case gl.FLOAT_VEC3:
			return 'FLOAT_VEC3';
		case gl.FLOAT_VEC4:
			return 'FLOAT_VEC4';
		case gl.INT:
			return 'INT';
		case gl.INT_VEC2:
			return 'INT_VEC2';
		case gl.INT_VEC3:
			return 'INT_VEC3';
		case gl.INT_VEC4:
			return 'INT_VEC4';
		case gl.BOOL:
			return 'BOOL';
		case gl.BOOL_VEC2:
			return 'BOOL_VEC2';
		case gl.BOOL_VEC3:
			return 'BOOL_VEC3';
		case gl.BOOL_VEC4:
			return 'BOOL_VEC4';
		case gl.FLOAT_MAT2:
			return 'FLOAT_MAT2';
		case gl.FLOAT_MAT3:
			return 'FLOAT_MAT3';
		case gl.FLOAT_MAT4:
			return 'FLOAT_MAT4';
		case gl.SAMPLER_2D:
			return 'SAMPLER_2D';
		case gl.SAMPLER_CUBE:
			return 'SAMPLER_CUBE';
		default:
			return 'UNKNOWN_TYPE';
	}
};

class Program {
	constructor(gl, config) {
		this.gl = gl;
		this.name = config.name;
		this.attributes = {};
		this.uniforms = {};

		// create compiled shaders
		let vertexShader;
		try {
			vertexShader = new Shader(gl, {
				type: gl.VERTEX_SHADER,
				code: config.codes[0]
			});
		} catch (ex) {
			util.fatal(`in vertex shader >${config.name}<: ` + ex);
		}
		let fragmentShader;
		try {
			fragmentShader = new Shader(gl, {
				type: gl.FRAGMENT_SHADER,
				code: config.codes[1]
			});
		} catch (ex) {
			util.fatal(`in fragment shader >${config.name}<: ` + ex);
		}

		// create a new WebGL program object
		this.glProgram = gl.createProgram();

		// attach the compiled shaders
		gl.attachShader(this.glProgram, vertexShader.glShader);
		gl.attachShader(this.glProgram, fragmentShader.glShader);

		// link the program so it can be used
		gl.linkProgram(this.glProgram);

		// check successful linkage
		if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
			util.fatal(
				`linking program >${this.name}< failed: ${gl.getProgramInfoLog(
					this.glProgram
				)}`
			);
			gl.deleteProgram(this.glProgram);
		}

		// read out all active attributes
		let numActiveAttributes = gl.getProgramParameter(
			this.glProgram,
			gl.ACTIVE_ATTRIBUTES
		);

		for (let i = 0; i < numActiveAttributes; ++i) {
			let attribInfo = gl.getActiveAttrib(this.glProgram, i);
			let location = gl.getAttribLocation(this.glProgram, attribInfo.name);
			this.attributes[attribInfo.name] = {
				location: location,
				type: _glTypeToString(gl, attribInfo.type)
			};
		}

		// read out all active uniforms
		let numActiveUniforms = gl.getProgramParameter(
			this.glProgram,
			gl.ACTIVE_UNIFORMS
		);

		for (let i = 0; i < numActiveUniforms; ++i) {
			let uniformInfo = gl.getActiveUniform(this.glProgram, i);
			let location = gl.getUniformLocation(this.glProgram, uniformInfo.name);
			this.uniforms[uniformInfo.name] = {
				location: location,
				type: _glTypeToString(gl, uniformInfo.type)
			};
		}
	}

	// loads a program into the GPU pipeline for usage
	// NOTE: this operation is expensive, so it is ignored when not necessary
	use() {
		if (_currentProgram !== this) {
			_currentProgram = this;
			this.gl.useProgram(this.glProgram);
		}
	}

	// returns the location of an attribute when present
	getAttribLocation(name) {
		return this.attributes[name] ? this.attributes[name].location : -1;
	}

	// returns the location of an attribute when present
	getUniformLocation(name) {
		return this.uniforms[name] ? this.uniforms[name].location : -1;
	}

	setUniform(name, value) {
		// get the location of the uniform within the program object
		let uniform = this.uniforms[name];
		if (!uniform) {
			util.warn(`uniform variable >${name}< not used in shader.`);
			return;
		}

		let location = uniform.location;
		switch (uniform.type) {
			case 'FLOAT':
				this.gl.uniform1f(location, value);
				return;
			case 'FLOAT_VEC2':
				this.gl.uniform2fv(location, value);
				return;
			case 'FLOAT_VEC3':
				this.gl.uniform3fv(location, value);
				return;
			case 'FLOAT_VEC4':
				this.gl.uniform4fv(location, value);
				return;
			case 'INT':
				this.gl.uniform1i(location, value);
				return;
			case 'INT_VEC2':
				this.gl.uniform2iv(location, value);
				return;
			case 'INT_VEC3':
				this.gl.uniform3iv(location, value);
				return;
			case 'INT_VEC4':
				this.gl.uniform4iv(location, value);
				return;
			case 'BOOL':
				this.gl.uniform1i(location, value);
				return;
			case 'BOOL_VEC2':
				this.gl.uniform2iv(location, value);
				return;
			case 'BOOL_VEC3':
				this.gl.uniform3iv(location, value);
				return;
			case 'BOOL_VEC4':
				this.gl.uniform4iv(location, value);
				return;
			case 'FLOAT_MAT2':
				this.gl.uniformMatrix2fv(location, false, value);
				return;
			case 'FLOAT_MAT3':
				this.gl.uniformMatrix3fv(location, false, value);
				return;
			case 'FLOAT_MAT4':
				this.gl.uniformMatrix4fv(location, false, value);
				return;
			default:
				util.fatal(
					`setUniform(): unknown uniform type ${this.uniforms[name].type}`
				);
		}
	}

	// get location to which this attribute is bound
	// in the currently active WebGL program
	setAttribute(name, buffer) {
		let gl = this.gl;

		// NOTE: attribute locations are just numbers
		// uniform locations are WebGLUniformLocation objects
		let attribute = this.attributes[name];
		if (attribute && attribute.location >= 0) {
			// which part of the buffer is to be used for this object
			buffer.bind();
			gl.vertexAttribPointer(
				attribute.location,
				buffer.numComponents(),
				buffer.dataType(),
				false,
				0,
				0
			);
			gl.enableVertexAttribArray(attribute.location); // enable this array / buffer
		} else util.warn(`vertex attribute >${name}< not used in vertex shader.`);
	}

	// disable a specific attribute
	unsetAttribute(name) {
		let attribute = this.attributes[name];
		if (attribute && attribute.location >= 0) {
			this.gl.disableVertexAttribArray(attribute.location);
		}
	}

	// disables all activated attributes
	unsetAttributes() {
		for (let name in this.attributes) {
			let attribute = this.attributes[name];
			if (attribute && attribute.location >= 0)
				this.gl.disableVertexAttribArray(attribute.location);
		}
	}

	setTexture(name, unit, texture) {
		let gl = this.gl;

		// find location of texture's uniform variable
		let uniform = this.uniforms[name];
		if (!uniform) {
			util.warn(`uniform sampler ${name} not used in shader.`);
			return;
		}
		if (uniform.type !== 'SAMPLER_2D') {
			util.warn(`uniform ${name} is not sampler 2d type.`);
			return;
		}

		// is the desired texture unit within the allowed range?
		if (unit < 0 || unit >= gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)
			util.fatal(
				`texture unit ${unit} out of range [0 ... '${gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS -
					1}]`
			);

		gl.uniform1i(uniform.location, unit); // bind the texture unit to the sampler's location/name

		if (_boundTextures[unit] !== texture.glTexture) {
			_boundTextures[unit] = texture.glTexture;
			gl.activeTexture(gl.TEXTURE0 + unit); // activate the right texture unit
			gl.bindTexture(gl.TEXTURE_2D, texture.glTexture); // bind the actual texture object to the texture unit
		}
	}
}

export default Program;
