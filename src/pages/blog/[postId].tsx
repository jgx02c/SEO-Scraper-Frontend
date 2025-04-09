import { useRouter } from 'next/router';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Head from "next/head";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Tag, Clock, ArrowLeft, Bot } from 'lucide-react';
import BackgroundPattern from "@/components/layout/background";

import blogPosts from '@/data/blogs.json';
import { BlogPost } from '@/types/blog';

const BlogPostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;
  const post = blogPosts.find((p: BlogPost) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPattern />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl text-white mb-4">Blog Post Not Found</h1>
          <Link 
            href="/blog"
            className="text-indigo-400 hover:text-indigo-300 inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Scope Labs Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="relative min-h-screen">
        <BackgroundPattern />
        
        <div className="relative z-10">
          <Header />

          <div className="pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link 
                href="/blog" 
                className="inline-flex items-center text-gray-400 hover:text-white mb-8 group"
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>

              {/* Main Content Card */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8 md:p-12">
                  {/* Blog Header */}
                  <div className="mb-12">
                    <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-6 space-x-2">
                      <Bot className="w-4 h-4" />
                      <span>AI SEO Insights</span>
                    </div>

                    {post.coverImage && (
                      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url(${post.coverImage})` }}
                        />
                      </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-indigo-400" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-400" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                          >
                            <Tag className="h-3 w-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Blog Content */}
                  <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-blockquote:border-indigo-500 prose-pre:bg-gray-800">
                    <ReactMarkdown 
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-white mt-8 mb-4" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-300" {...props} />,
                        a: ({node, ...props}) => <a className="text-indigo-400 hover:text-indigo-300 transition-colors" {...props} />,
                        blockquote: ({node, ...props}) => (
                          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-300" {...props} />
                        ),
                        code: ({node, ...props}) => (
                          <code className="bg-gray-800 text-gray-300 px-1 py-0.5 rounded" {...props} />
                        ),
                        pre: ({node, ...props}) => (
                          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto" {...props} />
                        )
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default BlogPostDetail;