class Light {
	constructor(gl, config) {
		this.position = config.position;
		this.color = config.color;

		// extend with more properties, e.g. attenuation
	}
}

export default Light;
