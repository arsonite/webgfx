/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import Dragger from '../util/dragger.js';

import ParticleEmitter from '../particle/emitter/particleEmitter.js';

/**
 * Ordered collection of actors.
 * Actors must provide a render/update interface.
 */
class Scene {
  constructor() {
    this.actors = [];
  }

  /* Add actors to the scene */
  add = actors => {
    actors.forEach(actor => {
      {
        if (
          typeof actor.render !== 'function' ||
          typeof actor.update !== 'function'
        ) {
          return;
        }
        this.actors.push(actor);
      }
    });
  };

  /* Removes actors from the scene */
  remove = actors => {
    for (let actor of actors) {
      let id = this.actors.indexOf(actor);
      if (id !== -1) {
        this.actors.splice(id, 1);
      }
    }
  };

  /* Updates all actors */
  update = () => {
    for (let actor of this.actors) {
      actor.update();
    }
  };

  /* Render all actor in array order */
  render = (context, debug) => {
    this.actors.forEach(actor => {
      actor.render(context, debug);
    });
  };

  /**
   * Moves the selected dragger
   * 
   * @param pos, new Position of dragger
   */
  move = pos => {
    this.actors.forEach(actor => {
      if (actor instanceof Dragger) {
        actor.drag(pos);
      }
    })
  };

  /**
   * Evaluates if the mouse of the user is within the circle
   * of the dragger when clicking it
   * 
   * @param pos, new Position of dragger
   */
  pick = pos => {
    this.actors.forEach(actor => {
      if (actor instanceof Dragger) {
        actor.isHit(pos);
      }
    });
  };
}

export default Scene;