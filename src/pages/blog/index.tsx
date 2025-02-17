import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Head from "next/head";
import Link from 'next/link';
import { BookOpen, Tag, Clock, Bot, Search, FileText } from 'lucide-react';
import BackgroundPattern from "@/components/layout/background";
import blogPosts from '@/data/blogs.json';
import { BlogPost } from '@/types/blog';

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <>
      <Head>
        <title>Scope Labs Blog | AI SEO Team Insights</title>
        <meta 
          name="description" 
          content="Explore insights about AI SEO teams, platform integration, and digital optimization strategies from Scope Labs experts."
        />
      </Head>

      <div className="relative min-h-screen">
        <BackgroundPattern />
        
        <div className="relative z-10">
          <Header />

          <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
                  <Bot className="w-4 h-4" />
                  <span>AI SEO Insights</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Latest from Our AI Team
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Discover strategies, insights, and success stories about AI-powered SEO teams and platform integration.
                </p>
              </div>

              {/* Tag Filter */}
              <div className="max-w-5xl mx-auto mb-12">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
                  <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                  <div className="relative p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Search className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-xl font-semibold text-white">Filter by Topic</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedTag === null 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        All Posts
                      </button>
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedTag === tag 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Posts List */}
              <div className="max-w-5xl mx-auto space-y-6">
                {filteredPosts.map((post: BlogPost) => (
                  <Link 
                    href={`/blog/${post.id}`} 
                    key={post.id}
                    className="block group"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5 group-hover:from-indigo-600/10 group-hover:to-blue-600/10 transition-all duration-300" />
                      <div className="absolute inset-0 border border-gray-700/50 group-hover:border-indigo-500/50 rounded-lg transition-all duration-300" />
                      <div className="relative p-6">
                        <div className="flex gap-6">
                          {post.coverImage && (
                            <div className="w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
                              <div 
                                className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                                style={{ backgroundImage: `url(${post.coverImage})` }}
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-gray-300 mb-4">{post.excerpt}</p>
                            
                            <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-indigo-400" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-indigo-400" />
                                <span>{post.readTime} min read</span>
                              </div>
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
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default BlogPage;