
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 vertexPosition;


void main() {

	gl_PointSize = 10.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
}
