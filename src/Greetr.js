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
  };

  // internal variables, inacessible ouside IIFE scope
  // used in resulting closure
  const supportedLanguages = ['en', 'es', 'hip'];
  const greetings = {
    en: 'Hello',
    es: 'Hola',
    hip: 'Yolo'
  };
  const formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',
    hip: 'Salutations'
  };
  const logMessages = {
    en: 'Logged in',
    es: 'Inició sesión',
    hip: 'Signed in, totes amazeballs'
  };

  // Available props / methods on prototype
  Greetr.prototype = {
    fullName: function () {
      return `${this.firstName} ${this.lastName}`;
    },

    validate: function () {
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw new TypeError('Invalid language');
      }
    },

    greeting: function () {
      return `${greetings[this.language]} ${this.firstName}!`;
    },

    formalGreeting: function () {
      return `${formalGreetings[this.language]} ${this.fullName()}.`;
    },
    // chainable methods
    greet: function (formal) {
      let msg = formal ? this.formalGreeting() : this.greeting();

      if (console) {
        console.log(msg);
      }
      // this refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(`${logMessages[this.language]}: ${this.fullName()}.`);
      }

      return this;
    },

    setLanguage: function (language) {
      this.language = language;
      this.validate();

      return this;
    }
  };

  // actual function constructor
  Greetr.init = function (firstName, lastName, language) {
    // futureproofing - not needed now,
    // doing it so that we don't have to worry about what 'this' points to later
    const self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
  };

  // Ensure that the prototype chain connects to our Greetr.prototype and not the
  // default created when Greetr.init is invoked
  Greetr.init.prototype = Greetr.prototype;

  // attach our Greetr function to the global object
  global.Greetr = global.G$ = Greetr;
}(window, jQuery));
