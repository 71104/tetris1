var rows = 20;
var columns = 12;

var descriptors = [{
	className: 'red',
	map: [
		[false, false, false, false],
		[true, true, false, false],
		[false, true, true, false],
		[false, false, false, false]
	]
}, {
	className: 'green',
	map: [
		[false, false, false, false],
		[false, true, true, false],
		[true, true, false, false],
		[false, false, false, false]
	]
}, {
	className: 'blue',
	map: [
		[false, false, true, false],
		[false, false, true, false],
		[false, true, true, false],
		[false, false, false, false]
	]
}, {
	className: 'cyan',
	map: [
		[false, true, false, false],
		[false, true, false, false],
		[false, true, false, false],
		[false, true, false, false]
	]
}, {
	className: 'magenta',
	map: [
		[false, false, false, false],
		[false, true, false, false],
		[true, true, true, false],
		[false, false, false, false]
	]
}, {
	className: 'yellow',
	map: [
		[false, false, false, false],
		[false, true, true, false],
		[false, true, true, false],
		[false, false, false, false]
	]
}, {
	className: 'orange',
	map: [
		[false, true, false, false],
		[false, true, false, false],
		[false, true, true, false],
		[false, false, false, false]
	]
}];

window.addEventListener('load', function () {
	var game = new Game();

	window.addEventListener('keydown', function (event) {
		switch (event.keyCode) {
		case 37:
			game.left();
			break;
		case 38:
			game.rotate();
			break;
		case 39:
			game.right();
			break;
		case 32:
		case 40:
			game.drop();
			break;
		default:
			return;
		}
		event.preventDefault();
		return false;
	}, false);

	var interval = setInterval(function () {
		if (!game.update()) {
			clearInterval(interval);
			alert('Hai perso!');
		}
	}, 500);
}, false);
