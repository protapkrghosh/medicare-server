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
   data: Omit<Medicine, "id" | "createdAt" | "updatedAt">,
) => {
   const result = await prisma.medicine.create({
      data,
   });

   return result;
};

export const medicineService = {
   getAllMedicines,
   getMedicine,
   createMedicine,
};
