
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
