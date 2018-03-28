## Immutable

Data structures that don't change are called *immutable* or *persistent*. Much like strings, numbers, and booleans, immutable data structures stay as they are, meaning their values are not mutated after they are formed.

Immutability is a technique for managing complexity. Instead of having to keep up with a model as it changes over time, a new model is formed for every change. The generated models are essentially historical snapshots and allow each model version to be handled in isolation.

### Object.freeze

The Object.freeze method essentially makes an object value immutable.