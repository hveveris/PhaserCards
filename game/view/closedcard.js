
ClosedCard = function (game, x, y) {

	Phaser.Sprite.call(this, game, x, y, 'assets', 'closedCard');    
	
	this.scale = new Phaser.Point(.5, .5);
    this.anchor.setTo(0.5, 0.5);
    this.rotation = 0.08;      

	game.add.existing(this);
};

ClosedCard.prototype = Object.create(Phaser.Sprite.prototype);
ClosedCard.prototype.constructor = ClosedCard;
