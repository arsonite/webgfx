/**
* A very simple class to store x and y values as a vector.
* 
* @param x, Horizontal placement
* @param y, Vertical placement
*/
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * A function to calculate the distance between vector a and vector b.
     * Based on the distance formular: Square root of (a - x)^2 + (b - y)^2
     */
    calculateDistance = vector => {
        return Math.sqrt(Math.pow((vector.x - this.x), 2) + Math.pow((vector.y - this.y), 2));
    };

    /**
     * A function to calculate the angle between two vectors
     */
    calculateAngle = (vector, inDegrees = false) => {
        /* https://stackoverflow.com/questions/9970281/java-calculating-the-angle-between-two-points-in-degrees */
        let angle = Math.atan2(vector.x - this.x, vector.y - this.y);
        if (inDegrees) {
            /* Convert radians to degrees */
            angle *= (180 / Math.PI);
            /* Keeps the angle between 0 and 360 */
            angle = angle + Math.ceil(-angle / 360) * 360;
        }
        return angle;
    }
}

export default Vector;