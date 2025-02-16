import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Scope Labs</title>
        <meta 
          name="description" 
          content="Scope Labs privacy policy - How we collect, use, and protect your personal information."
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
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

              <div className="space-y-6 text-gray-700">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                  <p>
                    At Scope Labs, we are committed to protecting your privacy. We collect information 
                    that is necessary to provide and improve our services. This may include:
                  </p>
                  <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                    <li>Personal identification information (Name, email address, phone number)</li>
                    <li>Usage data (IP address, browser type, pages visited)</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <p>
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                    <li>Providing and maintaining our service</li>
                    <li>Notifying you about changes to our service</li>
                    <li>Allowing you to participate in interactive features</li>
                    <li>Providing customer support</li>
                    <li>Gathering analysis or valuable information to improve our service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Protection</h2>
                  <p>
                    We implement a variety of security measures to maintain the safety of your personal 
                    information:
                  </p>
                  <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                    <li>Encryption of sensitive data</li>
                    <li>Regular security audits</li>
                    <li>Restricted access to personal information</li>
                    <li>Secure server infrastructure</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our 
                    website. You can instruct your browser to refuse all cookies or to indicate when a 
                    cookie is being sent.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
                  <p>
                    We may use third-party services that collect, monitor, and analyze data. These 
                    services may use cookies and similar technologies to perform their services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                  <p>
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                    <li>Access your personal data</li>
                    <li>Request correction of your personal data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request restriction of processing your personal data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicyPage;