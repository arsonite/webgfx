import d from '../script/document.js';
import u from '../script/utility.js';

const f = 1.0;

window.onload = () => {
	let canvas = d.tag('canvas');
	canvas.height = canvas.offsetHeight * f;
	canvas.width = canvas.offsetWidth * f;
	window.onresize = () => {
		canvas.height = canvas.offsetHeight * f;
		canvas.width = canvas.offsetWidth * f;
	};
	let context = canvas.getContext('2d');
};
