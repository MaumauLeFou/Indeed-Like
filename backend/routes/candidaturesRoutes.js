const express = require("express");
const router = express.Router();
const pool = require("../db");

// Route pour récupérer toutes les candidatures
router.get("/candidatures", async (req, res) => {
  try {
    const candidatures = await pool.query("SELECT * FROM candidatures");
    res.json(candidatures.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour créer une nouvelle candidature
router.post("/candidatures", async (req, res) => {
  try {
    const { id_annonce, id_candidat, statut } = req.body;
    const newCandidature = await pool.query(
      "INSERT INTO candidatures (id_annonce, id_candidat, statut) VALUES ($1, $2, $3) RETURNING *",
      [id_annonce, id_candidat, statut]
    );
    res.json(newCandidature.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour mettre à jour une candidature existante
router.put("/candidatures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;
    const updatedCandidature = await pool.query(
      "UPDATE candidatures SET statut = $1 WHERE id_candidature = $2 RETURNING *",
      [statut, id]
    );
    res.json(updatedCandidature.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour supprimer une candidature existante
router.delete("/candidatures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM candidatures WHERE id_candidature = $1", [
      id,
    ]);
    res.json({ message: "Candidature deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
