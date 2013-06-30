define([
  './update',
  './draw',
  'frozen/GameCore'
], function(update, draw, GameCore){

  'use strict';

  //setup a GameCore instance
  var game = new GameCore({
    canvasId: 'canvas',
    gameAreaId: 'gameArea',
    canvasPercentage: 0.95,
    update: update,
    draw: draw
  });

  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});