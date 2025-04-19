import Chicken from "@/models/chicken.model.js";
import mongoose from "mongoose";

export const deleteChickenController = async (
  req: Record<string, any>,
  res: Record<string, any>
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ratsy io id io, esory any io!" });
    }

    const deleted = await Chicken.deleteOne({ _id: req.params.id });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Chicken not found" });
    }

    return res.status(200).json({ message: "Chicken deleted successfully" });
  } catch (error) {
    console.error("Error deleting chicken:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
