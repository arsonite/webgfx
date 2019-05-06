/**
 * Created by Martin Puse (C) at Beuth University
 */
import ParticleEmitter from './particleEmitter.js';

import Point from '../../util/point.js';

const _ = undefined;

/**
 * 
 */
class ParametricEmitter extends ParticleEmitter {
    constructor(config) {
        super(config);

        this.updateDistances();

        this.tRange = config.tRange;
        this.period = config.period;
    }

    /**
     * Updates the distances to reflect change of dragger movements
     */
    updateDistances = () => {
        this.distances = [];
        this.MAX_DISTANCE = 0;
        this.coordinates.forEach((coordinate, i) => {
            if (i + 1 >= this.coordinates.length) return;
            let nextPoint = this.coordinates[i + 1];
            let distance = coordinate.getDistance(nextPoint);
            this.distances.push(distance);
            this.MAX_DISTANCE += distance;
        });

        this.angle = this.coordinates[0].getAngle(this.coordinates[1]);
    }

    update = partSys => {
        this.draggers.forEach((dragger, i) => {
            this.coordinates[i].x = dragger.position.x;
            this.coordinates[i].y = dragger.position.y;
        });

        this.updateDistances();

        this.counter++;
        if (this.counter % this.interval === 0) this.emit(partSys);
    };

    getParametricCurve = (n) => {
        let segments = [];

        /* */
        let x = t => { return Math.sin(t); }
        let y = t => { return Math.cos(t); };

        /* */
        let u = (t, a) => { return t * Math.cos(a) - x(t) * Math.sin(a) };
        let v = (t, a) => { return t * Math.sin(a) + y(t) * Math.cos(a) };

        /* Rotating the parametric curve by determined angle
         * https://www.youtube.com/watch?v=BPgq2AudoEo - How to Rotate any Curve by any Angle
         */

        let tMin = this.tRange[0];
        let tMax = this.tRange[1];
        let t = tMin; // 
        for (let i = 0; i < n; i++) {
            /* */
            let delta = (tMax - tMin) / n;
            /* */
            //segments[i] = new Point(this.coordinates[0].x * u(t, this.angle), this.coordinates[0].y * v(t, this.angle));
            segments[i] = new Point(this.coordinates[0].x * x(t), this.coordinates[0].y * y(t));
            t = tMin + i * delta;
        }
        return segments;
    };

    render = (context, debug) => {
        if (!debug) return;

        let curve = this.getParametricCurve(100);
        for (let i = 1; i < curve.length; i++) {
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(curve[i - 1].x, curve[i - 1].y);
            context.lineTo(curve[i].x, curve[i].y);
            context.stroke();
        }
    };

    /**
     * 
     */
    place = () => {
        let t;
        if (this.period === _) {
            t = Math.random();
        } else {
            t = ((this.counter * 100) / this.period) / 100;
        }
        t = t * (this.tRange[1] - this.tRange[0]);
        //if (t >= 1.0) this.counter = 0; // Resets the counter when 100%/1.0 is reached

        //this.position = new Point(f(t), g(t));
    };
}
export default ParametricEmitter;
