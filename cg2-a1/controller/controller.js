import ParticleSystem from '../particle/particleSystem.js';

/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */

/**
 * Encapsulates interaction responses and head up display things like menus.
 */
class Controller {
  constructor(context, scene) {
    this.context = context;
    this.scene = scene;
    this.paused = false;
    this.mouse = {
      pos: [],
      dxy: []
    };

    this.debug = true;

    this.listen();
  }

  switchDebug = () => {
    this.debug = !this.debug;
    this.scene.actors.forEach(actor => {
      if (actor instanceof ParticleSystem) {
        if (this.debug) {
          this.scene.add(actor.getDraggers());
        } else {
          this.scene.remove(actor.getDraggers());
        }
      }
    });
  };

  listen = () => {
    let canvas = this.context.canvas;

    // register mouse actions over the canvas
    canvas.onmousemove = event => {
      let mouse = this.mouse;
      let newpos = this.contextPos(event);
      mouse.dxy[0] = newpos[0] - mouse.pos[0];
      mouse.dxy[1] = newpos[1] - mouse.pos[1];
      mouse.pos = newpos;

      this.scene.move(this.contextPos(event));
    };

    canvas.onmousedown = event => {
      // activate that keypresses are associated with the canvas
      canvas.setAttribute('tabindex', '0');
      canvas.focus();

      // perform picking on the scene
      this.scene.pick(this.contextPos(event));
    };

    canvas.onmouseup = event => {
      this.scene.pick([-1, -1]);
    };

    canvas.addEventListener(
      'keypress',
      event => {
        switch (event.code) {
          case 'KeyP':
            this.paused = !this.paused;
            break;
        }
      },
      false
    );
  };

  contextPos = event => {
    // calculate the coordinates relative to the upper left corner
    let rect = this.context.canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  };

  render = () => {
    let context = this.context;

    context.font = '12pt Arial';
    context.fillStyle = 'white';
    context.fillText(
      `mouse: pos(${this.mouse.pos[0]}, ${this.mouse.pos[1]})
          dxy(${this.mouse.dxy[0]}, ${this.mouse.dxy[1]})`,
      10,
      40
    );
  };
}

export default Controller;
