let rangeSlider, zoomSlider, userInput, submitButton;
function setup() {
	createCanvas(500, 500);
	rangeSlider = createSlider(0, 1, 0.1, 0);
	zoomSlider = createSlider(0.1, 100, 90, 0);
	userInput = createInput("");
	submitButton = createButton("submit");
	submitButton.mousePressed(buttonSubmitted);
	pixelDensity(1);
}

function draw() {
	background(0);
	loadPixels();
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			let index = (x + y * width) * 4;
			let r = index;
			let g = index+1;
			let b = index+2;
			let newX = x - width/2;
			let newY = y - height/2;
			let result = abs(abs(f(newX/zoomSlider.value(), newY/zoomSlider.value()))-1) < rangeSlider.value() ? 255 : 0;
			pixels[r] = result;
			pixels[g] = result;
			pixels[b] = result;
		}
	}
	updatePixels();
}

function buttonSubmitted() {
	try {
		f = eval("(x, y) => "+userInput.value().toString()+";");
	} catch(e) {
		f = originalF;
		console.log(e);
	}
}

function originalF(x, y) {
	return abs(y) > abs(x) ? y : x;
}

let f = originalF;