// helpers.js

// Eine Variable exportieren
export const API_KEY = "ABC123XYZ";

// Eine Funktion exportieren
export function greet(name) {
  console.log(`Hallo, ${name}! Willkommen zu ES Modules.`);
}

// Eine Klasse exportieren
export class User {
  constructor(username) {
    this.username = username;
  }

  displayInfo() {
    console.log(`Benutzername: ${this.username}`);
  }
}

// Optional: Ein Default Export (nur einer pro Datei möglich)
// const standardNachricht = "Dies ist die Standardnachricht.";
// export default standardNachricht;
