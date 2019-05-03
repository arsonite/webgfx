/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import util from '../../util.js';
import Dragger from '../../dragger.js';

const _ = undefined;

/**
 * An emitter knows only how much and where to spawn particles.
 */
class ParticleEmitter {
  constructor(config) {
    this.coordinates = config.coordinates;

    /* If no velocity-value-pair is passed, assign the random token */
    this.velocity = config.velocity !== _ ? config.velocity : 'random';
    /* If no size-value is passed, assign the random token */
    this.size = config.size !== _ ? config.size : 'random';
    /* If no lifetime-value is passed, assign the random token */
    this.lifetime = config.lifetime ? config.lifetime : 'random';

    /* How many particles are created per tick */
    this.n = config.n;
    /* Interval of ticks of particle creation, default value is 1 */
    this.interval = config.interval !== _ ? config.interval : 1;

    this.color = config.color;

    /* Configuration of how particles are supposed to die when reaching their lifetime-limit */
    this.die = config.die;

    this.draggers = [new Dragger(this.coordinates)];

    this.counter = 0;
  }

  /**
   *
   */
  update = partSys => {
    this.coordinates = this.draggers[0].position;

    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  render = context => { };

  /**
   *
   */
  emit = partSys => {
    this.place();
    partSys.create(this.n);
  };

  /**
   *
   */
  place = () => {
    this.position = this.coordinates;
  };
}

export default ParticleEmitter;
