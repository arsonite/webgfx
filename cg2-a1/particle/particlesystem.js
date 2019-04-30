/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import Particle from './particle.js';

import util from '../util.js';

/*
 * A particle system does the book keeping of particles.
 */
class ParticleSystem {
  constructor(config) {
    this.MAX_AMOUNT = config.max_amount;
    this.emitter = config.emitter;
    this.type = config.type;

    this.particles = [];

    this.acceleration = -1;
  }

  create = (n = 1) => {
    if (this.particles.length + n > this.MAX_AMOUNT) return;
    for (let i = 0; i < n; i++) {
      this.particles.push(
        new Particle(
          this.emitter.position,
          this.emitter.velocity,
          util.rand(10, 100),
          util.rand(1, 10),
          util.randRGBHex()
        )
      );
    }
  };

  render = context => {
    /*
    context.fillStyle = '#FFF';
    let size = 25;
    context.fillRect(
      this.emitter.pos.x - size / 2,
      this.emitter.pos.y - size / 2,
      size,
      size
    );
    */

    this.particles.forEach(particle => {
      particle.render(context);
    });
  };

  update = () => {
    // update the emitter
    this.emitter.update(this);

    /* Observes particle lifetime and removes them from array when reaching 0 */
    this.particles.forEach((particle, i) => {
      particle.lifetime > 0 ? particle.update() : this.particles.splice(i, 1);
    });

    // TODO: more logic over the particles if necessary
  };
}

export default ParticleSystem;
