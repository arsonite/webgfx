/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import util from '../util.js';

const _ = undefined;

/**
 * An emitter knows only how much and where to spawn particles.
 */
class ParticleEmitter {
  constructor(config) {
    this.coordinates = config.coordinates !== _ ? config.coordinates : { x: 400, y: 300 };
    this.velocity = config.velocity !== _ ? config.velocity : { vx: util.rand(-1, 1), vy: util.rand(-1, 1) };
    this.interval = config.interval !== _ ? config.interval : 1;
    this.circular = config.circular !== _ ? config.circular : _;

    this.counter = 0;
  }

  /**
   * 
   */
  update = partSys => {
    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  /**
   * 
   */
  emit = partSys => {
    this.place(partSys);
    partSys.create(10);
  };

  /**
   * 
   */
  place = partSys => {
    if (this.circular !== _) {
      /* Circular-Emitter */
      let randAngle = Math.random() * Math.PI * 2; // Calculates a random circular angle
      this.position = {
        x: this.coordinates.x + Math.cos(randAngle) * this.circular.rad,
        y: this.coordinates.y + Math.sin(randAngle) * this.circular.rad
      };
      this.vel = { vx: 0, vy: 0 };
    } else if (this.rectangle !== _) {

    } else if (this.line !== _) {

    } else if (this.bezier !== _) {

    } else if (this.bezier !== _) {

    } else if (this.bezier !== _) {

    } else {
      /* Standard-Emitter */
      this.position = this.coordinates;
      this.acceleration = -1;
    }
  };
}

export default ParticleEmitter;
