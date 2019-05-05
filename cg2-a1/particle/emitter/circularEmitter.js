/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import ParticleEmitter from './particleEmitter.js';

import Dragger from '../../util/dragger.js';
import Point from '../../util/point.js';

const _ = undefined;

/**
 * A circular particle emitter, that emits particle dependent on the given angles
 * 
 * @param config.radius, The radius of the 
 * @param config.period, 
 */
class CircularEmitter extends ParticleEmitter {
  constructor(config) {
    super(config);

    /* The radius of the circle which spawns the particles */
    this.radius = config.radius !== _ ? config.radius : 50;
    /* One period around the circle */
    this.period = config.period !== _ ? config.period : 'none';

    /* Places a dragger in the centre of the circle and on the right side of the radius */
    this.draggers = [
      new Dragger(this.coordinates[0]),
      new Dragger(new Point(this.coordinates[0].x + this.radius, this.coordinates[0].y))
    ];
  }

  update = partSys => {
    this.coordinates[0] = this.draggers[0].position;

    /* Calculating the distance between the two draggers of the circle */
    this.radius = this.draggers[0].position.getDistance(this.draggers[1].position);

    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  /**
   * 
   */
  render = context => {
    context.beginPath();
    context.arc(this.coordinates[0].x, this.coordinates[0].y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = '#FFF';
    context.stroke();
  };

  /**
   * 
   */
  place = () => {
    let angle;
    if (this.period === 'none') {
      angle = Math.random() * Math.PI * 2; // Calculates a random circular angle
    } else {
      /* Calculates the placement angle dependent on the current timer-count */
      angle = ((this.counter * 360) / this.period / 360) * Math.PI * 2;
    }

    this.position = new Point(
      this.coordinates[0].x + Math.cos(angle) * this.radius,
      this.coordinates[0].y + Math.sin(angle) * this.radius
    );
  };
}
export default CircularEmitter;
