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

    this.gravitation = {};
    if (config.gravitation === 'random') {
      this.gravitation = util.rand(0.1, 1);
    } else if (Array.isArray(config.gravitation)) {
      this.gravitation.x = config.gravitation[0];
      this.gravitation.y = config.gravitation[1];
    } else if (typeof config.gravitation === 'object') {
      this.gravitation = Object.assign({}, config.gravitation);
    } else if (config.gravitation === _) {
      this.gravitation = { x: 0, y: 0 }
    } else {
      this.gravitation.x = config.gravitation;
      this.gravitation.y = config.gravitation;
    }

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
          this.emitter.color,
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
      particle.lifetime > 0 ? particle.update(this.gravitation) : this.particles.splice(i, 1);
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
