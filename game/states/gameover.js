
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
