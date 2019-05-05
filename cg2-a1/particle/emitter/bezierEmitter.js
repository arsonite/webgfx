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
        let t = this.pediod === _ ? Math.random() : ((this.counter * 100) / this.period) / 100;
        if (t >= 1.0) this.counter = 0; // Resets the counter when 100%/1.0 is reached

        let x, y;
        this.coordinates.forEach((coordinate, i) => {
            let a0 = (1 - t) * this.coordinates[0].x + t * this.coordinates[1].x;
            let a1 = (1 - t) * this.coordinates[1].x + t * this.coordinates[2].x;
            let a2 = (1 - t) * this.coordinates[2].x + t * this.coordinates[3].x;

            let b0 = (1 - t) * a0 + t * a1;
            let b1 = (1 - t) * a1 + t * a2;

            let c = (1 - t) * b0 + t * b1;

            x = c;

            a0 = (1 - t) * this.coordinates[0].y + t * this.coordinates[1].y;
            a1 = (1 - t) * this.coordinates[1].y + t * this.coordinates[2].y;
            a2 = (1 - t) * this.coordinates[2].y + t * this.coordinates[3].y;

            b0 = (1 - t) * a0 + t * a1;
            b1 = (1 - t) * a1 + t * a2;

            c = (1 - t) * b0 + t * b1;

            y = c;
        });

        this.position = new Point(x, y);
    };
}
export default BezierEmitter;
