import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Head from "next/head";
import BackgroundPattern from "@/components/layout/background";
import { Bot, Code, Brain, Users, Rocket, FileSearch, Laptop, Briefcase, Building2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const jobListings = [
  {
    id: 'ai-1',
    title: 'AI Research Engineer',
    department: 'AI Development',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    icon: Brain,
    linkedinUrl: 'https://linkedin.com/...',
    description: 'Building next-generation SEO intelligence algorithms'
  },
  {
    id: 'ai-2',
    title: 'Machine Learning Engineer',
    department: 'AI Development',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    icon: Bot,
    linkedinUrl: 'https://linkedin.com/...',
    description: 'Developing AI agents for platform integration'
  },
  {
    id: 'eng-1',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    icon: Laptop,
    linkedinUrl: 'https://linkedin.com/...',
    description: 'Building seamless platform integration systems'
  },
  {
    id: 'eng-2',
    title: 'Platform Integration Specialist',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    icon: Code,
    linkedinUrl: 'https://linkedin.com/...',
    description: 'Creating multi-platform deployment solutions'
  },
  {
    id: 'product-1',
    title: 'Product Strategist',
    department: 'Product',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    icon: Rocket,
    linkedinUrl: 'https://linkedin.com/...',
    description: 'Shaping the future of AI SEO teams'
  },
  {
    id: 'sales-1',
    title: 'Enterprise Solutions Consultant',
    department: 'Sales',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    icon: Building2,
    linkedinUrl: 'https://linkedin.com/...',
    description: 'Helping enterprises deploy AI teams'
  }
];

const CareersPage = () => {
  const jobsByDepartment = jobListings.reduce((acc, job) => {
    if (!acc[job.department]) {
      acc[job.department] = [];
    }
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, typeof jobListings>);

  return (
    <>
      <Head>
        <title>Careers at Scope Labs | Join Our AI Revolution</title>
        <meta 
          name="description" 
          content="Join Scope Labs in revolutionizing SEO through AI team integration. Help us build the future of digital optimization."
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
                  <span>Join Our Team</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Build the Future of AI Teams
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Help us revolutionize how businesses optimize their digital presence through AI-powered teams and seamless integration.
                </p>
              </div>

              {/* Mission Statement */}
              <div className="relative overflow-hidden rounded-lg mb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Why Join Scope Labs?</h2>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Rocket className="w-6 h-6 text-indigo-400" />
                      </div>
                      <h3 className="text-white font-medium mb-2">Innovation First</h3>
                      <p className="text-gray-400">Work on cutting-edge AI technology that's changing the industry</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-indigo-400" />
                      </div>
                      <h3 className="text-white font-medium mb-2">Remote-First</h3>
                      <p className="text-gray-400">Work from anywhere with our distributed global team</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-6 h-6 text-indigo-400" />
                      </div>
                      <h3 className="text-white font-medium mb-2">Continuous Growth</h3>
                      <p className="text-gray-400">Learn and grow with industry-leading experts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              {Object.entries(jobsByDepartment).map(([department, jobs]) => (
                <div key={department} className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">{department}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {jobs.map((job) => {
                      const Icon = job.icon;
                      return (
                        <div key={job.id} className="relative overflow-hidden rounded-lg group">
                          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5 group-hover:from-indigo-600/10 group-hover:to-blue-600/10 transition-all duration-300" />
                          <div className="absolute inset-0 border border-gray-700/50 group-hover:border-indigo-500/50 rounded-lg transition-all duration-300" />
                          <div className="relative p-6">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-2 rounded-lg bg-gray-800">
                                <Icon className="w-5 h-5 text-indigo-400" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                                <p className="text-gray-400">{job.location}</p>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-6">{job.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">{job.type}</span>
                              <a 
                                href={job.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="bg-indigo-600 hover:bg-indigo-500">
                                  Apply Now
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Contact Section */}
              <div className="relative overflow-hidden rounded-lg mt-12">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10" />
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                <div className="relative p-8 text-center">
                  <FileSearch className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">Don't See Your Perfect Role?</h2>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    We're always looking for exceptional talent to join our mission. 
                    If you're passionate about AI and SEO, we'd love to hear from you.
                  </p>
                  <a 
                    href="mailto:careers@scopelabsai.com"
                    className="inline-block"
                  >
                    <Button className="bg-indigo-600 hover:bg-indigo-500">
                      Send Your Resume
                    </Button>
                  </a>
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

export default CareersPage;