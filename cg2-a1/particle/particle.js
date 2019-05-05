/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import util from "../util/util.js";

import Point from "../util/point.js";

const _ = undefined;

/**
 * Class representing a single particle
 * 
 * @param position, A copied start-position object
 * @param velocity, Start-velocity of the particle, can be 'random', an array, a Point-object or a single value
 * @param lifetime, Maximum lifetime of a particle, can be 'random', an array or a single value
 * @param size, Size of a particle, can be 'random', an array or a single value
 * @param color, Color of the particle
 * @param src, Image source of the particle, can be left undefined
 * @param die, Attribute that determines how the particle is supposed to 'die'
 */
class Particle {
  constructor(position, velocity, lifetime, size, color, src, die) {
    this.position = Object.assign({}, position);

    /* Sets horizontal and vertical velocity properties (can also be negative) */
    if (velocity === 'random') {
      this.velocity = new Point(util.rand(-1, 1), util.rand(-1, 1));
    } else if (Array.isArray(velocity)) {
      this.velocity = new Point(
        util.rand(velocity[0], velocity[1]),
        util.rand(velocity[0], velocity[1])
      );
    } else if (velocity instanceof Point) {
      this.velocity = Object.assign({}, velocity);
    } else if (velocity === _) {
      this.velocity = new Point(0, 0);
    } else {
      this.velocity = new Point(velocity, velocity);
    }

    /* Initialize maximum and current lifetime */
    if (lifetime === 'random') {
      this.lifetime = util.rand(10, 100);
    } else if (Array.isArray(lifetime)) {
      this.lifetime = util.rand(lifetime[0], lifetime[1]);
    } else {
      this.lifetime = lifetime;
    }
    this.MAX_LIFETIME = this.lifetime;

    if (size === 'random') {
      this.size = util.rand(1, 10);
    } else if (Array.isArray(size)) {
      this.size = util.rand(size[0], size[1]);
    } else {
      this.size = size;
    }

    this.color = color !== _ ? color : util.randRGBByte();
    this.startColor = this.color;

    this.src = src;
    if (this.src !== _) {
      this.img = new Image();
      this.img.src = this.src;
    }

    if (die !== _) {
      if (die['colorize'] !== _) {
        this.endColor = die['colorize'];
      }
    }

    this.angle = 1;
  }

  update = (gravitation = 0) => {
    this.position.x += this.velocity.x += gravitation.x;
    this.position.y += this.velocity.y += gravitation.y;

    /* Simple three-set calculation to determine the t [1-0] of the particles lifetime*/
    this.lifetimePercentage = ((this.lifetime * 100) / this.MAX_LIFETIME) / 100;
    if (this.endColor !== _) {
      /* Interpolates the lifetime-t [0-1] dependent current color by passing the start- & endcolor and the opposite of the lifetime-percentage */
      this.color = util.interpolRGBA(this.startColor, this.endColor, 1.0 - this.lifetimePercentage);
    }
    this.lifetime--;
  };

  render = context => {
    if (this.src !== _) {
      /* Applies a temporary global alpha if 'die' is 'fade' */
      if (this.fade) context.globalAlpha = this.lifetimePercentage;
      /* Draws the image at the anchor-center-point of the particle by subtracting the half of its size with its position */
      context.drawImage(this.img, this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
      return;
    }
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);

    if (this.fade) {
      /* RGBA-channel with alpha-opacity */
      context.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.lifetimePercentage})`;
    } else {
      /* RGB-channel without alpha */
      context.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
    }
    context.fill();
  };
}

export default Particle;
