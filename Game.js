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

	function nextPiece() {
		currentPiece = nextPiece;
		currentPiece.insert(gridElement, 0, 4);
		nextPiece = queueRandomPiece();
	}

	nextPiece();

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
			nextPiece();
		}
	};
}
