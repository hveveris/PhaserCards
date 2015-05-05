
ScoreText = function (game, x, y, text) {

	Phaser.Text.call(this, game, x, y, text || '0', { font: '18px Arial', fill: '#666666', align: 'left'});    
	game.add.existing(this);

	var tween = null;
	var originalValue = 0;
	var tweenObject = { tweenAttribute:0 };

	this.setAnimatedText = function(newText){

		//cancel previous tween if exists	
		if (tween && tween.isRunning) 
			tween.stop(true);
		
		//assign new values
		originalValue = newText;
		tweenObject.tweenAttribute = isNaN(this.text) ? 0 : this.text;
		
		//tween if numeric value, else just set text
		if (!isNaN(originalValue)){
			tween = this.game.add
           				.tween(tweenObject)
           				.to( { tweenAttribute:newText }, 300, Phaser.Easing.Quadratic.Out, true)
           				.onUpdateCallback(this.updateTweenedText, this); 
            tween.onComplete.addOnce(this.setOriginalValue, this);
      	}
      	else{
      		this.setText(originalValue);
      	}
	};

	this.updateTweenedText = function(){		
		this.setText(Math.round(tweenObject.tweenAttribute));
	};

	this.setOriginalValue = function(){
		this.setText(originalValue);
	};	
};

ScoreText.prototype = Object.create(Phaser.Text.prototype);
ScoreText.prototype.constructor = ScoreText;
