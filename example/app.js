// const g = G$('Jane', 'Doe');
//
// // informal greeting
// g.greet();
//
// // chained with formal greeting
// g.greet().greet(true);
//
// // chained with setLanguage to Spanish
// g.greet().setLanguage('es').greet(true);

const loginDiv = document.getElementById('login-div');
const loginBtn = document.getElementById('login');
const h1 = document.getElementById('greeting');
const select = document.getElementById('lang');

// Login btn click event
loginBtn.addEventListener('click', (e) => {

  // Get a new Greetr object
  // notice the 'new' keyword is not needed here
  // for the sake of simplicity the name is hardcoded here
  const g = G$('Jane', 'Doe');

  // Use our chainable methods to set the language,
  // fire off an HTML greeting passing the h1 as the selector and log to the console
  g.setLanguage(select.value).HTMLGreeting(h1, true).log();

  // Hide the login section
  loginDiv.style.display = 'none';
});
