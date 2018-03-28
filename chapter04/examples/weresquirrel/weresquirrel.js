const eventData = require('./event-data');

const log = [];
entries.forEach(({events, squirrel}) => {
  log.push({events, squirrel});
});


function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

function tableFor(event) {
  const table = [0, 0, 0, 0];
  log.forEach(entry => {
    let tableIndex = 0;
    if (entry.events.includes(event)) tableIndex += 1;
    if (entry.squirrel) tableIndex += 2;

    table[tableIndex]++;
  });
  return table;
}

function uniqueJournalEvents() {
  let uniqE = new Set();
  log.forEach(({events}) => {
    events.forEach(event => uniqE.add(event));
  });
  return [...uniqE];
}

let correlatedEvents = [];
uniqueJournalEvents().forEach(event => {
  let correlation = phi(tableFor(event));
  if (Math.abs(correlation) > .3) {
    correlatedEvents.push({
      event,
      correlation
    });
  }
});

// correlatedEvents: brushed teeth: -.38, peanuts: .59
// it looks like there is a strong correlation for peanuts,
// and a strong negative correlation for brushing teeth.

// let's create an independent event that represents Jaque
// eating peanuts and not brushing his teeth, then calulate
// the correlation

for (let entry of log) {
  let {events} = entry;
  if (events.includes('peanuts') && !events.includes('brushed teeth')) {
    events.push('peanut teeth');
  }
}

const peanutTeethCorrelation = phi(tableFor('peanut teeth'));
console.log(peanutTeethCorrelation); //1

//looks like we have a winner