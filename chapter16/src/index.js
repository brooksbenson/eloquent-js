import State from './state';
import Level from './level';
import DOMDisplay from './dom';

const simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

const level = new Level(simpleLevelPlan);
const display = new DOMDisplay(document.body, level);
display.syncState(State.start(level));
