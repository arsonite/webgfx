/**
 * Created by Burak Günaydin (853872) at Beuth University.
 */

/**
 * A very simple class to store x and y values as a vector.
 */
class Vector {
	/**
	 * @param {Integer} x, Horizontal placement
	 * @param {Integer} y, Vertical placement
	 * @param {Integer} z, z placement
	 */
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * A function to calculate the distance between vector a and vector b.
	 * Based on the distance formular: Square root of (a - x)^2 + (b - y)^2 + (c - z)^2
	 */
	getDistance = vector => {
		return Math.sqrt(
			Math.pow(vector.x - this.x, 2) +
				Math.pow(vector.y - this.y, 2) +
				Math.pow(vector.z - this.z, 2)
		);
	};

	/**
	 * A function to calculate the angle between two vectors
	 */
	getAngle = (vector, inDegrees = false) => {
		let angle = Math.atan2(vector.x - this.x, vector.y - this.y);
		if (inDegrees) {
			/* Convert radians to degrees */
			angle *= 180 / Math.PI;
			/* Keeps the angle between 0 and 360 */
			angle = angle + Math.ceil(-angle / 360) * 360;
		}
		return angle;
	};
}

export default Vector;
