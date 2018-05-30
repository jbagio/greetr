if (typeof jQuery === 'undefined') {
  throw new TypeError('Greetr requires jQuery, which must be included before Greetr\'s script.');
}

// IIFE to create a new execution context
// Safe code, no collisions
(function (global, $) {
  const Greetr = function (firstName, lastName, language) {
    // use the Greetr.init function constructor to generate the object
    // this way a Greetr object can be created without 'new' keyword
    return new Greetr.init(firstName, lastName, language);
  }

  Greetr.prototype = {};

  // actual function constructor
  Greetr.init = function (firstName, lastName, language) {
    // futureproofing - not needed now,
    // doing it so that we don't have to worry about what 'this' points to later
    const self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
  }

  // Ensure that the prototype chain connects to our Greetr.prototype and not the
  // default created when Greetr.init is invoked
  Greetr.init.prototype = Greetr.prototype;

  // attach our Greetr function to the global object
  global.Greetr = global.G$ = Greetr;
}(window, jQuery));
