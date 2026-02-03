import type { NextFunction, Request, Response } from "express";
import { medicineService } from "./medicine.service";

// Medicines
const getAllMedicines = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const result = await medicineService.getAllMedicines();

      res.status(200).json({
         success: true,
         message: "All medicine has been successfully obtained.",
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

const getMedicine = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { medicineId } = req.params;
      const medicine = await medicineService.getMedicine(medicineId as string);

      res.status(200).json({
         success: true,
         message: "The medicine has been successfully obtained.",
         data: medicine,
      });
   } catch (error) {
      next(error);
   }
};

// Seller Management
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
   getAllMedicines,
   getMedicine,
   createMedicine,
};
