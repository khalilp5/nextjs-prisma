import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";
import ActionButtons from "./ActionButtons";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;

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
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl mb-4">{post.title}</h1>
          <small className="block">
            Published at: {new Date(post.createdAt).toDateString()}
          </small>
          <small>Updated at: {new Date(post.updatedAt).toDateString()}</small>
        </div>
        <div className="flex gap-2">
          <ActionButtons post={post} />
        </div>
      </div>
      <hr className="my-3" />
      <p>{post.content}</p>
      <hr className="my-3" />
      <Link className="text-blue-500 underline" href={"/posts/"}>
        Go Back
      </Link>
    </article>
  );
};

export default PostPage;
