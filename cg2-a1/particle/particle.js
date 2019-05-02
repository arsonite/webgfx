/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */

const _ = undefined;

/**
 *
 */
class Particle {
  constructor({ x, y }, { vx, vy }, lifetime = 100, size = 1, color = '#FFF', src) {
    this.position = { x, y };
    /* Sets horizontal and vertical velocity properties (can also be negative) */
    this.velocity = { vx, vy };

    /* Initialize maximum and current lifetime */
    this.MAX_LIFETIME = this.lifetime = lifetime;
    this.size = size;
    this.color = color;
    this.src = src;
  }

  update = (acceleration = 0) => {
    this.position.x += this.velocity.vx += acceleration;
    this.position.y += this.velocity.vy += acceleration;

    this.lifetime--;
  };

  render = context => {
    if (this.src !== _) {
      let img = new Image();
      img.src = this.src;
      context.drawImage(img, this.position.x, this.position.y, this.size, this.size);
      return;
    }
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
  };
}

export default Particle;
