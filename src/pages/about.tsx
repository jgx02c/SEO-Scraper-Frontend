import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Scope Labs | AI-Powered Digital Competition Analysis</title>
        <meta 
          name="description" 
          content="Learn about Scope Labs, the innovative AI-powered platform revolutionizing digital competition analysis and business strategy."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />

        {/* Spacer to push content down */}
        <div className="h-32"></div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <Card className="bg-white max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">About Scope Labs</h1>
              
              <div className="space-y-8 text-gray-700">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                  <p className="mb-4">
                    Scope Labs is at the forefront of AI-driven digital intelligence, empowering businesses 
                    to transform competitive insights into actionable strategies. We leverage cutting-edge 
                    artificial intelligence to provide comprehensive market analysis, content optimization, 
                    and automated business intelligence.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
                  <p>
                    Founded by a team of technology enthusiasts and digital strategy experts, Scope Labs 
                    emerged from a fundamental challenge in the digital marketplace: the need for real-time, 
                    intelligent competitive analysis. We recognized that businesses struggle to keep pace 
                    with rapidly changing digital landscapes, and traditional analysis methods were 
                    becoming obsolete.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Technology</h2>
                  <p>
                    Our proprietary AI algorithms analyze vast amounts of digital data, providing insights 
                    that go beyond traditional analytics. From competitor tracking to content optimization 
                    and automated campaign management, we turn complex data into clear, actionable 
                    intelligence.
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
                    <li>Advanced Competitor Analysis</li>
                    <li>AI-Powered Content Generation</li>
                    <li>Real-Time Market Intelligence</li>
                    <li>Automated Digital Strategy Optimization</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-xl text-indigo-600 mb-2">Innovation</h3>
                      <p className="text-gray-700">Continuously pushing the boundaries of AI and digital intelligence.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-xl text-indigo-600 mb-2">Transparency</h3>
                      <p className="text-gray-700">Providing clear, honest, and actionable insights for our clients.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-xl text-indigo-600 mb-2">Client-Centric</h3>
                      <p className="text-gray-700">Tailoring our solutions to meet the unique needs of each business.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-xl text-indigo-600 mb-2">Continuous Learning</h3>
                      <p className="text-gray-700">Evolving our AI to stay ahead of the digital transformation curve.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get In Touch</h2>
                  <div className="bg-indigo-100 p-6 rounded-lg border border-indigo-200">
                    <p className="text-xl mb-4 text-gray-900">
                      Interested in revolutionizing your digital strategy?
                    </p>
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold text-gray-900">Email:</span>{' '}
                        <a 
                          href="mailto:contact@scopelabsai.com" 
                          className="text-indigo-600 hover:underline"
                        >
                          contact@scopelabsai.com
                        </a>
                      </p>
                      <p className="text-gray-700">
                        We're always excited to explore how our AI-powered solutions can 
                        transform your business strategy.
                      </p>
                    </div>
                  </div>
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

export default AboutPage;