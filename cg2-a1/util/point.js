/**
 * Created by Burak Günaydin (853872) at Beuth University
 */

/**
 * A very simple class to store x and y values as a point.
 * 
 * @param x, Horizontal placement
 * @param y, Vertical placement
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * A function to calculate the distance between point a and point b.
     * Based on the distance formular: Square root of (a - x)^2 + (b - y)^2
     */
    getDistance = point => {
        return Math.sqrt(Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2));
    };

    /**
     * A function to calculate the angle between two points
     */
    getAngle = point => {
        /* https://stackoverflow.com/questions/9970281/java-calculating-the-angle-between-two-points-in-degrees */
        let angle = Math.atan2(point.x - this.x, point.y - this.y);
        /* Convert radians to degrees */
        angle *= (180 / Math.PI);
        /* Keeps the angle between 0 and 360 */
        angle = angle + Math.ceil(-angle / 360) * 360;
        return angle;
    };

}

export default Point;