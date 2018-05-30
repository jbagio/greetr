const g = G$('John', 'Doe');

// informal greeting
g.greet();

// chained with formal greeting
g.greet().greet(true);

// chained with setLanguage to hipster
g.setLanguage('hip').greet();
