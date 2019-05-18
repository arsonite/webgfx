uniform float simtime;

varying vec4 color;

void main() {
	float r,g,b,a;
	r = color[0] * sin(simtime);
	r = color[1] * cos(simtime);
	b = color[2] * tan(simtime);
	a = color[3] * cos(simtime);
	gl_FragColor = vec4(r, g, b, a);
}