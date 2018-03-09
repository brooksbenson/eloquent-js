require.cache = Object.create(null);

function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let module = {exports: {}};
    require.cache[name] = module;
    let wrapper = Function('require, exports, module', code);
    wrapper(require, module.exports, module);
  }
  return require.cache[name].exports;
}

/*
  The function above allows for what are called cyclic
  modules, that is, modules that depend on one another.
  
  This is made possible because the first required module
  is named and assigned to the cache *before* it gets
  loaded. When the second module is loaded and requires
  the first, the interface as it currently stands is loaded
  and returned. If this wasn't the case, the call stack
  would eventually overflow because the require function
  would never return.

  If a module overwrites its exports value, any module
  that requires it will receive the originally defined
  export value, which is an empty object.
*/