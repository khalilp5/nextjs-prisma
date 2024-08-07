import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const count = await prisma.posts.count();
  const posts = await prisma.posts.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">All Posts ({count})</h1>
        <Link href={"/posts/form/"}>
          <Button variant="default" className="rounded-full">
            <Plus />
          </Button>
        </Link>
      </div>
      <hr className="mt-4" />
      <div className="flex flex-col divide-y-[1px]">
        {posts.map((post, index) => (
          <Link
            className="p-4 underline text-blue-500"
            key={post.id}
            href={{
              pathname: `posts/${post.slug}`,
            }}
          >
            {index + 1} - {post.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
