# Understanding Weresquirrel

Weresquirrel is an example program located in chapter 4.

## Correlation

Correlation is a measure of dependence between statistical variables. Correlation between variables is usually expressed as a value between the range -1 to 1. A zero correlation indicates the variables are unrelated, 1 means they are perfectly related, and -1 means they are again perfectly related, only oppositely so.

### phi coefficient

The phi coefficient is a formula used to measure the correlation between two boolean valued statistical variables. 

Its input consists of a frequency table that consists of 4 counts, each being a sum that represents how ofter a two-bit combination occurs in a data set.

Its output is a number between the range of -1 and 1.

To see the formula translated into JavaScript, see the function phi in the examples/weresquirrel.js file.

### Generating the frequency table

The chosen table representation is a flat array, the important variable (squirrelness) being represented by indices 2 and 3, and the non important variable (event) being represented by indices 0 and 1.

The program loops through the entries and tallies up the data items we are searching for and builds the table with them (no-event & no-squirrel, event & no-squirrel, no-event & squirrel, event & squirrel). This data structure is plugged in to our phi function to compute correlation between squirrelness and the event.