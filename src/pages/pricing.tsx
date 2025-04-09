import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Head from "next/head";
import { Check, X, Bot, Zap, Users, Building2, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundPattern from "@/components/layout/background";

const plans = [
  {
    name: "Startup Team",
    price: 149,
    billingPeriod: "month",
    description: "Perfect for small businesses ready to scale",
    teamSize: "1-2 AI Agents",
    color: "from-blue-400/10 to-blue-600/10",
    features: [
      "Technical SEO Agent",
      "Content Analysis Agent",
      "Basic Competitor Tracking",
      "Single Platform Integration",
      "Monthly Strategy Updates",
      "8/5 AI Support"
    ],
    unavailableFeatures: [
      "SEO Intelligence Agent",
      "Multi-Platform Support",
      "Advanced AI Recommendations",
      "24/7 Priority Support"
    ],
    icon: Users
  },
  {
    name: "Growth Team",
    price: 299,
    billingPeriod: "month",
    description: "Ideal for growing businesses needing comprehensive optimization",
    teamSize: "3-5 AI Agents",
    color: "from-indigo-400/10 to-indigo-600/10",
    features: [
      "Technical SEO Agent",
      "SEO Intelligence Agent",
      "Content Analysis Agent",
      "Competitor Analysis Agent",
      "Multi-Platform Support",
      "Weekly Strategy Updates",
      "Advanced AI Recommendations",
      "24/7 AI Support"
    ],
    unavailableFeatures: [
      "Custom AI Agent Development",
      "Enterprise Integration",
      "Dedicated Success Manager"
    ],
    recommended: true,
    icon: Zap
  },
  {
    name: "Enterprise Team",
    price: "Custom",
    description: "Full-scale AI team for enterprise needs",
    teamSize: "Unlimited AI Agents",
    color: "from-purple-400/10 to-purple-600/10",
    features: [
      "Custom AI Agent Development",
      "Unlimited Platform Support",
      "Enterprise-Grade Integration",
      "Advanced Security Features",
      "Custom Reporting",
      "Dedicated Success Manager",
      "Priority 24/7 Support",
      "Custom Training & Onboarding"
    ],
    unavailableFeatures: [],
    icon: Building2
  }
];

const integrations = [
  "Shopify", "WordPress", "Wix", "Squarespace", "Webflow", "Custom Platforms"
];

const PricingPage = () => {
  return (
    <>
      <Head>
        <title>AI Team Pricing | Scope Labs</title>
        <meta 
          name="description" 
          content="Deploy your AI SEO team with Scope Labs. Choose the perfect team size and capabilities for your business needs."
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
                  <span>AI Team Pricing</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Choose Your AI Team
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Select the perfect AI team size and capabilities for your business. 
                  Scale your team as you grow.
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {plans.map((plan) => (
                  <div key={plan.name} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-lg" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${plan.color} rounded-lg`} />
                    <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
                    {plan.recommended && (
                      <div className="absolute -top-4 left-0 right-0 text-center">
                        <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="relative p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-2 rounded-lg bg-gray-800">
                          <plan.icon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                          <p className="text-gray-400">{plan.teamSize}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-baseline">
                          {plan.price === "Custom" ? (
                            <span className="text-4xl font-bold text-white">Custom</span>
                          ) : (
                            <>
                              <span className="text-4xl font-bold text-white">${plan.price}</span>
                              <span className="text-gray-400 ml-2">/{plan.billingPeriod}</span>
                            </>
                          )}
                        </div>
                        <p className="text-gray-400 mt-2">{plan.description}</p>
                      </div>

                      <div className="flex-grow">
                        <div className="space-y-3 mb-6">
                          {plan.features.map((feature) => (
                            <div key={feature} className="flex items-center text-gray-300">
                              <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {plan.unavailableFeatures.map((feature) => (
                            <div key={feature} className="flex items-center text-gray-500">
                              <X className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className={`w-full ${
                          plan.recommended 
                            ? 'bg-indigo-600 hover:bg-indigo-500' 
                            : 'bg-gray-800 hover:bg-gray-700'
                        } inline-flex items-center justify-center`}
                      >
                        {plan.price === "Custom" ? "Contact Sales" : "Deploy Your Team"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform Support */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
                <div className="absolute inset-0 border border-gray-700/50" />
                <div className="relative p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-2 rounded-lg bg-gray-800">
                      <Globe className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Platform Support</h3>
                      <p className="text-gray-400">Seamless integration with your existing platform</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {integrations.map((platform) => (
                      <div key={platform} className="relative p-4 rounded-lg text-center">
                        <div className="absolute inset-0 bg-gray-800/50 rounded-lg" />
                        <div className="relative">
                          <span className="text-gray-300">{platform}</span>
                        </div>
                      </div>
                    ))}
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

export default PricingPage;