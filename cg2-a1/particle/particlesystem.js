/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import Particle from './particle.js';
import Dragger from '../util/dragger.js';

import util from '../util/util.js';
import Point from '../util/point.js';

const _ = undefined;

/**
 * A particle system does the book keeping of particles.
 *
 * @param config.max_amount, The maximum amount of allowed 'living' particles
 * @param config.emitter, The actual emitter controlled by this particle system
 * @param config.src, Image source of particles, if left undefined, the particles are just circles
 * @param config.gravitation, Gravitational acceleration onto the particles, can be 'random', an array, a Point-object or a single value
 */
class ParticleSystem {
  constructor(config) {
    this.MAX_AMOUNT = config.max_amount;
    this.emitter = config.emitter;

    this.src = config.src;

    if (config.gravitation === 'random') {
      this.gravitation = util.rand(0.1, 1);
    } else if (Array.isArray(config.gravitation)) {
      this.gravitation = new Point(config.gravitation[0], config.gravitation[1]);
    } else if (config.gravitation instanceof Point) {
      /* Copies the object instead of making a reference to ensure independence of particles */
      this.gravitation = Object.assign({}, config.gravitation);
    } else if (config.gravitation === _) {
      this.gravitation = new Point(0, 0);
    } else {
      this.gravitation = new Point(config.gravitation, config.gravitation);
    }

    this.particles = [];
  }

  /**
   * Creates n-amount of particles per tick and pushed them into the
   * global array
   * 
   * @param n, Amount of particles simultaneously created
   */
  create = (n = 1) => {
    /* Ensures the prevention of overflowing the maximum amount of living particles */
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

  render = context => {
    this.particles.forEach(particle => {
      particle.render(context);
    });

    this.emitter.render(context);
  };

  update = () => {
    // update the emitter
    this.emitter.update(this);

    /* Observes particle lifetime and removes them from array when reaching 0 */
    this.particles.forEach((particle, i) => {
      particle.lifetime > 0 ? particle.update(this.gravitation) : this.particles.splice(i, 1);
    });
  };

  getDraggers() {
    return this.emitter.draggers;
  }
}

export default ParticleSystem;
