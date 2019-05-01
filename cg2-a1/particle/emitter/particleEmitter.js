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
    this.coordinates = config.coordinates !== _ ? config.coordinates : { x: 400, y: 300 };
    this.velocity = config.velocity !== _ ? config.velocity : { x: 1, y: 1 };

    this.n = config.n !== _ ? config.n : _;
    this.interval = config.interval !== _ ? config.interval : 1;

    this.counter = 0;

    this.draggers = [new Dragger(this.coordinates)];
  }

  /**
   *
   */
  update = partSys => {
    this.coordinates = this.draggers[0].position;

    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  /**
   *
   */
  emit = partSys => {
    this.place(partSys);
    partSys.create(this.n);
  };

  /**
   *
   */
  place = () => {
    this.velocity = { vx: util.rand(-1, 1), vy: util.rand(-1, 1) };
    this.position = this.coordinates;
  };
}

export default ParticleEmitter;
