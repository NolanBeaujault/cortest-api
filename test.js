// test-db-connection.js
require('dotenv').config();
const mysql = require('mysql2');

// Créer une connexion à partir des variables d'environnement
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log('--- TEST DE CONNEXION À LA BASE DE DONNÉES ---');

connection.connect((err) => {
  if (err) {
    console.error('❌ Échec de la connexion :', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connexion réussie à la base de données.');
    connection.end();
  }
});

