// IIFE to create a new execution context - safe code, no collisions
(function (global, $) {
  'use strict';
  const Greetr = function (firstName, lastName, language) {
    // Use the Greetr.init function constructor to generate the Greetr object,
    // this way it can be created without 'new' keyword
    return new Greetr.init(firstName, lastName, language);
  };

  // Internal variables, inacessible ouside IIFE scope
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

  // Available props / methods go on prototype
  Greetr.prototype = {
    fullName: function () {
      return `${this.firstName} ${this.lastName}`;
    },
    // Check that selected language is valid
    // references externally inacessible 'supportedLanguages' within the closure
    validate: function () {
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw new TypeError('Invalid language');
      }
    },

    // Dynamically retrieve messages based on language via bracket notation
    greeting: function () {
      return `${greetings[this.language]} ${this.firstName}!`;
    },

    formalGreeting: function () {
      return `${formalGreetings[this.language]} ${this.fullName()}.`;
    },
    // Chainable methods returning their own containing object
    greet: function (formal) {
      let msg = formal ? this.formalGreeting() : this.greeting();

      if (console) {
        console.log(msg);
      }
      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(`${logMessages[this.language]}: ${this.fullName()}.`);
      }

      // Make chainable
      return this;
    },

    // Provide a language setter
    setLanguage: function (language) {
      this.language = language;
      this.validate();

      // Make chainable
      return this;
    },

    // Add message to selector's innerHTML via document.querySelector
    HTMLGreeting: function (selector, formal) {
      if (!selector) {
        throw new ReferenceError('Missing DOM selector.');
      }
      let msg = formal ? this.formalGreeting() : this.greeting();

      // Inject message in the DOM
      window.document.querySelector(selector).innerHTML = msg;

      // Make chainable
      return this;
    }
  };

  // actual function constructor
  Greetr.init = function (firstName, lastName, language) {
    // Futureproofing - not needed now,
    // doing it so that we don't have to worry about what 'this' points to later
    const self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();
  };

  // Ensure that the prototype chain connects to our Greetr.prototype and not the
  // default created when Greetr.init is invoked
  Greetr.init.prototype = Greetr.prototype;

  // Attach our Greetr function to the global object, and provide a shorthand
  global.Greetr = global.G$ = Greetr;
}(window));
