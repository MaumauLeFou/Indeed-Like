const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Import des routes
const annoncesRoutes = require("./routes/annoncesRoutes");
const utilisateursRoutes = require("./routes/utilisateursRoutes");
const candidaturesRoutes = require("./routes/candidaturesRoutes");
const entreprisesRoutes = require("./routes/entreprisesRoutes");

// Utilisation des routes
app.use(annoncesRoutes);
app.use(utilisateursRoutes);
app.use(candidaturesRoutes);
app.use(entreprisesRoutes);

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Désolé, cette route n'existe pas !");
});
