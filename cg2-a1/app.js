import Renderer from './renderer.js';
import Controller from './controller.js';
import Scene from './scene.js';
import ParticleSystem from './particlesystem.js';
import ParticleEmitter from './particleemitter.js';
import util from './util.js';

// called when the index.html is loaded by the browser
window.onload = function() {
  console.log('200: Page loaded');

  // get our canvas
  let canvas = util.byid('canvas2d');
  if (!canvas) util.fatal('canvas not found...');
  // get the 2D rendering context from canvas element
  let context = canvas.getContext('2d');
  if (!context) util.fatal('could not create 2D rendering context...');

  /* Particle emitters and systems */
  let particleEmitter = new ParticleEmitter({
    pos: { x: 400, y: 300 },
    interval: 10
  });
  let particleSystem = new ParticleSystem({
    max_amount: 1000,
    emitter: particleEmitter,
    type: 'img/path'
    // TODO: particle system properties (e.g. particle type)
  });

  // create and populate our scene
  let scene = new Scene();
  scene.add([particleSystem]);

  // stick the engine together
  let controller = new Controller(context, scene);
  let renderer = new Renderer(context, 'rgb(0, 0, 0)');

  // for fps measuring
  var before = 0;
  var fps = 0;
  let delta;

  let mainloop = function() {
    // integrate the scene
    if (!controller.paused) {
      scene.update();
    }

    // render next frame
    renderer.render(scene, controller);

    // hud fps
    context.font = '12pt Arial';
    context.fillStyle = 'white';
    context.fillText(`fps: ${fps}`, 10, 25);

    // let the browser do the fps thing
    requestAnimationFrame(() => {
      // measure fps
      let now = performance.now();
      fps = Math.trunc(1 / ((now - before) * 0.001));
      before = now;

      mainloop();
    });
  };

  // start
  mainloop();
};
