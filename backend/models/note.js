import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    cours: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cours",
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
