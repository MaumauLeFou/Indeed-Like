const express = require("express");
const router = express.Router();
const pool = require("../db");

// Route pour récupérer toutes les entreprises
router.get("/entreprises", async (req, res) => {
  try {
    const entreprises = await pool.query("SELECT * FROM entreprises");
    res.json(entreprises.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour créer une nouvelle entreprise
router.post("/entreprises", async (req, res) => {
  try {
    const { nom, domaine, description, email } = req.body;
    const newEntreprise = await pool.query(
      "INSERT INTO entreprises (nom, domaine, description, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [nom, domaine, description, email]
    );
    res.json(newEntreprise.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour mettre à jour une entreprise existante
router.put("/entreprises/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, domaine, description, email } = req.body;
    const updatedEntreprise = await pool.query(
      "UPDATE entreprises SET nom = $1, domaine = $2, description = $3, email = $4 WHERE id_entreprise = $5 RETURNING *",
      [nom, domaine, description, email, id]
    );
    res.json(updatedEntreprise.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour supprimer une entreprise
router.delete("/entreprises/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM entreprises WHERE id_entreprise = $1", [id]);
    res.json({ message: "Entreprise deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
