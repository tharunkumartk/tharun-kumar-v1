import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import { estimateReadTime, formatDate } from "@/lib/utils";
import BackButton from "@/app/components/blog/BackButton";
import MarkdownContent from "@/app/components/blog/MarkdownContent";
import FooterColumn from "@/app/components/landing/FooterColumn";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 md:px-12 lg:px-16 py-16 space-y-16">
        <div className="flex items-center justify-between mb-16">
          <BackButton href="/blog" title="Blog" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row text-xs sm:text-sm text-stone-600 dark:text-stone-400 space-x-4 mt-auto ">
            <span>{formatDate(post.timestamp)}</span>
            <span>{estimateReadTime(post.content)} min read</span>
          </div>
          <h1
            className="font-regular text-stone-900 dark:text-stone-100 mb-2 opacity-0 animate-fadeIn text-center"
            style={{
              fontSize: "60px",
              animationDelay: "0ms",
              animationFillMode: "forwards",
            }}
          >
            {post.title}
          </h1>
          <div
            className="mt-4 text-stone-600 dark:text-stone-400 transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn text-center max-w-3xl "
            style={{
              fontSize: "18px",
              animationDelay: "200ms",
              animationFillMode: "forwards",
            }}
          >
            {post.summary}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-xl flex-shrink-0 w-full h-[400px] object-cover opacity-0 animate-fadeIn"
            style={{
              animationDelay: "400ms",
              animationFillMode: "forwards",
            }}
          />
        </div>
        <div
          className="opacity-0 animate-fadeIn"
          style={{
            animationDelay: "600ms",
            animationFillMode: "forwards",
          }}
        >
          <MarkdownContent content={post.content} />
        </div>
        <FooterColumn />
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.imageUrl],
    },
  };
}
