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
		for (let actor of this.actors) {
			actor.update();
		}
	};

	render = context => {
		this.actors.forEach(actor => {
			actor.render(context);
		});
	};
}

export default Scene;
