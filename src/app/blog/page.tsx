import { getAllBlogPosts, BlogPost } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      <div className="space-y-8">
        {posts.map((post: BlogPost) => (
          <div
            key={post.slug}
            className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="text-sm text-gray-600 mb-2">
                <strong>Slug:</strong> {post.slug}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <strong>Timestamp:</strong>{" "}
                {new Date(post.timestamp).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <strong>Image URL:</strong> {post.imageUrl}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <strong>Tags:</strong> {post.tags.join(", ")}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Summary:</h3>
              <p className="text-gray-700">{post.summary}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Content (HTML):</h3>
              <div
                className="prose prose-sm max-w-none bg-gray-50 p-4 rounded border"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Raw Data Dump:</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(post, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500 text-center">No blog posts found.</p>
      )}
    </div>
  );
}
