import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import classeRoutes from "./routes/classe.js"
import coursRoutes from "./routes/cours.js"
import noteRoutes from "./routes/note.js"
import studentRoutes from "./routes/student.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin : 'http://localhost:3000',
  credentials : true
}));

app.use("/classes", classeRoutes);
app.use("/cours", coursRoutes)
app.use("/notes", noteRoutes)
app.use("/students", studentRoutes)

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));