import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

// Medicines
router.get("/medicines", medicineController.getAllMedicines);
router.get("/medicine/:id", medicineController.getMedicine);

// Seller Management
router.post(
   "/seller/medicines",
   auth(UserRole.SELLER),
   medicineController.createMedicine,
);

router.put(
   "/seller/medicines/:id",
   auth(UserRole.SELLER),
   medicineController.updateMedicine,
);

router.delete(
   "/seller/medicines/:id",
   auth(UserRole.SELLER),
   medicineController.deleteMedicine,
);

export const medicineRouter = router;
