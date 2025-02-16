import { useRouter } from 'next/router';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Tag, Clock, ArrowLeft } from 'lucide-react';

import blogPosts from '@/data/blogs.json';
import { BlogPost } from '@/types/blog';

const BlogPostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  // Find the specific blog post
  const post = blogPosts.find((p: BlogPost) => p.id === postId);

  // If no post is found, return a 404
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <h1 className="text-3xl text-white">Blog Post Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Scope Labs Blog</title>
        <meta 
          name="description" 
          content={post.excerpt}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />

        {/* Spacer to push content down */}
        <div className="h-32"></div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <Card className="bg-white max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-8 md:p-12">
              {/* Back to Blog Link */}
              <Link 
                href="/blog" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog
              </Link>

              {/* Blog Post Header */}
              {post.coverImage && (
                <div 
                  className="h-96 bg-cover bg-center rounded-lg mb-8"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                />
              )}

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

              {/* Post Metadata */}
              <div className="flex items-center justify-between text-gray-600 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gray-700" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-700" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      <Tag className="h-3 w-3 inline-block mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900">
                <ReactMarkdown 
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostDetail;