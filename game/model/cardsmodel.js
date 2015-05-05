
CardsModel = function (game, x, y) {

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

    this.fillCardStack = function(){      
      
      var numValues = values.length;          
      var numSymbols = symbols.length;

      for (var i=0; i<numSymbols; i++) 
        for (var j=0; j<numValues; j++) 
          cardStack.push({value:values[j], symbol:symbols[i]});                                            
    };

    this.shuffleCards = function(){
      var currentIndex = cardStack.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) 
      {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;        
        temporaryValue = cardStack[currentIndex];
        cardStack[currentIndex] = cardStack[randomIndex];
        cardStack[randomIndex] = temporaryValue;
      }      
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

	    for (var i = 0; i < numStacks; i++) 
	    {
	      stackArray = targetStacks[i];
	      
	        if (stackArray.length == 4){

	          wonAmount = this.getStackWinAmount(stackArray);	          
	          balance += wonAmount            	          
            paid += wonAmount;              

	          stackArray.forEach(function(card){ card.kill(); })            
	          stackArray.length = 0;
	        }
	    }
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
      
      var numItems = arr.length;
      for (var i = 1; i < numItems; i++)
      {
        if (arr[i][attr] !== arr[0][attr])
            return false;
      }
      return true;
    }; 

	this.fillCardStack();
	this.shuffleCards();
};
