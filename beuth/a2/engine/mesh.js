import {
	AttributeBuffer,
	IndexBuffer
} from './buffer.js'


/*
 * A mesh contains the geometric data through vertices.
 * Vertices for this mesh class can have positions, colors, normals and texture coordinates.
 * The attributes can be rendered directly or with indices.
 */
class Mesh {
	constructor(gl, config) {
		this.gl = gl
		this.primitiveType = config.primitiveType >= 0 ? config.primitiveType : gl.TRIANGLES
		
		if (config.coords)
		this.coordsBuffer = new AttributeBuffer(gl, {
			numComponents : 3,	// xyz
			dataType      : gl.FLOAT,
			data          : config.coords
		})

		if (config.colors)
		this.colorsBuffer = new AttributeBuffer(gl, {
			numComponents : 4,	// rgba
			dataType      : gl.FLOAT,
			data          : config.colors 
		})

		if (config.texcoords)
		this.texcoordsBuffer = new AttributeBuffer(gl, {
			numComponents : 2,	// uv
			dataType      : gl.FLOAT,
			data          : config.texcoords 
		})

		if (config.normals)
		this.normalsBuffer = new AttributeBuffer(gl, {
			numComponents : 3,	//xyz
			dataType      : gl.FLOAT,
			data          : config.normals 
		})

		if (config.indices)
		this.indicesBuffer = new IndexBuffer(gl, {
			// numComponents is 1 by definition
			// dataType is integer by definition
			data : config.indices
		})   
	}

	bind(program) {
		switch (program.name) {
			
			case 'color':
			case 'manip':
				if (this.coordsBuffer) program.setAttribute('vertexPosition', this.coordsBuffer)
				
				break
			
			case 'phong_vertex':
			case 'phong_pixel':
				if (this.coordsBuffer) program.setAttribute('vertexPosition', this.coordsBuffer)
				if (this.normalsBuffer) program.setAttribute('vertexNormal', this.normalsBuffer)
				break	
		}

		this.indicesBuffer ?
			this.indicesBuffer.bind() :
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null)
	}

	unbind(program) {
		program.unsetAttributes()
	}

	render() {
		let gl = this.gl
		
		this.indicesBuffer ?
			gl.drawElements(this.primitiveType, this.indicesBuffer.numElements(), gl.UNSIGNED_SHORT, 0) :
			gl.drawArrays(this.primitiveType, 0, this.coordsBuffer.numElements())
	}
}


export default Mesh
