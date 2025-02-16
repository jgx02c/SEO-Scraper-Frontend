import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";

const TermsOfServicePage = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | Scope Labs</title>
        <meta 
          name="description" 
          content="Scope Labs Terms of Service - Conditions of use for our AI-powered digital intelligence platform."
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
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

              <div className="space-y-6 text-gray-700">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using Scope Labs' services, you agree to be bound by these Terms 
                    of Service. If you do not agree to these terms, you may not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                  <p>
                    Scope Labs provides AI-powered digital intelligence and competitive analysis 
                    services. We reserve the right to modify, suspend, or discontinue any part of 
                    our service at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                    <li>You agree to accept responsibility for all activities under your account</li>
                    <li>Scope Labs reserves the right to terminate accounts at our discretion</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Conduct</h2>
                  <p>
                    When using Scope Labs services, you agree not to:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on the rights of others</li>
                    <li>Upload harmful or malicious content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the service for any illegal or unauthorized purpose</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
                  <p>
                    All content, features, and functionality are and will remain the exclusive 
                    property of Scope Labs. Our trademarks and trade dress may not be used without 
                    our prior written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                  <p>
                    Scope Labs shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, including without limitation, loss of 
                    profits, data, use, or other intangible losses.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Pricing and Payments</h2>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Pricing for our services is subject to change with reasonable notice</li>
                    <li>Payment terms are specified in our separate billing agreements</li>
                    <li>All fees are non-refundable unless otherwise specified</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Dispute Resolution</h2>
                  <p>
                    Any disputes arising from these terms shall be resolved through binding 
                    arbitration in accordance with the rules of the American Arbitration Association.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
                  <p>
                    Scope Labs reserves the right to modify these Terms of Service at any time. 
                    Continued use of the service after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
                  <p>
                    For any questions about these Terms of Service, please contact us at:
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

export default TermsOfServicePage;