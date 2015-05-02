(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cardstack');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){

CardsModel = function (game, x, y) {

	this.symbols = ["clubs", "hearts", "spades", "diamonds"];
    this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    this.cardStack = [];
    this.openCard = null;
    this.targetStacks = [[], [], []];
    this.symbolPayout = 3;
    this.valuePayout = 5;
    this.balance = 3000;
    this.staked = 0;
    this.paid = 0;
    this.stake = 50;

    this.fillCardStack = function(){      
      
      for (var i=0; i<this.symbols.length; i++) 
      {
          for (var j=0; j<this.values.length; j++) 
          {
              this.cardStack.push({value:this.values[j], symbol:this.symbols[i]});                            
          }
      }      
    };

    this.shuffleCards = function(){
      var currentIndex = this.cardStack.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) 
      {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;        
        temporaryValue = this.cardStack[currentIndex];
        this.cardStack[currentIndex] = this.cardStack[randomIndex];
        this.cardStack[randomIndex] = temporaryValue;
      }      
    };

    this.cardsLeft = function(){
    	return this.cardStack.length;
    };

    this.popCard = function(){

    	this.balance -= this.stake;
    	this.staked += this.stake;

    	return this.cardStack.pop();
    };

    this.pushCardToStack = function(card, index){
    	this.targetStacks[index].push(card);
    };

    this.numCardsInStack = function(index){
    	return this.targetStacks[index].length;
    };

    this.processStacksAfterDraw = function(){
    	var stackArray = null;
	    for (var i = 0; i < 3; i++) 
	    {
	      stackArray = this.targetStacks[i];
	      
	        if (stackArray.length == 4) 
	        {
	          var wonAmount = this.getStackWinAmount(stackArray);
	          
	          this.balance += wonAmount            	          
              this.paid += wonAmount;              

	          stackArray.forEach(function(card){ card.kill(); })            
	          stackArray.length = 0;
	        }
	    }
    };

    this.getStackWinAmount = function(stack){

      var hasSameValues = this.hasSameValuesFor(stack, "cardValue");
      var hasSameSymbol = this.hasSameValuesFor(stack, "cardSymbol");

      if (hasSameValues)
        return 4 * this.stake * this.valuePayout;
      else
      if (hasSameSymbol)
        return 4 * this.stake * this.symbolPayout;
      else
      return 0;
    };

    this.hasSameValuesFor = function(arr, attr){
      for (var i = 1; i < arr.length; i++)
      {
        if (arr[i][attr] !== arr[0][attr])
            return false;
      }
      return true;
    }; 

	this.fillCardStack();
	this.shuffleCards();
};

