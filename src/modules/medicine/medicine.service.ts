import type {
   Category,
   Medicine,
   Order,
} from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// Medicines (public)
const getAllMedicines = async () => {
   const medicines = await prisma.medicine.findMany();
   return medicines;
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
