/*
 * Base class for gl buffers.
 */
class GLBuffer {
	constructor(gl, config) {
		this.gl = gl;
		this.type = config.type;
		this.datatype = config.dataType || gl.FLOAT;
		this.numElems = config.data.length / config.numComponents;
		this.numComps = config.numComponents;

		// create the WebGL buffer object and copy the data
		this.buffer = gl.createBuffer();
		this.bind();
		gl.bufferData(this.type, config.data, config.usage || gl.STATIC_DRAW);
		this.unbind();
	}

	bind() {
		this.gl.bindBuffer(this.type, this.buffer);
	}
	unbind() {
		this.gl.bindBuffer(this.type, null);
	}

	numElements() {
		return this.numElems;
	}
	numComponents() {
		return this.numComps;
	}
	dataType() {
		return this.datatype;
	}
}

/*
 * An attribute buffer can take arbitrary data for vertex attributes,
 * for example vec3 (xyz) for positions or vec4 (rgba) for colors.
 * It is up to the programmer to specify the layout.
 */
class AttributeBuffer extends GLBuffer {
	constructor(gl, config) {
		config.type = gl.ARRAY_BUFFER; // specialize the buffer

		// convert array to typed array if the user just provided a normal array
		if (!(config.data instanceof Float32Array))
			config.data = new Float32Array(config.data);

		super(gl, config);
	}
}

/*
 * An index buffer takes indices to reference attribute values
 * across attribute buffers.
 */

class IndexBuffer extends GLBuffer {
	constructor(gl, config) {
		config.type = gl.ELEMENT_ARRAY_BUFFER; // specialize the buffer

		// convert array to Uint16Array if necessary
		if (!(config.data instanceof Uint16Array))
			config.data = new Uint16Array(config.data);

		config.numComponents = 1;
		config.dataType = gl.UNSIGNED_SHORT;

		super(gl, config);
	}
}

export { AttributeBuffer, IndexBuffer };
