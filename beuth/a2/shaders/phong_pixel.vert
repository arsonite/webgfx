uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

attribute vec3 vertexPosition; // p, n
attribute vec3 vertexNormal;

struct Material {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};
uniform Material material; // ka, kd, ks, a

struct Light {
	vec4 position;
	vec3 color;
};
uniform Light light; // LA, Lj, lj
//const int MAX_LIGHTS = 2;
//uniform Light lights[MAX_LIGHTS];

varying vec3 ecPosition;
varying vec3 ecNormal;
//varying vec3 ecLightPositions[MAX_LIGHTS];
varying vec3 ecLightPosition;

void main() {
	ecPosition = (modelViewMatrix * vec4(vertexPosition, 1.0)).xyz;
	ecNormal = normalize(normalMatrix * vertexNormal);
	ecLightPosition = (viewMatrix * light.position).xyz;

	//for (int i = 0; i < MAX_LIGHTS; ++i) {
	//	ecLightPositions[i] = (viewMatrix * lights[i].position).xyz;
	//}

	gl_Position = projectionMatrix * vec4(ecPosition, 1.0);
}