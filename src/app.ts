import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from "./modules/medicine/medicine.route";
import { authRouter } from "./authentication/auth.route";
import { notFound } from "./middleware/notFound";
import errorHandler from "./middleware/globalErrorHandler";
import { userRouter } from "./modules/user/user.route";

const app = express();

app.use(
   cors({
      origin: process.env.APP_URL || "http://localhost:3000",
      credentials: true,
   }),
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", medicineRouter);
app.use("/api/admin", userRouter);

app.get("/", (req, res) => {
   res.send("MediCare server is running ...");
});

app.use(notFound);
app.use(errorHandler);

export default app;
