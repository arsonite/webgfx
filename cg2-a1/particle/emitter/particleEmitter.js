/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import Dragger from '../../util/dragger.js';
import Point from '../../util/point.js';

const _ = undefined;

/**
 * A standard single-point-of-origin particle emitter, with the following available configuration:
 * 
 * @param coordinates, Placement coordinates of the emitter itself
 * @param velocity, The start-velocity of each particle, can be a value, an object with x & y or an array
 * @param size, Size of each individiual particle, can be a value, an object with x & y or an array
 * @param lifetime, Lifetime of each individual created particle, can be a value, an object with x & y or an array
 * @param n, The amount of particles created simultaneously
 * @param interval, Essentially the period of one creation-cycle
 * @param color
 * @param die, How the particle is supposed to act when "dying"
 * @param draggers
 */
class ParticleEmitter {
  constructor(config) {

    this.coordinates = [];
    this.draggers = [];
    /* Iterate through the array to find the dual arrays within */
    config.coordinates.forEach(coordinate => {
      /* Create a new point out of the x and y coordinates of the internal array */
      let point = new Point(coordinate[0], coordinate[1]);
      this.coordinates.push(point);
      this.draggers.push(new Dragger(point));
    });

    /* If no velocity-value-pair is passed, assign the 'random' token */
    this.velocity = config.velocity !== _ ? config.velocity : 'random';
    /* If no size-value is passed, assign the 'random' token */
    this.size = config.size !== _ ? config.size : 'random';
    /* If no lifetime-value is passed, assign the 'random' token */
    this.lifetime = config.lifetime ? config.lifetime : 'random';

    /* How many particles are created per tick */
    this.n = config.n;
    /* Interval of ticks of particle creation, default value is 1 */
    this.interval = config.interval !== _ ? config.interval : 1;

    this.color = config.color;

    /* Configuration of how particles are supposed to die when reaching their lifetime-limit */
    this.die = config.die;

    this.counter = 0;
  }

  /* Optional render method, that renders the form of the emitter */
  render = context => { };

  /**
   * Updates the coordinates of the particle emitter dependent on the position of its dragger
   * and adds 1 to the internal counter for various calculations
   */
  update = partSys => {
    this.coordinates[0] = this.draggers[0].position;

    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  /**
   * Emits the actual particle by calculating the placement first and then creating the particle
   * through the connected particle system
   */
  emit = partSys => {
    this.place();
    partSys.create(this.n);
  };

  /**
   * Does the actual calculation of where to place the particle and at what speed
   */
  place = () => {
    this.position = this.coordinates[0];
  };
}

export default ParticleEmitter;
