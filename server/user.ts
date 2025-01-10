"use server";

import { User, UserDraft, type UserSchema } from "@/domain/models";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { z } from "zod";

export const storeItem = async (prams: z.infer<typeof UserSchema>) => {
  try {
    const user = User.create(prams);
    const data = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (data) {
      await prisma.user.update({
        data: user.toDB(),
        where: { id: data.id },
      });
    } else {
      await prisma.user.create({
        data: user.toDB(),
      });
    }
  } catch (err) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new Error("Item already exists");
      }
    }
    throw new Error("Failed to store item");
  }
};
