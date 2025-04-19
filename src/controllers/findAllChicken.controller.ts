
import Chicken from "@/models/chicken.model.js";
import { getUserSymfony } from "@/utils/user.symfony.js";

export const findAllChickenController = async (req: Record<string, any>, res: Record<string, any>) => {
    try {
        const chicken = await Chicken.find().lean(); 
        if (!chicken || chicken.length === 0) {
          return res.status(404).json({
            message: "Aucune donnée utilisateur trouvée dans la base de données",
          });
        }
    
        // utilisation de helper 
        const populatingOwner = await Promise.all(
            chicken.map(async (c) => {
              const owner = await getUserSymfony(c.owner); // fetch anaty boucle
              return { ...c, owner }; // renvoyer le chicken sy ny owner
            })
          );
          
        res.status(200).json(populatingOwner);
    
      } catch (error) {
        // console.log("Error populating:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des données" });
      }
}