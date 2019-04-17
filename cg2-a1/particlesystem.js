import Particle from './particle.js';
import util from './util.js';

/*
 * A particle system does the book keeping of particles.
 */
class ParticleSystem {
  constructor(config) {
    this.MAX_AMOUNT = config.amount;
    this.emitter = config.emitter;
    this.type = config.type;

    this.particles = [];
  }

  create = (n = 100) => {
    for (let i = 0; i < n; i++) {
      this.particles.push(
        new Particle(
          this.emitter.pos,
          this.emitter.vel,
          util.rand(100, 1000),
          util.rand(1, 10),
          util.randRGBHex()
        )
      );
    }
  };

  render = context => {
    this.particles.forEach(particle => {
      particle.render(context);
    });
  };

  update = () => {
    // update the emitter
    this.emitter.update(this);

    /* Observes particle lifetime and removes them from array when reaching 0 */
    this.particles.forEach((particle, i) => {
      particle.lf > 0 ? particle.update() : this.particles.splice(i, 1);
    });

    // TODO: more logic over the particles if necessary
  };
}

export default ParticleSystem;
