class Renderer {
  constructor(context, bg) {
    this.context = context;
    this.bg = bg;
  }

  clear = () => {
    let context = this.context;
    let canvas = this.context.canvas;
    context.fillStyle = this.bg;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  render = (scene, controller) => {
    this.clear();

    scene.render(this.context);

    controller.render();
  };
}

export default Renderer;
