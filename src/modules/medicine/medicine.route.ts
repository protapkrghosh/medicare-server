import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../types/roles";

const router = Router();

// Medicines
router.get("/medicines", medicineController.getAllMedicines);
router.get("/medicines/:id", medicineController.getMedicine);
router.get("/categories", medicineController.getCategories);

// Seller Management
router.get(
   "/seller/orders",
   auth(UserRole.SELLER),
   medicineController.getSellerOrders,
);

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

router.patch(
   "/seller/orders/:id",
   auth(UserRole.SELLER),
   medicineController.updateOrder,
);

router.delete(
   "/seller/medicines/:id",
   auth(UserRole.SELLER),
   medicineController.deleteMedicine,
);

// Admin
router.post(
   "/categories",
   auth(UserRole.ADMIN),
   medicineController.createCategory,
);

export const medicineRouter = router;
