import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../types/roles";

async function seedAdmin() {
   try {
      const adminData = {
         name: (process.env.ADMIN_NAME as string) || "Medicare",
         email: process.env.ADMIN_EMAIL as string,
         password: process.env.ADMIN_PASSWORD as string,
         image:
            (process.env.ADMIN_PROFILE_IMAGE as string) ||
            "https://i.ibb.co.com/xq7mFzFG/premiu.jpg",
         role: UserRole.ADMIN,
      };

      // Check user exist on database or not
      const existingUser = await prisma.user.findUnique({
         where: {
            email: adminData.email as string,
         },
      });

      if (existingUser) {
         throw new Error("User already exists!");
      }

      await auth.api.signUpEmail({
         body: adminData,
      });

      await prisma.user.update({
         where: {
            email: adminData.email as string,
         },
         data: {
            emailVerified: true,
         },
      });
   } catch (error) {
      console.error(error);
   } finally {
      await prisma.$disconnect();
   }
}

seedAdmin();
