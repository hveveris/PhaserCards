
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
