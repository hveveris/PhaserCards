
OpenCard = function (game, x, y, cardData) {

	Phaser.Sprite.call(this, game, x, y, "openCard");    
	
	this.scale = new Phaser.Point(.5, .5);
    this.addChild(new Phaser.Sprite(this.game, 50, 83, cardData.symbol + "L"));
    this.addChild(new Phaser.Sprite(this.game, 109, 17, cardData.symbol + "S"));
    this.addChild(new Phaser.Text(this.game, 15, 15, cardData.value));
    this.cardSymbol = cardData.symbol;
    this.cardValue = cardData.value;
	
	game.add.existing(this);
};

OpenCard.prototype = Object.create(Phaser.Sprite.prototype);
OpenCard.prototype.constructor = OpenCard;
