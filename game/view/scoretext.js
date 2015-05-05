
ScoreText = function (game, x, y, text) {

	Phaser.Text.call(this, game, x, y, text || '0', { font: '18px Arial', fill: '#666666', align: 'left'});    
	game.add.existing(this);

	this.tween = null;
	this.originalValue = 0;
	this.tweenAttribute = 0;

	this.setAnimatedText = function(newText){

		//cancel previous tween if exists	
		if (this.tween && this.tween.isRunning) 
			this.tween.stop(true);
		
		//assign new values
		this.originalValue = newText;
		this.tweenAttribute = isNaN(this.text) ? 0 : this.text;
		
		//tween if numeric value, else just set text
		if (!isNaN(this.originalValue)){

			this.tween = this.game.add
                   			.tween(this)
                   			.to( { tweenAttribute:newText }, 300, Phaser.Easing.Quadratic.Out, true)
                   			.onUpdateCallback(this.updateTweenedText, this); 
            this.tween.onComplete.addOnce(this.setOriginalValue, this);
      	}
      	else{
      		this.setText(this.originalValue);
      	}
	};

	this.updateTweenedText = function(){		
		this.setText(Math.round(this.tweenAttribute));
	};

	this.setOriginalValue = function(){
		this.setText(this.originalValue);
	};	
};

ScoreText.prototype = Object.create(Phaser.Text.prototype);
ScoreText.prototype.constructor = ScoreText;
