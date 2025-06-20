// pages/index.tsx
import Head from "next/head";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import BackgroundPattern from "@/components/layout/background";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Scope Labs | SEO Analysis & Website Optimization Tools</title>
        <meta 
          name="description" 
          content="Professional SEO analysis and website optimization tools for businesses and agencies. Comprehensive audits, performance tracking, and growth insights."
        />
        <meta 
          name="keywords" 
          content="SEO analysis, website optimization, SEO audit, performance tracking, SEO tools"
        />
        <link rel="canonical" href="https://scopelabs.ai" />
      </Head>

      <div className="relative min-h-screen overflow-x-hidden">
        {/* Background Pattern */}
        <BackgroundPattern />
        
        {/* Content Container */}
        <div className="relative z-10">
          <Header />
          <Hero />
        </div>
      </div>
    </>
  );
};

export default HomePage;