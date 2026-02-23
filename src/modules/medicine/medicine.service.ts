import type {
   Category,
   Medicine,
   Order,
} from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { FilterOptions } from "../../types/filterOptions";

// Medicines (public)
const getAllMedicines = async (filters: FilterOptions) => {
   const {
      search,
      categoryName,
      minPrice,
      maxPrice,
      manufacturer,
      page,
      limit,
   } = filters;

   // Build where clause dynamically
   const where: any = {
      stock: {
         notIn: [0],
      },
      isActive: true,
   };

   // Search filter (search in name and description)
   if (search && search.trim()) {
      where.OR = [
         {
            name: {
               contains: search,
               mode: "insensitive",
            },
         },
         {
            description: {
               contains: search,
               mode: "insensitive",
            },
         },
      ];
   }

   // Category filter by Name
   if (categoryName && categoryName.trim()) {
      where.category = {
         name: {
            contains: categoryName,
            mode: "insensitive",
         },
      };
   }

   // Price range filter
   if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
         where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
         where.price.lte = maxPrice;
      }
   }

   // Manufacturer filter
   if (manufacturer && manufacturer.trim()) {
      where.manufacturer = {
         contains: manufacturer,
         mode: "insensitive",
      };
   }

   try {
      // Get total count for pagination
      const total = await prisma.medicine.count({ where });

      // Fetch medicines with pagination
      const medicines = await prisma.medicine.findMany({
         where,
         include: {
            category: {
               select: {
                  id: true,
                  name: true,
               },
            },
         },
         orderBy: {
            createdAt: "desc",
         },
         skip: (page - 1) * limit,
         take: limit,
      });

      return {
         medicines,
         total,
      };
   } catch (error) {
      // console.error("Error fetching medicines:", error);
      throw new Error("Failed to fetch medicines");
   }
};

const getMedicine = async (medicineId: string) => {
   const medicine = await prisma.medicine.findUnique({
      where: {
         id: medicineId,
      },
   });
   return medicine;
};

const getCategories = async () => {
   const categories = await prisma.category.findMany();
   return categories;
};

// Seller Management
const getSellerOrders = async (sellerId: string) => {
   const orders = await prisma.order.findMany({
      where: {
         sellerId: sellerId,
      },
   });
   return orders;
};

const createMedicine = async (
   data: Omit<Medicine, "id" | "createdAt" | "updatedAt">,
   authorId: string,
) => {
   const result = await prisma.medicine.create({
      data: {
         ...data,
         authorId,
      },
   });

   return result;
};

const updateMedicine = async (medicineId: string, data: Medicine) => {
   const medicine = await prisma.medicine.update({
      where: {
         id: medicineId,
      },
      data,
   });

   return medicine;
};

const updateOrder = async (orderId: string, userId: string, data: Order) => {
   const orders = await prisma.order.update({
      where: {
         id: orderId,
      },
      data,
   });

   if (orders.sellerId !== userId) {
      throw new Error("You're not authorized to update this order.");
   }

   return orders;
};

const deleteMedicine = async (medicineId: string) => {
   const medicine = await prisma.medicine.delete({
      where: {
         id: medicineId,
      },
   });

   return medicine;
};

// Admin
const createCategory = async (data: Category) => {
   const category = await prisma.category.create({
      data,
   });

   return category;
};

export const medicineService = {
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
