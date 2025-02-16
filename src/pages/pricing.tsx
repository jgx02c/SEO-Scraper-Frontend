import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";
import { Check, X } from "lucide-react";

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: 49,
      description: "Perfect for small businesses and individual entrepreneurs",
      features: [
        "Competitor Tracking (1 Domain)",
        "Basic Content Analysis",
        "Monthly Performance Report",
        "Email Support"
      ],
      unavailableFeatures: [
        "Advanced AI Insights",
        "Multi-Domain Tracking",
        "Automated Campaign Optimization",
        "Priority Support"
      ]
    },
    {
      name: "Pro",
      price: 199,
      description: "Ideal for growing businesses seeking comprehensive insights",
      features: [
        "Competitor Tracking (5 Domains)",
        "Advanced Content Analysis",
        "Weekly Performance Reports",
        "AI-Powered Recommendations",
        "Email & Chat Support",
        "Automated Campaign Optimization"
      ],
      unavailableFeatures: [
        "Enterprise-Level Analytics",
        "Dedicated Account Manager",
        "Custom Integration"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations with complex needs",
      features: [
        "Unlimited Domain Tracking",
        "Comprehensive AI Insights",
        "Daily Performance Reports",
        "Advanced Content Generation",
        "Dedicated Account Manager",
        "Custom Integration",
        "Priority Enterprise Support"
      ],
      unavailableFeatures: []
    }
  ];

  return (
    <>
      <Head>
        <title>Pricing | Scope Labs AI Intelligence Platform</title>
        <meta 
          name="description" 
          content="Choose the perfect Scope Labs plan for your business. From startups to enterprises, we have flexible pricing to meet your digital intelligence needs."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />

        {/* Spacer to push content down */}
        <div className="h-32"></div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <Card className="bg-white max-w-6xl mx-auto shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Flexible plans designed to scale with your business. From startups to enterprises, 
                  we have a solution that fits your digital intelligence needs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div 
                    key={plan.name}
                    className={`
                      border rounded-lg p-6 
                      ${plan.recommended 
                        ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                        : 'border-gray-200 bg-white'}
                    `}
                  >
                    {plan.recommended && (
                      <div className="text-center bg-indigo-600 text-white py-1 -mt-6 -mx-6 mb-4 rounded-t-lg">
                        Most Popular
                      </div>
                    )}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h2>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price === "Custom" ? plan.price : `$${plan.price}`}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="text-gray-600 ml-2">/ month</span>
                      )}
                    </div>

                    <a 
                      href="#contact" 
                      className={`
                        block text-center w-full py-3 rounded-lg transition-colors
                        ${plan.recommended 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                      `}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </a>

                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center text-gray-700">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                        {plan.unavailableFeatures.map((feature) => (
                          <li key={feature} className="flex items-center text-gray-400">
                            <X className="h-5 w-5 text-red-400 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need a Custom Solution?</h2>
                <p className="text-gray-700 mb-6">
                  Every business is unique. If none of our standard plans meet your specific 
                  requirements, we're happy to create a tailored solution just for you.
                </p>
                <a 
                  href="mailto:sales@scopelabsai.com" 
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Contact Enterprise Sales
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PricingPage;