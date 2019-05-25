class Controller {
	constructor(context, scene) {
		this.context = context;
		this.scene = scene;
		this.paused = false;

		this.listen();
	}

	listen() {
		let canvas = this.context.canvas;
		// register mouse actions over the canvas
		canvas.addEventListener('click', event => {
			// activate that keypresses are associated with the canvas
			canvas.setAttribute('tabindex', '0');
			canvas.focus();

			event.stopPropagation();
		});

		canvas.addEventListener(
			'keypress',
			event => {
				switch (event.code) {
					case 'KeyP':
						this.paused = !this.paused;
						break;
				}
				event.stopPropagation();
			},
			false
		);
	}

	render() {
		let context = this.context;
	}
}

export default Controller;
