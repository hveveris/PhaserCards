
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
