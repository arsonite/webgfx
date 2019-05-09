
import Mesh 	from './mesh.js'
import Material from './material.js'
import Program  from './program.js'
import { mat4 } from '../../lib/gl-matrix-1.3.7.js'
import util     from '../util.js'

/*
 * A model is an instance of a mesh in the scene.
 * It can be placed uniquely through a transform matrix
 * and rendered depending on its material and assigned gl program.
 */
class Model {
	constructor(gl, config) {

		this.mesh      = config.mesh
		this.material  = config.material
		this.program   = config.program
		this.transform = config.transform || mat4.identity()

		if (!(this.mesh    instanceof Mesh)   ) util.fatal('models must contain a mesh')
		if (!(this.program instanceof Program)) util.fatal('models must have a program assigned')
	}

	render(program) {
		program = program || this.program

		if (this.material) {
			this.material.bind(program)
		}
		this.mesh.bind(program)
		this.mesh.render()
		this.mesh.unbind(program)
	}
}


export default Model
