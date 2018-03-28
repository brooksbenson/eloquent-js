/*
  JavaScript provides a Date class for representing
  points in time. Simply calling Date will return
  the current time, though you can also create a 
  value for a specific point in time. 
  
  JavaScript starts counting months from 0, and days
  from 1.

  The date object is capable of taking 7 arguments:
  year, month, day, hour, minute, second, millisecond

  If the data object receives one argument, then it
  interprets it as a time stamp and uses that to form
  a new date object.
*/

new Date(); //2018-03-02T01:18:50.920Z
new Date(1995, 2, 17); //1995-03-17T07:00:00.000Z

/*
  Timestamps are stored as the number of milliseconds
  since the start of 1970 in the UTC time zone. You can
  get the current time by calling the getTime method on
  a date object. 
*/

new Date().getTime(); //1519954053224

/*
  Date objects provide methods like:

  getFullYear
  getYear - two digit val 
  getMonth 
  getDate 
  getHours 
  getMinutes 
  getSeconds
*/