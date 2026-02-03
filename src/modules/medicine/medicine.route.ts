import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

// Medicines
router.get("/medicines", medicineController.getAllMedicines);
router.get("/medicine/:medicineId", medicineController.getMedicine);

// Seller Management
router.post(
   "/seller/medicines",
   auth(UserRole.SELLER),
   medicineController.createMedicine,
);

export const medicineRouter = router;
