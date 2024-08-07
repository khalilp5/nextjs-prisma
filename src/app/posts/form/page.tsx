import React from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/button";
import { createPost, editPost } from "@/actions/postActions";
import { NextPage } from "next";
import prisma from "@/lib/db";
import Link from "next/link";

const PostForm: NextPage<{ searchParams: Record<string, unknown> }> = async ({
  searchParams,
}) => {
  const id = searchParams["id"] as string;
  const post = id ? await prisma.posts.findUnique({ where: { id } }) : null;

  return (
    <div className="mt-4">
      <h1 className="font-bold text-xl mb-2">
        {post ? "Edit" : "Create"} Post
      </h1>
      <form
        action={async (formData) => {
          "use server";
          post ? await editPost(formData, id) : await createPost(formData);
        }}
        className="flex flex-col gap-3"
      >
        <Input
          name="title"
          type="text"
          placeholder="Enter Title"
          required
          defaultValue={post?.title}
        />
        <Textarea
          name="content"
          placeholder="Enter Body Content"
          required
          defaultValue={post?.content}
        />
        <Button type="submit">{post ? "Edit" : "Create"}</Button>
      </form>
      <hr className="my-2" />
      <Link href={post ? `/posts/${post?.slug}` : "/posts/"}>Go Back</Link>
    </div>
  );
};

export default PostForm;
