
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    //create and position preloader UI
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    //listen for loadComplete
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    
    //sounds
    this.load.audio('tap', ['assets/tap.mp3', 'assets/tap.ogg']);
    this.load.audio('won', ['assets/won.mp3', 'assets/won.ogg']);
    this.load.audio('lost', ['assets/lost.mp3', 'assets/lost.ogg']);

    //load used assets
    this.load.atlas('assets', 'assets/assets.png', 'assets/assets.json');
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
