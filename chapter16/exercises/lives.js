// Modify runGame to keep track of lives

async function runGame(plans, Display, lives) {
  for (let level = 0; level < plans.length; ) {
    console.log(lives);
    let status = await runLevel(new Level(plans[level]), Display);
    if (status == 'won') level++;
    if (status == 'lost') {
      if (!--lives) break;
    }
  }
  console.log(lives == 0 ? 'You lost' : 'You won');
}
runGame(GAME_LEVELS, DOMDisplay, 3);
