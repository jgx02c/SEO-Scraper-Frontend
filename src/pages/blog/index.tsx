import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";
import Link from 'next/link';
import { BookOpen, Tag, Clock } from 'lucide-react';

import blogPosts from '@/data/blogs.json';
import { BlogPost } from '@/types/blog';

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags from all blog posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <>
      <Head>
        <title>Scope Labs Blog | AI and Digital Strategy Insights</title>
        <meta 
          name="description" 
          content="Explore cutting-edge insights on AI, digital marketing, and competitive intelligence from Scope Labs experts."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />

        {/* Spacer to push content down */}
        <div className="h-32"></div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Tag Filter */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Filter by Topic</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`
                    px-3 py-1 rounded-full text-sm
                    ${selectedTag === null 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                  `}
                >
                  All Posts
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${selectedTag === tag 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts List */}
            <div className="space-y-6">
              {filteredPosts.map((post: BlogPost) => (
                <Link 
                  href={`/blog/${post.id}`} 
                  key={post.id}
                  className="block"
                >
                  <Card className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {post.coverImage && (
                          <div 
                            className="w-48 h-36 flex-shrink-0 bg-cover bg-center rounded-lg"
                            style={{ backgroundImage: `url(${post.coverImage})` }}
                          />
                        )}
                        <div className="flex-grow">
                          <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          
                          <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-gray-700" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-700" />
                              <span>{post.readTime} min read</span>
                            </div>
                          </div>
                          
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
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;