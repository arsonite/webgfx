class Particle {
  constructor({ x, y }, { vx, vy }, lf = 100, size = 1, col = '#FFF') {
    this.pos = { x, y };
    /* Sets horizontal and vertical velocity properties (can also be negative) */
    this.vel = { vx, vy };

    /* Initialize maximum and current lifetime */
    this.MAX_LF = this.lf = lf;
    this.size = size;
    this.col = col;
  }

  update = (acc = 0) => {
    this.pos.x += this.vel.vx;
    this.pos.y += this.vel.vy;

    this.lf--;
  };

  render = context => {
    context.fillStyle = this.col;
    context.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  };
}

export default Particle;
