require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');


const app = express();
app.use(express.json()); // middleware pour parser le JSON

// configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// route pour enregistrer un utilisateur (POST)
app.post('/register', (req, res) => {
    const { id, nom, prenom, adresse, neurologue, date_naissance, mot_code } = req.body;

    console.log(" Données reçues :", req.body);

    // vérification des champs obligatoires
    if (!id || !nom || !prenom || !adresse || !neurologue || !date_naissance || !mot_code) {
        console.error(" Erreur : Données manquantes !");
        return res.status(400).json({ error: 'Missing data' });
    }

    // connexion à MySQL
    console.log("  Connexion à MySQL...");
    const connection = mysql.createConnection(dbConfig);

    const query = 'INSERT INTO utilisateurs (id, nom, prenom, adresse, neurologue, date_naissance, mot_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [id, nom, prenom, adresse, neurologue, date_naissance, mot_code];

    connection.execute(query, values, (err, results) => {
        if (err) {
            console.error(" Erreur SQL :", err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log(" Utilisateur enregistré avec succès !");
        res.status(201).json({ success: 'Utilisateur enregistré' });
    });

    connection.end();
});

// route pour récupérer les catégories (GET)
app.get('/categories', (req, res) => {
    const categoriesFile = 'data/categories.json';

    fs.readFile(categoriesFile, 'utf8', (err, data) => {
        if (err) {
            console.error(" Erreur lecture fichier :", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log("Catégories envoyées avec succès !");
        res.json(JSON.parse(data));
    });
});

// route pour récupérer les infos des patients pour la profil page (GET)
app.get('/profil/:uid', (req, res) => {
    const uid = req.params.uid;

    console.log("Requête pour récupérer les infos de l'utilisateur avec UID :", uid);

    const connection = mysql.createConnection(dbConfig);

    const query = 'SELECT * FROM utilisateurs WHERE id = ?';
    const values = [uid];

    connection.execute(query, values, (err, results) => {
        if (err) {
            console.error("Erreur SQL :", err.message);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        console.log("Utilisateur trouvé :", results[0]);
        res.status(200).json(results[0]);
    });
});

// démarrer le serveur Express
const port = 2880;
app.listen(port, () => {
    console.log(`API Express démarrée sur le port ${port} `);
});

