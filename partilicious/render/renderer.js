/**
 * Initially created by Martin Puse (C) at Beuth University
 */

/* Small encapsulation to not let this code float around in main scope. */
class Renderer {
  constructor(context, bg) {
    this.context = context;
    this.bg = bg;
  }

  /* clear background */
  clear = () => {
    let context = this.context;
    let canvas = this.context.canvas;
    context.fillStyle = this.bg;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // TODO: improve with gradient or image parameters
  };

  render = (scene, controller) => {
    /* prepare next frame */
    this.clear();

    /* render the scene */
    scene.render(this.context, controller.debug);

    /* render the hud over the scene */
    controller.render();
  };
}

export default Renderer;
