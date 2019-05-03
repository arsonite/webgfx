/**
 * A very simple class to store x and y values as a point.
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getDistance = (point) => {
        return Math.sqrt(Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2));
    };
}

export default Point;