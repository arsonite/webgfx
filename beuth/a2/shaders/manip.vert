uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float simtime;

attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying vec4 color;

void main() {
	gl_PointSize = 10.0;
	float sinus = sin(simtime);
	float x = vertexPosition.x * sinus;
	float y = vertexPosition.y * sinus;
	float z = vertexPosition.z * sinus;
	vec4 pos = vec4(x, y, z, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * pos;

    color = vertexColor;
}
