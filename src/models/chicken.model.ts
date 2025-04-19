import mongoose, { Schema, model } from "mongoose";

const AkohoSchema = new Schema(
  {
    name: { type: String, required: true },
    race: { type: String, required: true },
    //relation
    owner: { 
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
     },
  },
  { timestamps: true }
);

const Chicken = model("Akoho", AkohoSchema); // User de modèle Mongoose
export default Chicken;
