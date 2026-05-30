import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, Target, Users, Rocket } from 'lucide-react';
import { GlassContainer } from '@/src/components/common/GlassContainer.tsx';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Contact() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <SEO
        title="Contact Inovexa Technology"
        description="Contact Inovexa Technology for enterprise networking equipment, switches, routers, LAN cards, SSD storage, and data center infrastructure support."
        keywords="contact networking equipment supplier, enterprise it support, router supplier bangladesh, switch supplier dhaka"
        url="https://inovexabd.com/contact"
      />
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        {/* About Section */}
        <div className="max-w-4xl mx-auto space-y-12 mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white font-display"
          >
            About <span className="text-blue-600 dark:text-blue-500 underline decoration-blue-500/30 underline-offset-8">Inovexa</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-black/60 dark:text-white/60 leading-relaxed"
          >
            Inovexa Technology is a leading provider of next-generation IT infrastructure and enterprise networking solutions. Based in Dhaka, Bangladesh, we serve global clients with cutting-edge hardware and smart electronic systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Target, title: "Our Mission", desc: "To revolutionize IT infrastructure with smart, efficient, and scalable hardware solutions." },
            { icon: Users, title: "Our Community", desc: "Trusted by over 250+ enterprise partners and thousands of IT professionals worldwide." },
            { icon: Rocket, title: "Our Vision", desc: "To be the global benchmark for futuristic networking and computing hardware." }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i}>
                <GlassContainer className="p-8 space-y-4 h-full" hoverGlow>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-500">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white tracking-tight">{item.title}</h3>
                  <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </GlassContainer>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-32" />

        {/* Contact Section Header */}
        <div className="max-w-4xl mx-auto space-y-8 mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white font-display"
          >
            Connect <span className="text-blue-600 dark:text-blue-500 underline decoration-blue-500/30 underline-offset-8">With Us</span>
          </motion.h2>
          <p className="text-lg text-black/60 dark:text-white/60">
            Have a specialized requirement for your data center or enterprise network? Reach out to our hardware specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Call Us", details: "+8801813065665", desc: "Mon-Sat, 9AM-8PM" },
                { icon: Mail, title: "Email Us", details: "contact@inovexabd.com", desc: "Support available 24/7" },
                { icon: MapPin, title: "Visit Us", details: "Road-1, Shamoly, Dhaka", desc: "Dhaka, Bangladesh" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-500">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-black dark:text-white font-bold tracking-tight">{item.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{item.details}</p>
                      <p className="text-black/30 dark:text-white/30 text-xs">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <GlassContainer className="p-8">
               <h4 className="text-black dark:text-white font-bold mb-4 flex items-center gap-2">
                 <Clock size={18} className="text-blue-600 dark:text-blue-500" /> Business Hours
               </h4>
               <div className="space-y-2 text-sm">
                 <div className="flex justify-between text-black/50 dark:text-white/50">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                 </div>
                 <div className="flex justify-between text-black/50 dark:text-white/50">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                 </div>
                 <div className="flex justify-between text-blue-600 dark:text-blue-400 font-medium">
                    <span>Sunday</span>
                    <span>Closed</span>
                 </div>
               </div>
            </GlassContainer>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassContainer className="p-8 md:p-12">
               <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest pl-1">Full Name</label>
                        <input type="text" className="w-full px-6 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-black/10 dark:placeholder:text-white/10" placeholder="John Doe" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest pl-1">Email Address</label>
                        <input type="email" className="w-full px-6 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-black/10 dark:placeholder:text-white/10" placeholder="contact@inovexabd.com" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest pl-1">Subject</label>
                     <input type="text" className="w-full px-6 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-black/10 dark:placeholder:text-white/10" placeholder="Enterprise Quote Request" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest pl-1">Message</label>
                     <textarea className="w-full px-6 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white focus:border-blue-500 focus:outline-none transition-all min-h-[200px] placeholder:text-black/10 dark:placeholder:text-white/10" placeholder="Tell us about your networking requirements..."></textarea>
                  </div>
                  <button className="group w-full py-4 rounded-xl bg-blue-600 text-white font-bold transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
                     Send Message <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
               </form>
            </GlassContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
