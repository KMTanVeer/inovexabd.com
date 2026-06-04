import React from 'react';
import { 
  Network, 
  Globe, 
  Server, 
  Cpu, 
  Database, 
  HardDrive, 
  Layers, 
  ShieldCheck, 
  Cable, 
  Compass, 
  Eye, 
  Award, 
  Users, 
  Headphones, 
  LineChart, 
  Building2, 
  GraduationCap, 
  Building, 
  Briefcase, 
  Boxes, 
  Wrench, 
  Flame,
  CheckCircle,
  Activity,
  Sparkles
} from 'lucide-react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function About() {
  const productsAndSolutions = [
    { name: 'Enterprise Networking Equipment', icon: Network, desc: 'High-performance core switches, edge switches, and modular chassis systems.' },
    { name: 'ISP Infrastructure Solutions', icon: Globe, desc: 'Carrier-grade routing, access, and distribution network technologies.' },
    { name: 'Dell PowerEdge Servers', icon: Server, desc: 'Enterprise rack servers configured for high density, reliability, and security.' },
    { name: 'Cisco Networking Solutions', icon: Cpu, desc: 'Enterprise and carrier switches, routers, and system components.' },
    { name: 'Huawei Networking Solutions', icon: Cpu, desc: 'Innovative and efficient routing, switching, and carrier WLAN.' },
    { name: 'Data Center Hardware', icon: Database, desc: 'Modular components, rack power, cooling interface systems, and mounts.' },
    { name: 'Storage Solutions', icon: HardDrive, desc: 'High-capacity enterprise SAS, SATA HDDs, SSDs, and storage arrays.' },
    { name: 'Fiber Optic Products', icon: Cable, desc: 'Transceivers, patch cords, media converters, and distribution units.' },
    { name: 'Network Security Solutions', icon: ShieldCheck, desc: 'Hardware firewalls, intrusion prevention systems, and unified threat management.' },
    { name: 'IT Infrastructure Components', icon: Layers, desc: 'Essential accessories, mounts, interface cards, and expansion modules.' }
  ];

  const whyChooseUs = [
    { 
      title: 'Quality Products', 
      desc: 'We source enterprise-grade equipment from trusted global technology brands.', 
      icon: Award,
      color: 'from-blue-500/10 to-cyan-500/10 text-blue-500'
    },
    { 
      title: 'Technical Expertise', 
      desc: 'Our team understands the requirements of ISPs, enterprises, and modern data center environments.', 
      icon: Users,
      color: 'from-purple-500/10 to-pink-500/10 text-purple-500'
    },
    { 
      title: 'Reliable Support', 
      desc: 'We are committed to providing responsive customer service and technical assistance.', 
      icon: Headphones,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-500'
    },
    { 
      title: 'Scalable Solutions', 
      desc: 'From small business networks to large-scale ISP deployments, we deliver solutions that grow with your needs.', 
      icon: LineChart,
      color: 'from-orange-500/10 to-amber-500/10 text-orange-500'
    }
  ];

  const industries = [
    { name: 'Internet Service Providers (ISPs)', icon: Globe },
    { name: 'Corporate Enterprises', icon: Briefcase },
    { name: 'Educational Institutions', icon: GraduationCap },
    { name: 'Government Organizations', icon: Building2 },
    { name: 'Data Centers', icon: Database },
    { name: 'System Integrators', icon: Boxes },
    { name: 'Small and Medium Businesses', icon: Building }
  ];

  const coreValues = [
    { title: 'Innovation', desc: 'Continuously exploring better technologies and solutions.', icon: Flame, color: 'text-orange-500 bg-orange-500/10' },
    { title: 'Integrity', desc: 'Building trust through transparency and professionalism.', icon: CheckCircle, color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Reliability', desc: 'Delivering dependable products and services.', icon: Activity, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Excellence', desc: 'Maintaining the highest standards in everything we do.', icon: Sparkles, color: 'text-purple-500 bg-purple-500/10' }
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden bg-white dark:bg-black">
      <SEO 
        title="About Us" 
        description="Empowering Connectivity, Infrastructure, and Innovation. InovexaBD is a trusted provider of ISP equipment, enterprise networking, servers, and data center hardware." 
      />

      {/* Decorative Glow Effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-40 right-1/4 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-6 max-w-6xl space-y-24">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest animate-pulse">
            <Sparkles size={12} />
            <span>Discover InovexaBD</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-wider text-black dark:text-white leading-tight">
            About Inovexa Technologies
          </h1>
          <p className="text-lg md:text-xl font-bold text-black/80 dark:text-white/80 tracking-wide max-w-3xl mx-auto">
            Empowering Connectivity, Infrastructure, and Innovation
          </p>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full my-6" />
          <div className="space-y-6 text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed font-light text-justify md:text-center max-w-3xl mx-auto">
            <p>
              InovexaBD is a Bangladesh-based technology solutions provider specializing in ISP equipment, 
              enterprise networking, server infrastructure, fiber optic solutions, and data center technologies.
            </p>
            <p>
              We help Internet Service Providers (ISPs), businesses, educational institutions, government 
              organizations, and enterprises build reliable, scalable, and high-performance IT infrastructure. 
              Our goal is to deliver trusted technology solutions that enable seamless connectivity, 
              efficient operations, and long-term growth.
            </p>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden bg-slate-50/50 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5 p-8 rounded-3xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 blur-[40px] rounded-full transition-all group-hover:scale-150" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500 shrink-0">
                <Compass size={28} />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wider text-black dark:text-white">Our Mission</h2>
            </div>
            <p className="text-black/60 dark:text-white/60 leading-relaxed font-light text-base">
              To deliver reliable, innovative, and cost-effective technology solutions that empower organizations 
              to build secure, scalable, and future-ready digital infrastructure.
            </p>
          </div>

          <div className="relative group overflow-hidden bg-slate-50/50 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5 p-8 rounded-3xl transition-all duration-300 hover:border-purple-500/30 dark:hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 dark:bg-purple-500/10 blur-[40px] rounded-full transition-all group-hover:scale-150" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-500 shrink-0">
                <Eye size={28} />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wider text-black dark:text-white">Our Vision</h2>
            </div>
            <p className="text-black/60 dark:text-white/60 leading-relaxed font-light text-base">
              To become one of Bangladesh's most trusted technology partners for enterprise networking, ISP infrastructure, 
              and data center solutions by continuously delivering excellence, innovation, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-black dark:text-white">What We Do</h2>
            <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto font-light">
              We provide a wide range of enterprise-grade technology products and solutions to meet diverse networking and infrastructure demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsAndSolutions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 text-blue-500 transition-all duration-300">
                    <Icon size={120} />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="space-y-2 relative z-10">
                      <h3 className="font-bold text-sm uppercase tracking-wider text-black/90 dark:text-white/90 group-hover:text-blue-500 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-center max-w-3xl mx-auto">
            <p className="text-black/70 dark:text-white/80 font-medium text-sm md:text-base leading-relaxed">
              We work with globally recognized technology brands to ensure quality, reliability, and performance for every deployment.
            </p>
          </div>
        </div>

        {/* Why Choose InovexaBD Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-black dark:text-white">Why Choose InovexaBD</h2>
            <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto font-light">
              We focus on delivering hardware excellence combined with experienced engineers to power your business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="flex gap-5 p-6 rounded-2xl bg-slate-50/30 dark:bg-zinc-900/10 border border-black/5 dark:border-white/5 transition-all hover:bg-slate-50/70 dark:hover:bg-zinc-900/20"
                >
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} shrink-0 h-fit`}>
                    <Icon size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg uppercase tracking-wide text-black dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-black/65 dark:text-white/55 text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industries We Serve */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-black dark:text-white">Industries We Serve</h2>
            <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto font-light">
              Our deployments power key sectors, ensuring mission-critical systems and network lines remain robust.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 text-black/70 dark:text-white/70 hover:text-blue-500 hover:border-blue-500/50 transition-all font-medium text-xs md:text-sm shadow-sm"
                >
                  <Icon size={16} className="text-blue-500" />
                  <span>{industry.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Core Values */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-black dark:text-white">Our Core Values</h2>
            <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto font-light">
              The fundamental principles that guide our relationships, client deliveries, and standards of operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 hover:border-blue-500/30 hover:shadow-lg transition-all text-center space-y-4"
                >
                  <div className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mx-auto shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-black dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed font-light">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commitment Section (Glass style) */}
        <div className="relative overflow-hidden p-8 md:p-12 rounded-3xl border border-black/10 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-950/40 backdrop-blur-md shadow-xl text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-black dark:text-white relative z-10">Our Commitment</h2>
          <p className="max-w-3xl mx-auto text-black/70 dark:text-white/70 leading-relaxed text-sm md:text-base font-light relative z-10">
            At InovexaBD, we believe that strong digital infrastructure is the foundation of modern business. 
            Whether it's enterprise networking, ISP deployment, server infrastructure, or data center expansion, 
            we are committed to helping organizations achieve their technology goals with confidence.
          </p>
        </div>

      </div>
    </div>
  );
}
