"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import slugify from "slugify";

export const createPost = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  const post = await prisma.posts.create({
    data: {
      content,
      title,
      slug: slugify(title, { lower: true, trim: true }),
      published: false,
    },
  });
  revalidatePath("/posts/");
  redirect(`/posts/${post.slug}`);
};

export const editPost = async (formData: FormData, id: string) => {
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  const post = await prisma.posts.update({
    where: {
      id,
    },
    data: {
      content,
      title,
    },
  });
  revalidatePath(`/posts/${post.slug}`);
  redirect(`/posts/${post.slug}`);
};

export const deletePost = async (id: string) => {
  await prisma.posts.delete({ where: { id: id } });
  redirect("/posts/", RedirectType.replace);
};
