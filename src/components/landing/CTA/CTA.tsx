import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const benefits = [
  { icon: Zap, text: "Setup in under 5 minutes" },
  { icon: Shield, text: "No long-term contracts" },
  { icon: Clock, text: "14-day free trial" }
];

const stats = [
  { value: "500+", label: "Websites Optimized" },
  { value: "127%", label: "Average Traffic Increase" },
  { value: "24/7", label: "AI Monitoring" }
];

export const CTA = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    if (email) {
      router.push(`/signup?email=${encodeURIComponent(email)}`);
    } else {
      router.push('/signup');
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/60 via-cyan-50/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Start growing your traffic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600">
                in the next 24 hours
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of websites already using AI to automate their SEO and drive organic growth.
            </p>

            {/* Premium Email Signup */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3 p-1 bg-white/90 backdrop-blur-xl rounded-xl border border-slate-200/50 shadow-xl shadow-slate-900/10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-transparent text-slate-900 placeholder-slate-500 border-0 focus:outline-none focus:ring-0 font-medium"
                />
                <Button
                  onClick={handleGetStarted}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-3 font-medium">
                Free trial • No credit card required
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-slate-600">
                  <benefit.icon className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Premium Trust Indicators */}
          <div className="border-t border-slate-200/50 pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 border border-emerald-200/50 flex items-center justify-center mb-3 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-slate-600">See improvements within 24 hours of setup</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200/50 flex items-center justify-center mb-3 shadow-sm">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">Enterprise Security</h3>
                <p className="text-sm text-slate-600">Bank-level encryption and data protection</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200/50 flex items-center justify-center mb-3 shadow-sm">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-slate-600">Advanced algorithms that learn and adapt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;