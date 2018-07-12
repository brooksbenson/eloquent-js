import { trackKeys } from './utils';

export const scale = 20;

/*
  The speed and sizes that make up the
  elements of the game or set according
  to grid units. A grid unit is 20 pixels
  tall and wide. The scale binding denotes
  this logic.
*/

export const wobbleSpeed = 8;
export const wobbleDist = 0.07;

/*
  The wobbleSpeed and wobbleDist globals are
  used in the coin actors update method to update
  the coins position.
*/

export const playerXSpeed = 7;
export const gravity = 30;
export const jumpSpeed = 17;

/*
  The arrowKeys global is a list of arrowKeys
  that effect the state of the game.
*/

export const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);
