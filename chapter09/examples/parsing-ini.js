/*
  INI File

  searchengine=https://duckduckgo.com/?q=$1
  spitefulness=9.7

  ; comments are preceded by a semicolon...
  ; each section concerns an individual enemy
  [larry]
  fullname=Larry Doe
  type=kindergarten bully
  website=http://www.geocities.com/CapeCanaveral/11451

  [davaeorn]
  fullname=Davaeorn
  type=evil wizard
  outputdir=/home/marijn/enemies/davaeorn
*/

/*
  INI Format Rules

  - Blank lines and lines starting with a semi-color are ignored
  - Lines wrapped in [brackets] start a new section
  - Lines containing an alphanumeric identifier followed by a =
    character add a setting to the current section
  - Anything else is invalid
*/

/*
  The task is to convert an INI file to an object
  whose properties represent either global settings
  or subsections whose properties represent settings
  for that section.
*/

function parseINI(string) {
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line => {
    let match;
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error(`Line '${line}' is not valid`);
    }
  });
  return result;
}

/*
  This program loops over every line and builds a data
  structure that represents the INI file. Properties
  at the top of the file are stored directly into the
  resulting object.

  The section binding points at the object for the current
  section. At the start, the section binding represents the
  global settings, and when the program runs into the start
  of a new section, it is set equal to a property of the 
  result object that is binded to a fresh object. This
  pattern is a succinct way to create the data structure
  we are looking for.
*/