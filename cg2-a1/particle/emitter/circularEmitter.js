/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import ParticleEmitter from './particleEmitter.js';

import Dragger from '../../dragger.js';

const _ = undefined;

/**
 * 
 */
class CircularEmitter extends ParticleEmitter {
  constructor(config) {
    super(config);

    this.velocity = config.velocity !== _ ? config.velocity : { vx: 0, vy: 0 };

    this.radius = config.radius !== _ ? config.radius : 50;
    this.period = this.random ? _ : config.period !== _ ? config.period : 100;

    this.draggers = [new Dragger(this.coordinates), new Dragger({ x: this.coordinates.x + this.radius, y: this.coordinates.y })];
  }

  /**
   *
   */
  update = partSys => {
    this.coordinates = this.draggers[0].position;

    /* Circular distance formular: Square root of (x - a)^2 + (y - b)^2 */
    const distance = Math.sqrt(Math.pow((this.draggers[1].position.x - this.draggers[0].position.x), 2) + Math.pow((this.draggers[1].position.y - this.draggers[0].position.y), 2));
    this.radius = distance;

    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  /**
   * 
   */
  place = () => {
    let angle;
    if (this.random) {
      angle = Math.random() * Math.PI * 2; // Calculates a random circular angle
    } else {
      /* Calculates the placement angle dependent on the current timer-count */
      angle = ((this.counter * 360) / this.period / 360) * Math.PI * 2;
    }

    this.position = {
      x: this.coordinates.x + Math.cos(angle) * this.radius,
      y: this.coordinates.y + Math.sin(angle) * this.radius
    };
  };
}
export default CircularEmitter;
