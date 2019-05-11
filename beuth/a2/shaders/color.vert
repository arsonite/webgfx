uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying vec4 color;

void main() {
	gl_PointSize = 10.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);

    color = vertexColor;
}
