import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Head from "next/head";
import BackgroundPattern from "@/components/layout/background";
import { Bot, Rocket, Brain, Users, Building2, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Scope Labs | AI SEO Team Integration</title>
        <meta 
          name="description" 
          content="Learn about Scope Labs' innovative AI SEO team that seamlessly integrates with your existing website to deliver expert optimization and ranking improvements."
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
                  <span>Our Story</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Building the Future of SEO Teams
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  We're revolutionizing how businesses approach SEO by creating AI-powered teams that seamlessly integrate with your existing platform.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="relative overflow-hidden rounded-lg mb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-900/50">
                          <Rocket className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                      </div>
                      <p className="text-gray-300">
                        To empower businesses with AI-powered SEO teams that deliver enterprise-level 
                        optimization without the complexity of traditional solutions. We believe every 
                        website deserves expert SEO, regardless of its platform or size.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-900/50">
                          <Brain className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Our Vision</h2>
                      </div>
                      <p className="text-gray-300">
                        To create a world where every business has access to advanced SEO expertise 
                        through seamlessly integrated AI teams that continuously optimize and improve 
                        their digital presence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Teams */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-600/10" />
                  <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                  <div className="relative p-6">
                    <Bot className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Technical Team</h3>
                    <p className="text-gray-300">Expert AI agents focused on technical SEO optimization and performance improvements.</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-green-600/10" />
                  <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                  <div className="relative p-6">
                    <Users className="w-8 h-8 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Content Team</h3>
                    <p className="text-gray-300">AI specialists in content analysis, optimization, and strategic recommendations.</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-600/10" />
                  <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                  <div className="relative p-6">
                    <Zap className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Strategy Team</h3>
                    <p className="text-gray-300">Intelligence agents providing competitive analysis and market insights.</p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="relative overflow-hidden rounded-lg mb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8">
                  <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Values</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative p-6 rounded-lg">
                      <div className="absolute inset-0 bg-gray-800/50 rounded-lg" />
                      <div className="relative flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-blue-900/50">
                          <Rocket className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                          <p className="text-gray-300">Pushing the boundaries of AI integration and SEO automation.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6 rounded-lg">
                      <div className="absolute inset-0 bg-gray-800/50 rounded-lg" />
                      <div className="relative flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-green-900/50">
                          <Users className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">Accessibility</h3>
                          <p className="text-gray-300">Making expert SEO available to businesses of all sizes.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6 rounded-lg">
                      <div className="absolute inset-0 bg-gray-800/50 rounded-lg" />
                      <div className="relative flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-purple-900/50">
                          <Building2 className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">Integration</h3>
                          <p className="text-gray-300">Seamlessly working with existing platforms and workflows.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6 rounded-lg">
                      <div className="absolute inset-0 bg-gray-800/50 rounded-lg" />
                      <div className="relative flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-orange-900/50">
                          <Zap className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">Results</h3>
                          <p className="text-gray-300">Delivering measurable improvements and real impact.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your SEO?</h2>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Deploy your AI SEO team today and start seeing real improvements in your website's performance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-indigo-600 hover:bg-indigo-500">
                      Deploy Your Team
                    </Button>
                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      Schedule a Demo
                    </Button>
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

export default AboutPage;