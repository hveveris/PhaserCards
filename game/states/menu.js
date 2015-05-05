
'use strict';
function Menu() {}

Menu.prototype = {

  preload: function() {

  },

  create: function() {
    
    this.table = this.game.add.tileSprite(0, 0, 800, 600, 'assets', 'table');
    
    this.cards = this.game.add.image(this.game.world.centerX, 280, 'assets', 'cards');
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
