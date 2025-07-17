import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

type PageProps = { params: { id: string } };

async function getBlog(id: string) {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
  if (!res.ok) return null;
  const blogs = await res.json();
  return blogs.find((b: any) => b._id === id);
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await getBlog(params.id);

  if (!blog) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center text-gray-500 text-sm mb-6">
        <span>By {blog.author || 'Admin'}</span>
        <span className="mx-2">|</span>
        <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</span>
      </div>
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />
      )}
      <p className="text-lg text-gray-700 mb-6">{blog.description}</p>
      <article
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </main>
  );
} 