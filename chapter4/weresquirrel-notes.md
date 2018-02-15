# Understanding Weresquirrel

Weresquirrel is an example program located in chapter 4.

## Statistical variable

Any characteristic, number, or quantity that can be measured or counted. A variable may also be called a data item. Examples include: age, sex, income, expenses, country of birth, vehicle type, etc.

In statistics you usually have a set of measurements, and statistical variables are measured based on every measurement. It can be thought of as an entity that is constant across measurements.

### Correlation

Correlation is a measure of dependence between statistical variables. Correlation between variables is usually expressed as a value between the range -1 to 1. A zero correlation indicates the variables are unrelated, 1 means they are perfectly related, and -1 means they are again perfectly related, only oppositely so.

#### phi coefficient

The phi coefficient is a formula used to measure the correlation between two boolean valued variables. 

Its input consists of a frequency table that consists of 4 counts, each being a sum that represents a given variable combination and how often that combination occured in the data set.

Its output is a number between the range of -1 and 1.

To see the formula translated into JavaScript, see the function phi in the examples/weresquirrel file.

##### Generating tables

The chosen table representation is a flat array, the important variable (squirrelness) being represented by indices 2 and 3, and the non important variable (event) representing 0 and 1.

The program loops through the entries and tallies up the each of the statistical events we are searching for: (no-event & no-squirrel, event & no-squirrel, no-event & squirrel, event & squirrel). This data structure is plugged in the our phi function to compute correlation between squirrelness and the event.