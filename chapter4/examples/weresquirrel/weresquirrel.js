// Jaque keeps turning into a squirrel, and it is
// happening at irregular times, so he begins a daily
// log of everything he did on a particular day to find
// out what is causing him to turn into a squirrel.

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

console.log(tableFor('pizza'));