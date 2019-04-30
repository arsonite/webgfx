/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */
import util from '../util.js';

import Dragger from '../dragger.js';

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
    for (let actor of actors) {
      if (
        typeof actor.render !== 'function' ||
        typeof actor.update !== 'function'
      ) {
        continue;
      }
      this.actors.push(actor);
    }
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
  render = context => {
    for (let actor of this.actors) {
      actor.render(context);
    }
  };

  move = pos => {
    this.actors.forEach(actor => {
      actor.dragger.drag(pos);
    });
  }

  pick = pos => {
    this.actors.forEach(actor => {
      actor.dragger.isHit(pos);
    });
  };
}

export default Scene;