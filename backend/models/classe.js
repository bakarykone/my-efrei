import mongoose from "mongoose";

const classeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
  }
);

const Classe = mongoose.model("Classe", classeSchema);

export default Classe;
