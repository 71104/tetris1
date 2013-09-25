function Grid() {
	function generateEmptyRow() {
		var row = [];
		for (var j = 0; j < columns; j++) {
			row.push(null);
		}
		return row;
	}

	var grid = [];

	(function () {
		for (var i = 0; i < rows; i++) {
			grid[i] = generateEmptyRow();
		}
	})();

	var element = $('#grid');

	this.brickAt = function (i, j) {
		return !!grid[i][j];
	};

	this.addBrick = function (i, j, brick) {
		grid[i][j] = brick;
	};

	this.removeFullLines = function () {
		var i = rows - 1;
		while (i > 0) {
			if ((function () {
				for (var j = 0; j < columns; j++) {
					if (!grid[i][j]) {
						return false;
					}
				}
				return true;
			})()) {
				grid[i].forEach(function (brick) {
					brick.remove();
				});
				for (var i1 = i; i1 > 0; i1--) {
					grid[i1] = grid[i1 - 1];
					grid[i1].forEach(function (brick) {
						if (brick) {
							brick.css('top', i1 * 20);
						}
					});
				}
				grid[0] = generateEmptyRow();
			} else {
				i--;
			}
		}
	};
}
