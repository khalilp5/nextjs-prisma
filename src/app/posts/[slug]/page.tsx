import prisma from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const postId = await prisma.posts.findMany({ select: { slug: true } });

  return postId.map((post) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: Props) => {
  if (!params.slug) throw new Error("Params ID not provided");

  const post = await prisma.posts.findUnique({ where: { slug: params.slug } });

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1 className="font-bold text-2xl mb-4">{post.title}</h1>
      <small className="block">
        Published at: {new Date(post.createdAt).toDateString()}
      </small>
      <small>Updated at: {new Date(post.updatedAt).toDateString()}</small>
      <hr className="my-3" />
      <p>{post.content}</p>
      <hr className="my-3" />
      <Link className="text-blue-500 underline" href={"/"}>
        Go Back
      </Link>
    </article>
  );
};

export default PostPage;
