import mongoose from "mongoose";

const coursSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Cours = mongoose.model("Cours", coursSchema);

export default Cours;
