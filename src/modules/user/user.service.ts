import type { User } from "better-auth/types";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
   const users = await prisma.user.findMany();
   return users;
};

const updateUser = async (userId: string, data: Partial<User>) => {
   const users = await prisma.user.update({
      where: {
         id: userId,
      },
      data: data as any,
   });
   return users;
};

export const userService = {
   getAllUsers,
   updateUser,
};
