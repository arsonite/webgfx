attribute vec3 vertexPosition;
attribute vec3 vertexNormal;
attribute vec2 vertexTexcoords; 

uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;

struct Light{
	vec4 position;
	vec3 color;
};
uniform Light light;

varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec3 ecLightPosition;

varying vec2 texcoords;

void main() {

    ecPosition = (modelViewMatrix * vec4(vertexPosition, 1.0)).xyz;
    ecNormal = normalize(normalMatrix * vertexNormal);
    ecLightPosition = (viewMatrix * light.position).xyz;

    //gl_Position = projectionMatrix * vec4(ecPosition, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);

    texcoords = vertexTexcoords;
}