precision mediump float;

varying vec3 color;

void main() {
	// simply use interpolated colors computed in vertex shader
	gl_FragColor = vec4(color, 1.0);
}