const express = require("express");
const router = express.Router();
const pool = require("../db");

// Route pour récupérer toutes les annonces
router.get("/annonces", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM annonces");
    res.json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des annonces" });
  }
});

// Route pour créer une nouvelle annonce
router.post("/annonces", async (req, res) => {
  const { titre, description, salaire, lieu } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO annonces (titre, description, salaire, lieu) VALUES ($1, $2, $3, $4) RETURNING *",
      [titre, description, salaire, lieu]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'annonce" });
  }
});

// Route pour mettre à jour une annonce existante
router.put("/annonces/:id", async (req, res) => {
  const { id } = req.params;
  const { titre, description, salaire, lieu } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE annonces SET titre = $1, description = $2, salaire = $3, lieu = $4 WHERE id = $5 RETURNING *",
      [titre, description, salaire, lieu, id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'annonce" });
  }
});

// Route pour supprimer une annonce
router.delete("/annonces/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM annonces WHERE id = $1", [id]);
    res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'annonce" });
  }
});

module.exports = router;
