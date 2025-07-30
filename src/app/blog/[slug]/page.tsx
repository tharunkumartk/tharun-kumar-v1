import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <a
          href="/blog"
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to Blog
        </a>
      </div>

      <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Slug:</strong> {post.slug}
            </div>
            <div>
              <strong>Timestamp:</strong>{" "}
              {new Date(post.timestamp).toLocaleString()}
            </div>
            <div>
              <strong>Image URL:</strong> {post.imageUrl}
            </div>
            <div>
              <strong>Tags:</strong> {post.tags.join(", ")}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-xl mb-3">Summary:</h2>
          <p className="text-gray-700 bg-blue-50 p-4 rounded border-l-4 border-blue-200">
            {post.summary}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-xl mb-3">Content:</h2>
          <div
            className="prose max-w-none bg-gray-50 p-6 rounded border"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="font-semibold text-xl mb-3">Raw Data Dump:</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(post, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
