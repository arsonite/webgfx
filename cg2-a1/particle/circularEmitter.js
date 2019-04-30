/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import ParticleEmitter from './particleemitter.js';

const _ = undefined;

class CircularEmitter extends ParticleEmitter {
  constructor(config) {
    super(config);

    this.velocity = config.velocity !== _ ? config.velocity : { vx: 0, vy: 0 };

    this.random = config.random !== _ ? config.random : true;
    //this.spiral =
    this.radius = config.radius !== _ ? config.radius : 50;
    this.period = this.random ? _ : config.period !== _ ? config.period : 100;
  }

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
