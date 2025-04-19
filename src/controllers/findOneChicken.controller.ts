import Chicken from "@/models/chicken.model.js";
import { getUserSymfony } from "@/utils/user.symfony.js";
import mongoose from "mongoose";

export const findOneChickenController = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ratsy io id io, esory any io!" });
    }
    
    const chicken = await Chicken.findById(id).lean(); // findById() dia mitady chicken iray ihany
    if (!chicken) {
      return res.status(404).json({
        message: "Aucune donnée ciblé",
      });
    }

    // utilisation de helper
    const owner = await getUserSymfony(chicken.owner);
    const populatingOwner = { ...chicken, owner };

    res.status(200).json(populatingOwner);
  } catch (error) {
    // console.log("Error populating:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
};
