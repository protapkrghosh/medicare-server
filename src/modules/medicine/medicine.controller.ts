import type { NextFunction, Request, Response } from "express";
import { medicineService } from "./medicine.service";
import type { FilterOptions } from "../../types/filterOptions";

// Medicines (public)
const getAllMedicines = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const {
         search,
         categoryName,
         minPrice,
         maxPrice,
         manufacturer,
         page = 1,
         limit = 10,
      } = req.query;

      // Build filters object with only defined properties
      const filters: FilterOptions = {
         page: parseInt(page as string) || 1,
         limit: parseInt(limit as string) || 10,
      };

      // Add optional properties only if they exist
      if (search) filters.search = search as string;
      if (categoryName) filters.categoryName = categoryName as string;
      if (minPrice) filters.minPrice = parseFloat(minPrice as string);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
      if (manufacturer) filters.manufacturer = manufacturer as string;

      const result = await medicineService.getAllMedicines(filters);

      res.status(200).json({
         success: true,
         message: "Medicines have been successfully retrieved.",
         data: result.medicines,
         pagination: {
            total: result.total,
            page: filters.page,
            limit: filters.limit,
            totalPages: Math.ceil(result.total / filters.limit),
         },
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

const getCategories = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const categories = await medicineService.getCategories();

      res.status(200).json({
         success: true,
         message: "All categories has been successfully obtained.",
         data: categories,
      });
   } catch (error) {
      next(error);
   }
};

// Seller Management
const getSellerOrders = async (
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

      const result = await medicineService.getSellerOrders(user.id);

      res.status(200).json({
         success: true,
         message: "All orders has been successfully obtained.",
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

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

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   const user = req.user;

   if (!user) {
      return res.status(401).json({
         success: false,
         message: "User not authenticated",
      });
   }

   const result = await medicineService.updateOrder(
      id as string,
      user.id,
      req.body,
   );

   res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      data: result,
   });
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

// Admin
const createCategory = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const category = await medicineService.createCategory(req.body);
      res.status(201).json({
         success: true,
         message: "Category created successfully",
         data: category,
      });
   } catch (error) {
      next(error);
   }
};

export const medicineController = {
   getAllMedicines,
   getMedicine,
   getCategories,
   getSellerOrders,
   createMedicine,
   updateMedicine,
   updateOrder,
   deleteMedicine,
   createCategory,
};
