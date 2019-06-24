import util from '../util.js';

class Renderer {
	constructor(gl, config) {
		this.gl = gl;

		// query some stuff
		let glAttributes = gl.getContextAttributes();
		let antialias = gl.getContextAttributes().antialias;
		let samples = gl.getParameter(gl.SAMPLES);
		util.log(
			antialias
				? `antialiasing is supported with ${samples}x${samples} MSAA`
				: `antialiasing is not supported`
		);

		let maxVertexTextureUnits = gl.getParameter(
			gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS
		);
		let maxFragmentTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
		let maxCombinedTextureUnits = gl.getParameter(
			gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS
		);
		util.log(`max vertex shader textures: ${maxVertexTextureUnits}`);
		util.log(`max fragment shader textures: ${maxFragmentTextureUnits}`);
		util.log(`max combined shader textures: ${maxCombinedTextureUnits}`);

		let maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
		let maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		let maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
		util.log(`max texture size: ${maxTextureSize}`);
		util.log(`max cubemap size: ${maxCubemapSize}`);
		util.log(`max render buffer size: ${maxRenderbufferSize}`);

		let maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
		let maxVertexShaderUniform4FLoats = gl.getParameter(
			gl.MAX_VERTEX_UNIFORM_VECTORS
		);
		let maxFragmentShaderUniform4FLoats = gl.getParameter(
			gl.MAX_FRAGMENT_UNIFORM_VECTORS
		);
		let maxVarying4FLoats = gl.getParameter(gl.MAX_VARYING_VECTORS);
		util.log(`max number of vertex attributes: ${maxVertexAttributes}`);
		util.log(
			`max vertex shader 4-float-component uniforms: ${maxVertexShaderUniform4FLoats}`
		);
		util.log(
			`max fragment shader 4-float-component uniforms: ${maxFragmentShaderUniform4FLoats}`
		);
		util.log(`max 4-float-component varyings: ${maxVarying4FLoats}`);

		let highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
		util.log(`high precision in shader supported: ${highp.precision != 0}`);
	}

	clear(scene) {
		let gl = this.gl;
		let canvas = gl.canvas;

		// clear color and depth buffers
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		// set up depth test to discard occluded fragments
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);

		// only show front geometry
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);

		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	}

	render(scene, controller) {
		// prepare next frame
		this.clear(scene);

		// render the scene
		scene.render(this.gl);

		// render the hud over the scene
		controller.render();
	}
}

export default Renderer;
