function Game() {
	var grid = new Grid();

	var gridElement = $('#grid');
	var overviewElement = $('#overview');

	function queueRandomPiece() {
		var piece = new Piece(descriptors[Math.round(Math.random() * (descriptors.length - 1))], grid);
		piece.insert(overviewElement, 0, 0);
		return piece;
	}

	var nextPiece = queueRandomPiece();
	var currentPiece;

	function setNextPiece() {
		if (!nextPiece.collides(0, 4)) {
			(currentPiece = nextPiece).insert(gridElement, 0, 4);
			nextPiece = queueRandomPiece();
		}
	}

	setNextPiece();

	this.left = function () {
		if (currentPiece) {
			currentPiece.left();
		}
	};

	this.right = function () {
		if (currentPiece) {
			currentPiece.right();
		}
	};

	this.rotate = function () {
		if (currentPiece) {
			currentPiece.rotate();
		}
	};

	this.drop = function () {
		if (currentPiece) {
			currentPiece.drop();
		}
	};

	this.update = function () {
		if (!currentPiece.step()) {
			currentPiece.freeze();
			grid.removeFullLines();
			setNextPiece();
			if (!currentPiece) {
				return false;
			}
		}
		return true;
	};
}
