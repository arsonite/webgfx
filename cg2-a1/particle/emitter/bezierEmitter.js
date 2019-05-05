/**
 * Created by Martin Puse (C) at Beuth University
 */
import ParticleEmitter from './particleEmitter.js';

import Point from '../../util/point.js';

const _ = undefined;

/**
 * 
 */
class BezierEmitter extends ParticleEmitter {
    constructor(config) {
        super(config);

        this.updateDistances();

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

    render = (context, debug) => {
        if (!debug) return;

        this.coordinates.forEach((coordinate, i) => {
            if (i + 1 >= this.coordinates.length) return;
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(coordinate.x, coordinate.y);
            context.lineTo(this.coordinates[i + 1].x, this.coordinates[i + 1].y);
            context.stroke();
        });
    };

    place = () => {
        /* If the period is undefined, assign as random t [0-1], if not calculate the t from the counter */
        let t = this.pediod === _ ? Math.random() : ((this.counter * 100) / this.period) / 100;
        if (t >= 1.0) this.counter = 0; // Resets the counter when 100%/1.0 is reached

        let x = 0;
        let y = 0;
        let n = this.coordinates.length - 1;
        this.coordinates.forEach((coordinate, i) => {
            let f = i === 0 || i === n ? 1 : n;

            /* General bezier-formula: (n) = t^i * (1 - t)^n-i * pi
             *                         (i)
             */
            x += f * Math.pow(t, i) * Math.pow(1 - t, n - i) * coordinate.x;
            y += f * Math.pow(t, i) * Math.pow(1 - t, n - i) * coordinate.y;
        });
        this.position = new Point(x, y);
    };
}
export default BezierEmitter;
