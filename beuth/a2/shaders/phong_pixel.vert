uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

attribute vec3 vertexPosition;
attribute vec3 vertexNormal;

varying vec3 color;

void main() {
	vec3 ecPosition = (modelViewMatrix * vec4(vertexPosition, 1.0)).xyz;
	vec3 ecNormal   = normalize(normalMatrix * vertexNormal);

	color = ecNormal;

	gl_Position  = projectionMatrix * vec4(ecPosition, 1.0);
}
