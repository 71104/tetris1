function Piece(descriptor, grid) {
	var gridElement = $('#grid');

	var elements = {};
	(function () {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (descriptor.map[i][j]) {
					if (!elements[i]) {
						elements[i] = {};
					}
					elements[i][j] = $('<div>', {
						'class': 'brick ' + descriptor.className
					});
				}
			}
		}
	})();

	var i = 0;
	var j = 4;

	function collides(matrix, i, j) {
		for (var i1 in matrix) {
			i1 = parseInt(i1, 10);
			for (var j1 in matrix[i1]) {
				j1 = parseInt(j1, 10);
				if ((j + j1 < 0) ||
					(j + j1 >= columns) ||
					(i + i1 >= rows) ||
					grid.brickAt(i + i1, j + j1))
				{
					return true;
				}
			}
		}
		return false;
	}

	function reposition(i, j) {
		for (var i1 in elements) {
			i1 = parseInt(i1, 10);
			for (var j1 in elements[i1]) {
				j1 = parseInt(j1, 10);
				if (elements[i1][j1]) {
					elements[i1][j1].css({
						left: (j + j1) * 20,
						top: (i + i1) * 20
					});
				}
			}
		}
	}

	this.collides = function (i, j) {
		return collides(elements, i, j);
	};

	this.insert = function (element, i, j) {
		for (var i1 in elements) {
			i1 = parseInt(i1, 10);
			for (var j1 in elements[i1]) {
				j1 = parseInt(j1, 10);
				element.append(elements[i1][j1].css({
					left: (j + j1) * 20,
					top: (i + i1) * 20
				}));
			}
		}
	};

	this.step = function () {
		if (collides(elements, i + 1, j)) {
			return false;
		} else {
			reposition(++i, j);
			return true;
		}
	};

	this.left = function () {
		if (collides(elements, i, j - 1)) {
			return false;
		} else {
			reposition(i, --j);
			return true;
		}
	};

	this.right = function () {
		if (collides(elements, i, j + 1)) {
			return false;
		} else {
			reposition(i, ++j);
			return true;
		}
	};

	this.rotate = function () {
		var newMatrix = {};
		for (var i1 in elements) {
			i1 = parseInt(i1, 10);
			for (var j1 in elements[i1]) {
				j1 = parseInt(j1, 10);
				if (!newMatrix[4 - j1]) {
					newMatrix[4 - j1] = {};
				}
				newMatrix[4 - j1][i1] = elements[i1][j1];
			}
		}
		if (collides(newMatrix, i, j)) {
			return false;
		} else {
			elements = newMatrix;
			reposition(i, j);
			return true;
		}
	};

	this.drop = function () {
		for (var i1 = i; i1 < rows; i1++) {
			if (collides(elements, i1 + 1, j)) {
				reposition(i = i1, j);
				return;
			}
		}
	};

	this.freeze = function () {
		for (var i1 in elements) {
			i1 = parseInt(i1, 10);
			for (var j1 in elements[i1]) {
				j1 = parseInt(j1, 10);
				grid.addBrick(i + i1, j + j1, elements[i1][j1]);
			}
		}
	};
}
