'use strict';

const makeCamera = (screenSize, position, rotation, zoom) => ({
	screenSize: screenSize,
	position: position,
	rotation: rotation,
	zoom: zoom
});

const applyCamera = (context, camera) => {
	let size = camera.screenSize;
	let sx = size.x;
	let sy = size.y;
	let zoom = camera.zoom;
	let position = camera.position;

	context.translate(0.5 * sx, 0.5 * sy);
	context.scale(sy, -sy);
	context.scale(zoom.x, zoom.y);
	context.rotate(-camera.rotation);
	context.translate(-position.x, -position.y);
};

const applyTransform = (context, transform) => {
	let position = transform.position;
	let scale = transform.scale;

	context.translate(position.x, position.y);
	context.rotate(transform.rotation);
	context.scale(scale.x, scale.y);
};

function renderElement(context, element, renderScript, material) {
	let assetParams = element.renderScript.params;
	let materialParams = element.material.params;

	material.before(context, materialParams);
	applyTransform(context, element.transform);
	renderScript(context, assetParams);
	material.after(context, materialParams);
}

function renderScene(context, camera, elements, renderScripts, materials) {
	context.save();

	applyCamera(context, camera);

	elements.forEach(function(element) {
		let renderScript = renderScripts[element.renderScript.id];
		if (!renderScript) {
			throw new Error(`Unknown render script "${element.renderScript.id}"`);
		}

		let material = materials[element.material.id];
		if (!material) {
			throw new Error(`Unknown material "${element.material.id}"`);
		}

		renderElement(context, element, renderScript, material);
	});

	context.restore();
}

const Shapes = {
	quad: function(context) {
		context.beginPath();
		context.rect(-0.5, -0.5, 1, 1);
		context.closePath();
	}
};

const Materials = {
	filled: {
		before: function(context) {
			context.save();
		},
		after: function(context, params) {
			context.restore();
			context.fillStyle = params.fill;
			context.fill();
		}
	},
	outline: {
		before: function(context) {
			context.save();
		},
		after: function(context, params) {
			context.restore();

			context.strokeStyle = params.stroke;
			context.lineWidth = params.lineWidth;

			context.stroke();
		}
	},
	filledWithBorder: {
		before: function(context) {
			context.save();
		},
		after: function(context, params) {
			context.restore();

			context.fillStyle = params.fill;
			context.strokeStyle = params.stroke;
			context.lineWidth = params.lineWidth;

			context.fill();
			context.stroke();
		}
	}
};