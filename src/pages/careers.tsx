import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";
import { Briefcase, Palette, MessageCircle, Code, Database, Megaphone } from "lucide-react";

// Job listing type
type JobListing = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  icon: React.ElementType;
  linkedinUrl: string;
};

// Array of job listings
const jobListings: JobListing[] = [
  // Software Engineering Roles
  {
    id: 'se-1',
    title: 'Senior Full-Stack Engineer',
    department: 'Software Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    icon: Code,
    linkedinUrl: 'https://www.linkedin.com/jobs/view/senior-full-stack-engineer-at-scope-labs-3//'
  },
  {
    id: 'se-2',
    title: 'AI Machine Learning Engineer',
    department: 'Software Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    icon: Database,
    linkedinUrl: 'https://www.linkedin.com/jobs/view/ai-ml-engineer-at-scope-labs-3//'
  },
  
  // Design Roles
  {
    id: 'design-1',
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    icon: Palette,
    linkedinUrl: 'https://www.linkedin.com/jobs/view/product-designer-at-scope-labs-3//'
  },
  {
    id: 'design-2',
    title: 'UX Research Specialist',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    icon: Palette,
    linkedinUrl: 'https://www.linkedin.com/jobs/view/ux-researcher-at-scope-labs-3//'
  },
  
  // Marketing Roles
  {
    id: 'marketing-1',
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco, CA',
    type: 'Full-time',
    icon: Megaphone,
    linkedinUrl: 'https://www.linkedin.com/jobs/view/digital-marketing-manager-at-scope-labs-3//'
  },
  {
    id: 'marketing-2',
    title: 'Content Strategy Lead',
    department: 'Marketing',
    location: 'San Francisco, CA',
    type: 'Full-time',
    icon: MessageCircle,
    linkedinUrl: 'https://www.linkedin.com/jobs/view/content-strategy-lead-at-scope-labs-3//'
  },
  
  // Sales Roles
  {
    id: 'sales-1',
    title: 'Enterprise Sales Representative',
    department: 'Sales',
    location: 'San Francisco, CA',
    type: 'Full-time',
    icon: Briefcase,
    linkedinUrl: 'https://www.linkedin.com/jobs/view/enterprise-sales-rep-at-scope-labs-3//'
  }
];

const CareersPage = () => {
  // Group jobs by department
  const jobsByDepartment = jobListings.reduce((acc, job) => {
    if (!acc[job.department]) {
      acc[job.department] = [];
    }
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, JobListing[]>);

  return (
    <>
      <Head>
        <title>Careers at Scope Labs | Join Our Team</title>
        <meta 
          name="description" 
          content="Explore exciting career opportunities at Scope Labs. We're looking for talented individuals to help us revolutionize digital intelligence."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />

        {/* Spacer to push content down */}
        <div className="h-32"></div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <Card className="bg-white max-w-5xl mx-auto shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Careers at Scope Labs</h1>
              
              <div className="space-y-8 text-gray-700">
                <section>
                  <p className="mb-6">
                    At Scope Labs, we're building the future of AI-driven digital intelligence. 
                    We're looking for passionate, innovative individuals who want to make a significant 
                    impact in the world of technology and business strategy.
                  </p>

                  {Object.entries(jobsByDepartment).map(([department, jobs]) => (
                    <div key={department} className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{department} Opportunities</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {jobs.map((job) => {
                          const Icon = job.icon;
                          return (
                            <div 
                              key={job.id} 
                              className="bg-gray-100 p-4 rounded-lg border border-gray-200 hover:border-indigo-600 transition-all"
                            >
                              <div className="flex items-center mb-3">
                                <Icon className="h-6 w-6 text-indigo-600 mr-3" />
                                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                              </div>
                              <div className="space-y-2 text-gray-600">
                                <p>{job.location}</p>
                                <p>{job.type}</p>
                                <a 
                                  href={job.linkedinUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                  Apply on LinkedIn
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </section>

                <section className="bg-indigo-100 p-6 rounded-lg border border-indigo-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Don't See Your Perfect Role?</h2>
                  <p className="mb-4 text-gray-700">
                    We're always looking for talented individuals who are passionate about 
                    technology and innovation. Even if you don't see an exact match, we'd love 
                    to hear from you.
                  </p>
                  <a 
                    href="mailto:contact@scopelabsai.com" 
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Send Your Resume
                  </a>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CareersPage;