import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const users = await userService.getAllUsers();
      res.status(200).json({
         success: true,
         message: "All users were successfully found.",
         data: users,
      });
   } catch (error) {
      next(error);
   }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id as string, req.body);
      res.status(200).json({
         success: true,
         message: "User updated successfully",
         data: updatedUser,
      });
   } catch (error) {
      next(error);
   }
};

export const userController = {
   getAllUsers,
   updateUser,
};
