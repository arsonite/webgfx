/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import Particle from './particle.js';
import Dragger from '../dragger.js';

import util from '../util.js';

const _ = undefined;

/*
 * A particle system does the book keeping of particles.
 */
class ParticleSystem {
  constructor(config) {
    this.MAX_AMOUNT = config.max_amount;
    this.emitter = config.emitter;

    this.src = config.src;
    this.acceleration = config.acceleration;

    this.particles = [];
  }

  /**
   * 
   */
  create = (n = 1) => {
    if (this.particles.length + n > this.MAX_AMOUNT) return;
    for (let i = 0; i < n; i++) {
      this.particles.push(
        new Particle(
          this.emitter.position,
          this.emitter.velocity,
          this.emitter.lifetime,
          this.emitter.size,
          util.randRGBByte(),
          this.src,
          this.emitter.die
        )
      );
    }
  };

  /**
   * 
   */
  render = context => {
    this.getDraggers().forEach(dragger => {
      dragger.render(context);
    });

    this.particles.forEach(particle => {
      particle.render(context);
    });

    this.emitter.render(context);
  };

  /**
   * 
   */
  update = () => {
    // update the emitter
    this.emitter.update(this);

    /* Observes particle lifetime and removes them from array when reaching 0 */
    this.particles.forEach((particle, i) => {
      particle.lifetime > 0 ? particle.update(this.acceleration) : this.particles.splice(i, 1);
    });
  };

  /**
   * 
   */
  getDraggers() {
    return this.emitter.draggers;
  }
}

export default ParticleSystem;
