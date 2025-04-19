
/**
 * @openapi
 * /api/Chicken:
 *   get:
 *     summary: Get all Chicken entries
 *     description: Retrieves all Chicken entries from the database.
 *     responses:
 *       200:
 *         description: Successful response with a "Pong" message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       owner:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       description:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: No Chicken entries found in the database.
 *       500:
 *         description: Error retrieving Chicken entries from the database.
 *   post:
 *     summary: Create a new Chicken entry
 *     description: Creates a new Chicken entry in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               owner:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Successfully created a new Chicken entry.
 */


import express from "express";
import getUser from "@/utils/user.get.js";
import Chicken from "@/models/chicken.model.js";
import { findAllChickenController } from "@/controllers/findAllChicken.controller.js";
import { findOneChickenController } from "@/controllers/findOneChicken.controller.js";
import { deleteChickenController } from "@/controllers/deleteChicken.controller.js";
const router = express.Router();

// Route pour obtenir toutes les entrées
router.get("/", findAllChickenController);
router.get("/:id", findOneChickenController)
router.delete("/:id", deleteChickenController)

// Route pour ajouter une nouvelle entrée
router.post("/", async (req: Record<string, any>, res: Record<string, any>) => {
  try {
    const userId: Record<string, any> = getUser(req); // Assurez-vous que la fonction getUser renvoie l'ID de l'utilisateur connecté
    // insertion de l'utilisateur connecté dans le champ owner
    if (!userId) {
      return res.status(403).json({ message: "Utilisateur non connecté" });
    }
    const newChicken = new Chicken({
      ...req.body,
      owner: userId, // Assurez-vous que le champ owner est défini dans le modèle Chicken
    });

    const chickenSaved = await newChicken.save();
    res.status(201).json({
      message: "Nouvelle entrée ajoutée avec succès",
      data: chickenSaved,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout des données" });
  }
});

export default router;
