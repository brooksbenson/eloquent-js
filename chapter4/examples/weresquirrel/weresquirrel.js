// Jaque keeps turning into a squirrel, and it is
// happening at irregular times, so he begins a daily
// log of everything he did on a particular day to find
// out what is causing this.

let log = [];

const addEntry = (events, squirrel) => {
  log.push({events, squirrel});
};

const entries = require('./event-data')
entries.forEach(day => addEntry(day.events, day.squirrel));
// Once Jaque has added enough data to his log, he intends
// to use statistics to find out which events are related
// to his squirrelification.

// Here is a function that uses the phi coefficient formula
// to compute the correlation between an event and squirrelification

function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

// To compute a given table for an event, we need to loop
// through every entry to see whether the event happens,
// if it happens with squirrelification, or if squirrelification
// happens without the event

function tableFor(event) {
  const table = [0, 0, 0, 0];
  log.forEach(entry => {
    tableIndex = 0;
    if (entry.events.includes(event)) tableIndex += 1;
    if (entry.squirrel) tableIndex += 2;

    table[tableIndex]++;
  });
  return table;
}

// To compute a correlation for every type of event in the data set,
// we need to build up a data structure listing every unique event.

function journalEvents() {
  let uniqE = new Set();
  log.forEach(({events}) => {
    events.forEach(event => uniqE.add(event));
  });
  return [...uniqE];
}

// Time to find out what is causing our man Jaque to turn into a squirrel.

const events = journalEvents();

let correlatedEvents = [];
events.forEach(event => {
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