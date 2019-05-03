/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import ParticleEmitter from './particleEmitter.js';

import Dragger from '../../dragger.js';
import Point from '../../point.js';

const _ = undefined;

/**
 * 
 */
class LineEmitter extends ParticleEmitter {
    constructor(config) {
        super(config);

        this.coordinates = [];
        this.draggers = [];
        config.coordinates.forEach(coordinate => {
            let point = new Point(coordinate[0], coordinate[1]);
            this.coordinates.push(point);
            this.draggers.push(new Dragger(point));
        });

        this.period = config.period !== _ ? config.period : 100;

        this.MAX_DISTANCE = 0;
        this.distances = [];
    }

    /**
     *
     */
    update = partSys => {
        this.draggers.forEach((dragger, i) => {
            this.coordinates[i].x = dragger.position.x;
            this.coordinates[i].y = dragger.position.y;
        });

        this.counter++;
        if (this.counter % this.interval === 0) this.emit(partSys);
    };

    /**
     * 
     */
    render = context => {
        this.coordinates.forEach((coordinate, i) => {
            if (i + 1 >= this.coordinates.length) return;
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(coordinate.x, coordinate.y);
            context.lineTo(this.coordinates[i + 1].x, this.coordinates[i + 1].y);
            context.stroke();
        });
    };

    /**
     * 
     */
    place = () => {
        let p1 = this.coordinates[0];
        let p2 = this.coordinates[1];
        let distance = p1.getDistance(p2);
        /* */
        let t = (this.counter * distance) / this.period / distance;
        if (t > 1.0) this.counter = 0;
        /* 
         * x = (1 - t) * x0 + t * x1
         * y = (1 - t) * y0 + t * y1
         */
        this.position = { x: (1 - t) * p1.x + (t * p2.x), y: (1 - t) * p1.y + (t * p2.y) };
    };
}
export default LineEmitter;
