
import { mat4 } from '../../lib/gl-matrix-1.3.7.js'

/*
 * Simple wrapper for camera data.
 */ 
class Camera {
	constructor(gl, config) {
		this.gl  = gl
		
		// setup to opengl default
		this.eye = [0,0,1]	// position of the camera
		this.pov = [0,0,0]	// focus point of the camera
		this.up  = [0,1,0]	// up orientation of the camera

		this.perspective = true

		this.fovy  = 45
		this.znear = 0.01
		this.zfar  = 100
		this.orthoScale = 1
	}

	setPerspective(persp) {
		this.perspective = !!persp
	}

	getProjection() {
		let os = this.orthoScale
		let aspectRatio = this.gl.drawingBufferWidth / this.gl.drawingBufferHeight
		return this.perspective ?
			mat4.perspective(this.fovy, aspectRatio, this.znear, this.zfar) : 
			mat4.ortho(-aspectRatio * os, aspectRatio * os, -os, os, this.znear, this.zfar)
	}

	getView() {
		return mat4.lookAt(
			this.eye,
			this.pov,
			this.up
		)
	}

	lookAt(eye, pov, up=[0,1,0]) {
		this.eye = eye  
		this.pov = pov
		this.up  = up
	}
}


export default Camera
