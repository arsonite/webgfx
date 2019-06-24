uniform mat4 projectionMatrix;
uniform vec3 ambientLight;
uniform sampler2D dayTex;
uniform sampler2D nightTex;
uniform sampler2D waterTex;
uniform sampler2D cloudTex;

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

varying vec2 texcoords;
varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec3 ecLightPosition;

vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lp, vec3 lc, vec4 water){
	vec3 toLight = normalize(lp-p);
	vec3 reflectLight = reflect(-toLight, n);

	float ndots = max(dot(toLight, n), 0.0);
	float rdotv = max(dot(reflectLight, v), 0.0);

	vec3 ambi = material.ambient * ambientLight;
	vec3 diff = material.diffuse * ndots * lc;
	vec3 spec = material.specular * pow(rdotv, material.shininess)*lc*water.xyz;

	return ambi + diff + spec;
}

void main() {
    vec3 viewDir = projectionMatrix[2][3] == 0.0 ? vec3(0, 0, 1) : normalize(-ecPosition);

    vec3 toLight = normalize(ecLightPosition - ecPosition);

    vec4 phong = vec4(phong(ecPosition, viewDir, ecNormal, ecLightPosition, light.color, texture2D(waterTex, texcoords)), 1);

    float dotproduct = dot(ecNormal, toLight);
    dotproduct = min(1.0, dotproduct);
    dotproduct  = max(0.0, dotproduct);

	vec4 cloud = texture2D(cloudTex, texcoords) * 0.75;

    vec4 texture = dotproduct * (texture2D(dayTex, texcoords) + cloud) + (1.0 - dotproduct) * (texture2D(nightTex, texcoords) + cloud);

	gl_FragColor = texture*phong;
}