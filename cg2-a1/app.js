/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import Renderer from './render/renderer.js';
import Scene from './render/scene.js';

import Controller from './controller/controller.js';

import ParticleSystem from './particle/particleSystem.js';
import ParticleEmitter from './particle/emitter/particleEmitter.js';
import CircularEmitter from './particle/emitter/circularEmitter.js';
import BezierEmitter from './particle/emitter/bezierEmitter.js';
import ParametricEmitter from './particle/emitter/parametricEmitter.js';

import util from './util/util.js';

// called when the index.html is loaded by the browser
window.onload = () => {
  console.log('200: Page loaded');

  // get our canvas
  let canvas = util.byid('canvas2d');
  if (!canvas) util.fatal('canvas not found...');

  /* Makes canvas resize with window when window.resize event is fired */
  const f = 1.0;
  canvas.height = canvas.offsetHeight * f;
  canvas.width = canvas.offsetWidth * f;
  window.onresize = () => {
    canvas.height = canvas.offsetHeight * f;
    canvas.width = canvas.offsetWidth * f;
  };

  // get the 2D rendering context from canvas element
  let context = canvas.getContext('2d');
  if (!context) util.fatal('could not create 2D rendering context...');

  /* ParticleEmitters and their respective configurations */
  let emitters = [];

  let flames = new ParticleSystem({
    emitter: new ParticleEmitter({
      coordinates: [[800, 800]],
      lifetime: [10, 100],
      size: [10, 25],
      color: [256, 256, 0],
      die: { 'colorize': [256, 0, 0] },
      interval: 1,
      n: 1
    }),
    gravitation: [0, -0.1],
    max_amount: 100,
    context: context
  });
  emitters.push(flames);

  let snowflakes = new ParticleSystem({
    emitter: new ParticleEmitter({
      coordinates: [[500, 350]],
      velocity: [-3, 3],
      lifetime: [10, 500],
      size: [10, 50],
      die: 'fade',
      interval: 1,
      n: 1
    }),
    gravitation: [0, 0.25],
    src: './res/snowflake.svg',
    max_amount: 100,
    context: context
  });
  emitters.push(snowflakes);

  let circle = new ParticleSystem({
    emitter: new CircularEmitter({
      coordinates: [[200, 600]],
      velocity: [-0.25, 0.25],
      lifetime: [1, 100],
      size: [1, 10],
      die: { 'colorize': [256, 256, 256] },
      radius: 75,
      period: 100,
      interval: 1,
      n: 3
    }),
    max_amount: 1000,
    context: context
  });
  emitters.push(circle);

  let bezier = new ParticleSystem({
    emitter: new BezierEmitter({
      coordinates: [[150, 100], [100, 200], [250, 150], [50, 350], [100, 450]],
      velocity: [-0.15, 0.15],
      lifetime: [1, 150],
      size: [5, 25],
      period: 100,
      interval: 1,
      n: 1,
      die: 'fade'
    }),
    src: './res/star.svg',
    max_amount: 150,
    context: context
  });
  emitters.push(bezier);

  let parametric = new ParticleSystem({
    emitter: new ParametricEmitter({
      coordinates: [[300, 300], [250, 400], [350, 500], [150, 600]],
      velocity: [0, 0.25],
      lifetime: [1, 100],
      size: 25,
      period: 100,
      interval: 1,
      n: 1,
      die: 'fade'
    }),
    max_amount: 1000,
    context: context
  });

  /* Create and populate our scene */
  let scene = new Scene();
  scene.add(emitters);
  emitters.forEach(emitter => {
    scene.add(emitter.getDraggers());
  });

  // stick the engine together
  let controller = new Controller(context, scene);
  let renderer = new Renderer(context, 'rgb(10, 20, 30)');

  /* Register the checkbox-button for the debug-mode and connect it with the controller */
  let debugCheckbox = util.byid('debug');
  debugCheckbox.onclick = () => controller.switchDebug();

  // for fps measuring
  var before = 0;
  var fps = 0;

  let mainloop = function () {
    // integrate the scene
    if (!controller.paused) {
      scene.update();
    }

    // render next frame
    renderer.render(scene, controller);

    // hud fps
    context.font = '12pt Arial';
    context.fillStyle = '#FFF';
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
