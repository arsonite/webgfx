import util from '../util.js';

const _ = undefined;

/* An emitter knows only how much and where to spawn particles.
 */
class ParticleEmitter {
  constructor(config) {
    this.coord = config.coord !== _ ? config.coord : { x: 400, y: 300 };
    this.interval = config.interval !== _ ? config.interval : 1;
    this.circular = config.circular !== _ ? config.circular : _;

    this.counter = 0;
  }

  update = partSys => {
    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  emit = partSys => {
    this.place(partSys);
    partSys.create(10);
  };

  place = partSys => {
    if (this.circular !== _) {
      let randAngle = Math.random() * Math.PI * 2; // Calculates a random circular angle
      this.pos = {
        x: this.coord.x + Math.cos(randAngle) * this.circular.rad,
        y: this.coord.y + Math.sin(randAngle) * this.circular.rad
      };

      this.vel = { vx: 0, vy: 0 };
      return;
    }

    /* Standard-Emitter */
    this.pos = this.coord;
    this.vel = { vx: util.rand(-1, 1), vy: util.rand(-1, 1) };
    this.acc = -1;
  };
}

export default ParticleEmitter;
