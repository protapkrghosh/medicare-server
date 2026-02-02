import type { NextFunction, Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const result = await medicineService.createMedicine(req.body);
      res.status(201).json({
         success: true,
         message: "Medicine created successfully",
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

export const medicineController = {
   createMedicine,
};
