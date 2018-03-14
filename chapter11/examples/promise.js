/*
  Instead of arranging for a callback to execute
  when an asynchronous action concludes, you can
  use an object to denote that future event and
  immediately return it. This is what the class
  Promise is for.

  A promise denotes an asynchronous action that
  may complete at some point and produce a value.
  It is able to notify anyone that is interested
  when its value is available.

  The easiest way to create a promise is with the
  Promise.resolve static method. (As a refresher,
  a static method is a method that is directly
  apart of a class, that is, part of the class
  but not part of its instances).
*/