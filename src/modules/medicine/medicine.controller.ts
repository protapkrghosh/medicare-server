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
         message: "All medicines has been successfully obtained.",
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

const getMedicine = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const medicine = await medicineService.getMedicine(id as string);

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
      const user = req.user;

      if (!user) {
         return res.status(401).json({
            success: false,
            message: "User not authenticated",
         });
      }

      const result = await medicineService.createMedicine(req.body, user.id);
      res.status(201).json({
         success: true,
         message: "Medicine created successfully",
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

const updateMedicine = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const { id } = req.params;

      const medicine = await medicineService.updateMedicine(
         id as string,
         req.body,
      );
      res.status(200).json({
         success: true,
         message: "Medicine updated successfully.",
         data: medicine,
      });
   } catch (error) {
      next(error);
   }
};

const deleteMedicine = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const { id } = req.params;
      const medicine = await medicineService.deleteMedicine(id as string);
      res.status(200).json({
         success: true,
         message: "Medicine deleted successfully.",
         // data: medicine,
      });
   } catch (error) {
      next(error);
   }
};

export const medicineController = {
   getAllMedicines,
   getMedicine,
   createMedicine,
   updateMedicine,
   deleteMedicine,
};
