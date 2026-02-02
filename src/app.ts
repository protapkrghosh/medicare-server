import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from "./modules/medicine/medicine.route";

const app = express();

app.use(
   cors({
      origin: process.env.APP_URL || "http://localhost:3000",
      credentials: true,
   }),
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", medicineRouter);

app.get("/", (req, res) => {
   res.send("MediCare server is running ...");
});

export default app;