CardsModel.prototype = Object.create(Object.prototype);
CardsModel.prototype.constructor = CardsModel;

},{}],3:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {

  preload: function() {

  	//load the preloader UI
    this.load.image('preloader', 'assets/preloader.gif');
  },

  create: function() {
  	
  	//input and performance settings
    this.game.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    
    //enter preloader phase
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },

  init: function(finalBalance){
    this.finalBalance = finalBalance;
  },

  create: function () {
    this.table = this.game.add.tileSprite(0, 0, 800, 600, 'table');    

    this.cards = this.game.add.image(this.game.world.centerX, 280, 'cards');
    this.cards.anchor.setTo(0.5, 0.5);

    var style = { font: '35px Arial', fill: '#000000', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, 420, 'Your final balance: '+ this.finalBalance + '\nClick to play again!', style);
    this.titleText.anchor.setTo(0.5, 0.5);
  },

  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {

  preload: function() {

  },

  create: function() {
    
    this.table = this.game.add.tileSprite(0, 0, 800, 600, 'table');    

    this.cards = this.game.add.image(this.game.world.centerX, 280, 'cards');
    this.cards.anchor.setTo(0.5, 0.5);

    var style = { font: '45px Arial', fill: '#000000', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, 400, 'Click to play', style);
    this.titleText.anchor.setTo(0.5, 0.5);
  },

  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],6:[function(require,module,exports){

  'use strict';

  require('../model/cardsmodel');
  require('../view/scoretext');
  require('../view/crossmark');
  require('../view/closedcard');
  require('../view/opencard');

  function Play() {}
  Play.prototype = {
    create: function() {

      this.cardsModel = new CardsModel();

      this.addUI();
      this.addListeners();
      this.nextCard();
    },

    update: function() {

    },

    addUI:function(){
      //repeating background
      this.game.add.tileSprite(0, 0, 800, 600, 'table');
      
      //some props
      this.game.add.image(420, -20, 'papers');
      this.game.add.image(43, 18, 'notes');
      this.game.add.image(290, 58, 'stackMark');

      //cross marks
      this.crossMark0 = new CrossMark(this.game, 90, 280, 0);
      this.crossMark1 = new CrossMark(this.game, 290, 280, 1);
      this.crossMark2 = new CrossMark(this.game, 490, 280, 2);

      //texts
      this.balanceText = new ScoreText(this.game, 150, 63, this.cardsModel.balance);      
      this.stakeText = new ScoreText(this.game, 140, 117, this.cardsModel.staked);      
      this.paidText = new ScoreText(this.game, 125, 171, this.cardsModel.paid); 
      this.cardsLeftText = new ScoreText(this.game, 305, 67, this.cardsModel.cardsLeft())

      //closed card
      this.closedCard = new ClosedCard(this.game, 315, 155);      
    },

    addListeners: function(){
      this.crossMark0.events.onInputDown.add(this.crossMarkListener, this);
      this.crossMark1.events.onInputDown.add(this.crossMarkListener, this);
      this.crossMark2.events.onInputDown.add(this.crossMarkListener, this);
    },

    nextCard:function(){
      
      //draw card
      this.currentCard = new OpenCard(this.game, 290, 98, this.cardsModel.popCard());
      
      //update fund info
      this.cardsLeftText.setText(this.cardsModel.cardsLeft());
      this.stakeText.setText(this.cardsModel.staked);
      this.balanceText.setText(this.cardsModel.balance);      

      //enable clicks for current card
      this.crossMark0.enable();
      this.crossMark1.enable();
      this.crossMark2.enable();
    },
    
    crossMarkListener: function(crossMark) {

      //disable clicks until next card
      this.crossMark0.disable();
      this.crossMark1.disable();
      this.crossMark2.disable();

      //get target stack
      var stackIndex = crossMark.index;

      //save to stack
      this.cardsModel.pushCardToStack(this.currentCard, stackIndex);
      
      //get y target position offset for stack
      var offsetY = this.cardsModel.numCardsInStack(stackIndex) * 30 + 50;

      //animate card  
      var tween = this.game.add
                    .tween(this.currentCard)
                    .to( { x:crossMark.x, y:crossMark.y + offsetY }, 400, Phaser.Easing.Quadratic.Out, true);

      tween.onComplete.addOnce(this.checkResult, this);
    },

    checkResult: function(){

      //process stacks
      this.cardsModel.processStacksAfterDraw();
      
      //update funds info
      this.balanceText.setText(this.cardsModel.balance);
      this.paidText.setText(this.cardsModel.paid);

      //proceed playing
      if (this.cardsModel.cardsLeft() > 0)
        this.nextCard();
      else
        this.game.state.start('gameover', false, false, this.cardsModel.balance);        
    }    
  };
  
  module.exports = Play;

},{"../model/cardsmodel":2,"../view/closedcard":8,"../view/crossmark":9,"../view/opencard":10,"../view/scoretext":11}],7:[function(require,module,exports){

'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    //create and position preloader UI
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    //listen for loadComplete
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    //load used assets
    this.load.image('table', 'assets/tableTop.jpg');
    this.load.image('papers', 'assets/papers.png');
    this.load.image('cards', 'assets/introCards.png');
    this.load.image('notes', 'assets/notes.png');
    this.load.image('stackMark', 'assets/stackMark.png');
    this.load.image('crossMark', 'assets/cross.png');

    this.load.image('diamondsS', 'assets/diamondsS.png');
    this.load.image('diamondsL', 'assets/diamondsL.png');
    this.load.image('spadesS', 'assets/spadesS.png');
    this.load.image('spadesL', 'assets/spadesL.png');
    this.load.image('heartsS', 'assets/heartsS.png');
    this.load.image('heartsL', 'assets/heartsL.png');
    this.load.image('clubsS', 'assets/clubsS.png');
    this.load.image('clubsL', 'assets/clubsL.png');

    this.load.image('openCard', 'assets/openCard.png');
    this.load.image('closedCard', 'assets/closedCard.png');
  },

  create: function() {
    this.asset.cropEnabled = false;
  },

  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}],8:[function(require,module,exports){

ClosedCard = function (game, x, y) {

	Phaser.Sprite.call(this, game, x, y, "closedCard");    
	
	this.scale = new Phaser.Point(.5, .5);
    this.anchor.setTo(0.5, 0.5);
    this.rotation = 0.08;      

	game.add.existing(this);
};

ClosedCard.prototype = Object.create(Phaser.Sprite.prototype);
ClosedCard.prototype.constructor = ClosedCard;

},{}],9:[function(require,module,exports){

CrossMark = function (game, x, y, index) {

	Phaser.Sprite.call(this, game, x, y, "crossMark");    	
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

},{}],10:[function(require,module,exports){

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

},{}],11:[function(require,module,exports){

ScoreText = function (game, x, y, text) {

	Phaser.Text.call(this, game, x, y, text || '0', { font: '18px Arial', fill: '#666666', align: 'left'});    
	game.add.existing(this);
};

ScoreText.prototype = Object.create(Phaser.Text.prototype);
ScoreText.prototype.constructor = ScoreText;

},{}]},{},[1]);
