import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../types/roles";

const router = Router();

router.post("/orders", auth(UserRole.CUSTOMER), orderController.createOrder);

router.get("/orders", auth(UserRole.CUSTOMER), orderController.getAllOrders);

router.get("/orders/:id", auth(UserRole.CUSTOMER), orderController.getOrder);

export const orderRouter = router;
