class Scene {
  constructor() {
    this.actors = [];
  }

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

  remove = actors => {
    for (let actor of actors) {
      let id = this.actors.indexOf(actor);
      if (id !== -1) {
        this.actors.splice(id, 1);
      }
    }
  };

  update = () => {
    this.actors.forEach(actor => {
      actor.update();
    });
  };

  render = (context, debug) => {
    this.actors.forEach(actor => {
      actor.render(context, debug);
    });
  };
}

export default Scene;