import express from "express";
import cors from "cors";
import { medicineRouter } from "./modules/medicine/medicine.route";

const app = express();

app.use(express.json());
app.use(
   cors({
      origin: process.env.APP_URL || "http://localhost:3000",
      credentials: true,
   }),
);

app.use("/api", medicineRouter);

app.get("/", (req, res) => {
   res.send("MediCare server is running ...");
});

export default app;
