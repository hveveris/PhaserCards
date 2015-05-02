
ScoreText = function (game, x, y, text) {

	Phaser.Text.call(this, game, x, y, text || '0', { font: '18px Arial', fill: '#666666', align: 'left'});    
	game.add.existing(this);
};

ScoreText.prototype = Object.create(Phaser.Text.prototype);
ScoreText.prototype.constructor = ScoreText;
