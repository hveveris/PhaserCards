
CrossMark = function (game, x, y, index) {

	Phaser.Sprite.call(this, game, x, y, 'assets', 'crossMark');    	
	this.index = index;	
	this.tween = null;
	game.add.existing(this);	

	this.enable = function(){

		this.inputEnabled = true;
		this.alpha = 1;
		this.tween = this.game.add.tween(this).to({alpha:.5},300,Phaser.Easing.Linear.None,true,0,-1,true);
	};

	this.disable= function(){
		
		if (this.tween)
			this.tween.stop();
		
		this.alpha = .5;
		this.inputEnabled = false;
	};

	this.disable();
};

CrossMark.prototype = Object.create(Phaser.Sprite.prototype);
CrossMark.prototype.constructor = CrossMark;
