import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Head from "next/head";
import Link from 'next/link';
import { Bot, TrendingUp, Globe, ArrowRight, Building2, ShoppingCart, Newspaper, Briefcase } from 'lucide-react';
import BackgroundPattern from "@/components/layout/background";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    id: 'ecommerce-growth',
    title: 'Leading E-commerce Platform Sees 156% Growth',
    platform: 'Shopify',
    industry: 'E-commerce',
    duration: '6 months',
    stats: {
      traffic: '+156%',
      revenue: '+98%',
      rankings: '+203 keywords'
    },
    icon: ShoppingCart,
    color: 'from-green-400/10 to-green-600/10',
    iconColor: 'text-green-400',
    description: 'How our AI team integrated with Shopify to transform organic traffic and revenue.',
    coverImage: '/images/case-studies/ecommerce.jpg'
  },
  {
    id: 'saas-optimization',
    title: 'SaaS Company Doubles Organic Lead Generation',
    platform: 'WordPress',
    industry: 'Software',
    duration: '4 months',
    stats: {
      leads: '+112%',
      traffic: '+87%',
      conversion: '+45%'
    },
    icon: Building2,
    color: 'from-blue-400/10 to-blue-600/10',
    iconColor: 'text-blue-400',
    description: 'AI-powered optimization that transformed B2B lead generation strategy.',
    coverImage: '/images/case-studies/saas.jpg'
  },
  {
    id: 'news-traffic',
    title: 'News Site Achieves Record Traffic Growth',
    platform: 'Custom CMS',
    industry: 'Media',
    duration: '3 months',
    stats: {
      traffic: '+234%',
      engagement: '+76%',
      retention: '+45%'
    },
    icon: Newspaper,
    color: 'from-purple-400/10 to-purple-600/10',
    iconColor: 'text-purple-400',
    description: 'How AI content optimization drove unprecedented traffic growth.',
    coverImage: '/images/case-studies/news.jpg'
  },
  {
    id: 'agency-scaling',
    title: 'Marketing Agency Scales Client Results',
    platform: 'Multi-Platform',
    industry: 'Marketing',
    duration: '8 months',
    stats: {
      clients: '+12 new',
      retention: '98%',
      growth: '+156%'
    },
    icon: Briefcase,
    color: 'from-orange-400/10 to-orange-600/10',
    iconColor: 'text-orange-400',
    description: 'Agency deploys AI teams across multiple client websites.',
    coverImage: '/images/case-studies/agency.jpg'
  }
];

const CaseStudiesPage = () => {
  return (
    <>
      <Head>
        <title>Case Studies | Scope Labs AI SEO Success Stories</title>
        <meta 
          name="description" 
          content="Explore how businesses achieved remarkable growth with Scope Labs' AI SEO team integration across different platforms."
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
                  <span>Success Stories</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Real Results, Real Growth
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  See how businesses transformed their digital presence with our AI SEO team integration.
                </p>
              </div>

              {/* Stats Overview */}
              <div className="relative overflow-hidden rounded-lg mb-16">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8">
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">156%</div>
                      <div className="text-gray-400">Average Traffic Growth</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">98%</div>
                      <div className="text-gray-400">Client Retention</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">45+</div>
                      <div className="text-gray-400">Platforms Integrated</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">3.2x</div>
                      <div className="text-gray-400">Average ROI</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Studies Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {caseStudies.map((study) => {
                  const Icon = study.icon;
                  return (
                    <Link key={study.id} href={`/case-studies/${study.id}`} className="group">
                      <div className="relative overflow-hidden rounded-lg h-full">
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                        <div className={`absolute inset-0 bg-gradient-to-r ${study.color} group-hover:opacity-75 transition-opacity`} />
                        <div className="absolute inset-0 border border-gray-700/50 group-hover:border-gray-600 rounded-lg transition-colors" />
                        <div className="relative p-8">
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="p-2 rounded-lg bg-gray-800">
                              <Icon className={`w-6 h-6 ${study.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                  {study.title}
                                </h3>
                              </div>
                              <div className="flex items-center space-x-3 mt-1">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">{study.platform}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-6">
                            {study.description}
                          </p>

                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {Object.entries(study.stats).map(([key, value]) => (
                              <div key={key} className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="text-xl font-bold text-white mb-1">{value}</div>
                                <div className="text-sm text-gray-400 capitalize">{key}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                            <span className="mr-2">View Case Study</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Ready to Achieve Similar Results?</h2>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Deploy your AI SEO team today and start seeing real improvements in your website's performance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-indigo-600 hover:bg-indigo-500">
                      Start Free Trial
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

export default CaseStudiesPage;