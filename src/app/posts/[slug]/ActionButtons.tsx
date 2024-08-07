"use client";

import { deletePost } from "@/actions/postActions";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = { post: Prisma.PostsGetPayload<null> };

const ActionButtons = ({ post }: Props) => {
  const router = useRouter();
  return (
    <>
      <Button
        className="rounded-full"
        variant="default"
        onClick={() => {
          router.push(`/posts/form/?id=${post.id}`);
        }}
      >
        <Edit />
      </Button>
      <Button
        onClick={async () => {
          await deletePost(post.id);
        }}
        className="rounded-full"
        variant="destructive"
      >
        <Trash />
      </Button>
    </>
  );
};

export default ActionButtons;
