CardsModel = function () {

    var _ = require('underscore');

    var symbols = ["clubs", "hearts", "spades", "diamonds"];
    var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    var cardStack = [];
    var openCard = null;
    var targetStacks = [[], [], []];
    var symbolPayout = 3;
    var valuePayout = 5;
    var balance = 3000;
    var staked = 0;
    var paid = 0;
    var stake = 50;

    this.prepareDeck = function(){      

      _.each(symbols, function(symbol){           
          _.each(values, function(value){              
              cardStack.push({symbol:symbol, value:value});
          })
      })
      
      cardStack = _.shuffle(cardStack);
    };

    this.getStakedAmount = function(){
      return staked;
    };

    this.getPaidAmount = function(){
      return paid;
    };

    this.getBalance = function(){
      return balance;
    };

    this.cardsLeft = function(){
    	return cardStack.length;
    };

    this.popCard = function(){

    	balance -= stake;
    	staked += stake;

    	return cardStack.pop();
    };

    this.pushCardToStack = function(card, index){
    	targetStacks[index].push(card);
    };

    this.numCardsInStack = function(index){
    	return targetStacks[index].length;
    };

    this.processStacksAfterDraw = function(){
    	
      var wonAmount = 0;
      var stackArray = null;      
      var numStacks = targetStacks.length;

	    for (var i = 0; i < numStacks; i++) {
          stackArray = targetStacks[i];
	      
	        if (stackArray.length == 4){
            wonAmount = this.getStackWinAmount(stackArray);	          
	          balance += wonAmount            	          
            paid += wonAmount;              

	          _.each(stackArray, function(card){ card.kill(); });            
	          stackArray.length = 0;

            return wonAmount > 0 ? 'won' : 'lost';
	        }
	    }
      return 'proceed';
    };

    this.getStackWinAmount = function(stack){

      var hasSameValues = this.hasSameValuesFor(stack, "cardValue");
      var hasSameSymbol = this.hasSameValuesFor(stack, "cardSymbol");

      if (hasSameValues)
        return 4 * stake * valuePayout;
      else
      if (hasSameSymbol)
        return 4 * stake * symbolPayout;
      else
      return 0;
    };

    this.hasSameValuesFor = function(arr, attr){      
      return _.every(arr, function(card){ return card[attr] === arr[0][attr]; });
    }; 

	this.prepareDeck();	
};
