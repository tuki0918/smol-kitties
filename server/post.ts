"use server";

import { Post, type PostSchema } from "@/domain/models";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { z } from "zod";

export const storeItem = async (prams: z.infer<typeof PostSchema>) => {
  try {
    const post = Post.create(prams);
    const data = await prisma.post.findUnique({
      where: { id: post.id },
    });

    if (data) {
      await prisma.post.update({
        data: {
          likes: data.likes + 5,
        },
        where: { id: data.id },
      });
    } else {
      await prisma.post.create({
        data: post.toDB(),
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
