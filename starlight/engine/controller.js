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

  listen = () => {
    let canvas = this.context.canvas;

    canvas.onmousemove = event => {
      let mouse = this.mouse;
      let newpos = this.contextPos(event);
      mouse.dxy[0] = newpos[0] - mouse.pos[0];
      mouse.dxy[1] = newpos[1] - mouse.pos[1];
      mouse.pos = newpos;
    };

    canvas.onmousedown = event => {
      canvas.setAttribute('tabindex', '0');
      canvas.focus();
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
