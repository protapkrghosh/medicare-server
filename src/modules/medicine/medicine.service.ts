import type { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// Medicines
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

// Seller Management
const createMedicine = async (
   data: Omit<Medicine, "id" | "createdAt" | "updatedAt">, authorId: string,
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

const deleteMedicine = async (medicineId: string) => {
   const medicine = await prisma.medicine.delete({
      where: {
         id: medicineId
      }
   })

   return medicine;
}

export const medicineService = {
   getAllMedicines,
   getMedicine,
   createMedicine,
   updateMedicine,
   deleteMedicine,
};
