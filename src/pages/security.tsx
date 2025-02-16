import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";
import { Shield, Lock, Server, Database, Network, Code } from "lucide-react";

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All sensitive data is encrypted both in transit and at rest using industry-standard AES-256 encryption."
    },
    {
      icon: Network,
      title: "Network Security",
      description: "Multi-layered network protection with advanced firewalls, intrusion detection, and prevention systems."
    },
    {
      icon: Database,
      title: "Data Protection",
      description: "Strict access controls, regular security audits, and comprehensive data backup strategies."
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Secure cloud infrastructure with redundant systems and continuous monitoring."
    },
    {
      icon: Code,
      title: "Code Security",
      description: "Rigorous code review processes, regular security testing, and continuous vulnerability assessments."
    }
  ];

  return (
    <>
      <Head>
        <title>Security | Scope Labs</title>
        <meta 
          name="description" 
          content="Scope Labs Security Commitment - Our comprehensive approach to protecting your data and ensuring system integrity."
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
              <div className="flex items-center mb-8">
                <Shield className="h-12 w-12 text-indigo-600 mr-4" />
                <h1 className="text-4xl font-bold text-gray-900">Security Commitment</h1>
              </div>

              <div className="space-y-6 text-gray-700">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Security Approach</h2>
                  <p className="mb-4">
                    At Scope Labs, security is not just a feature—it's our fundamental commitment. 
                    We implement a comprehensive, multi-layered security strategy to protect your 
                    data, infrastructure, and digital assets.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Core Security Features</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {securityFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div 
                          key={index} 
                          className="bg-gray-100 p-6 rounded-lg border border-gray-200 flex items-start"
                        >
                          <Icon className="h-8 w-8 text-indigo-600 mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Privacy</h2>
                  <p>
                    We are committed to protecting your personal and business data. Our privacy 
                    practices exceed industry standards, ensuring that your information remains 
                    confidential and secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compliance</h2>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>GDPR Compliant</li>
                    <li>SOC 2 Type II Certified</li>
                    <li>CCPA Regulations Adherence</li>
                    <li>Regular Third-Party Security Audits</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Incident Response</h2>
                  <p>
                    We maintain a robust incident response plan to quickly address and mitigate 
                    any potential security threats. Our dedicated security team is available 
                    24/7 to respond to and resolve any security concerns.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reporting Security Issues</h2>
                  <p>
                    If you discover a potential security vulnerability, please report it 
                    immediately to:
                  </p>
                  <p className="mt-2">
                    <strong>Email:</strong> support@scopelabsai.com
                  </p>
                </section>

                <section>
                  <p className="text-sm text-gray-600 mt-8">
                    Last updated: February 2025
                  </p>
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

export default SecurityPage;