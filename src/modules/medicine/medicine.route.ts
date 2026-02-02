import { Router } from "express";
import { medicineController } from "./medicine.controller";

const router = Router();

router.post("/seller/medicines", medicineController.createMedicine);

export const medicineRouter = router;
