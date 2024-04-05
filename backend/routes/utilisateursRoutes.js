const express = require("express");
const router = express.Router();
const pool = require("../db");

// Route pour récupérer tous les utilisateurs
router.get("/utilisateurs", async (req, res) => {
  try {
    const utilisateurs = await pool.query("SELECT * FROM utilisateurs");
    res.json(utilisateurs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour créer un nouvel utilisateur
router.post("/utilisateurs", async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, role, id_entreprise } = req.body;
    const newUtilisateur = await pool.query(
      "INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, id_entreprise) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nom, prenom, email, mot_de_passe, role, id_entreprise]
    );
    res.json(newUtilisateur.rows[0]);
    res.json({ message: "Utilisateur crée avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour mettre à jour une annonce existante
router.put("/utilisateurs/:id", async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, role } = req.body;
    const id = req.params.id;
    const utilisateur = await pool.query(
      "UPDATE utilisateurs SET nom = $1, prenom = $2, email = $3, mot_de_passe = $4, role = $5 WHERE id_utilisateur = $6 RETURNING *",
      [nom, prenom, email, mot_de_passe, role, id]
    );
    res.json(utilisateur.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour supprimer un utilisateur
router.delete("/utilisateurs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM utilisateurs WHERE id_utilisateur = $1", [
      id,
    ]);
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
