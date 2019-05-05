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
     * Based on the following calculation:
     * 
     */
    getDistance = (point) => {
        return Math.sqrt(Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2));
    };
}

export default Point;