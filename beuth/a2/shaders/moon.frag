uniform mat4 projectionMatrix;
uniform vec3 ambientLight;

struct Material{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};
uniform Material material;

struct Light{
	vec4 position;
	vec3 color;
};
uniform Light light;

uniform sampler2D moonTex;

varying vec2 texcoords;
varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec3 ecLightPosition;

vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lp, vec3 lc){
	vec3 toLight = normalize(lp-p);
	vec3 reflectLight = reflect(-toLight, n);

	float ndots = max(dot(toLight, n), 0.0);
	float rdotv = max(dot(reflectLight, v), 0.0);

	vec3 ambi = material.ambient * ambientLight;
	vec3 diff = material.diffuse * ndots * lc;

	return ambi + diff;
}

void main() {
    vec3 viewDir = projectionMatrix[2][3] == 0.0 ? vec3(0, 0, 1) : normalize(-ecPosition);

    vec4 phong = vec4(phong(ecPosition, viewDir, ecNormal, ecLightPosition, light.color), 1);
    vec4 texture = texture2D(moonTex, texcoords);

	gl_FragColor = texture*phong;
}