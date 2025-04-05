// main.js

// Importieren von benannten Exporten aus helpers.js
import { API_KEY, greet, User } from './helpers.js';

// Importieren eines Default Exports (falls vorhanden in helpers.js)
// import nachrichtenVariable from './helpers.js'; // Name frei wählbar

console.log("API Schlüssel:", API_KEY);

greet("Entwickler"); // Funktion aufrufen

const newUser = new User("CodeNinja"); // Klasse instanziieren
newUser.displayInfo();

// Verwendung des Default Exports (falls importiert)
// console.log(nachrichtenVariable);
