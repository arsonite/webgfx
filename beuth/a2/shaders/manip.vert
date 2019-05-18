uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float simtime;

attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying vec4 color;

void main() {
	gl_PointSize = 10.0;

	float x = vertexPosition.x * sin(simtime);
	float y = vertexPosition.y * cos(simtime);
	float z = vertexPosition.z * sin(simtime);
	vec4 pos = vec4(x, y, z, 1.0);
	
	gl_Position = projectionMatrix * modelViewMatrix * pos;

    color = vertexColor;
}
