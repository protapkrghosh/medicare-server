import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../types/roles";

const router = Router();

router.get("/users", auth(UserRole.ADMIN), userController.getAllUsers);
router.patch("/users/:id", auth(UserRole.ADMIN), userController.updateUser);

export const userRouter = router;
