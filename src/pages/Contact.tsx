import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xvzyeqek", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO title="Contact" description="Get in touch with InovexaBD expert physical network architects." />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-wider">Contact Us</h1>
          <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto font-light">
            Have an inquiry about large-scale deployment or supply? Speak with our sales and technical support teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold uppercase tracking-wider">Send a Message</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl shrink-0 h-fit">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider">Locate Us</h3>
                  <p className="text-black/60 dark:text-white/60 text-sm mt-1">Asadgate, Shyamoli, Dhaka, Bangladesh.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl shrink-0 h-fit">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider">Email Sales</h3>
                  <a href="mailto:info@inovexabd.com" className="block text-black/60 dark:text-white/60 text-sm mt-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@inovexabd.com</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl shrink-0 h-fit">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider">Phone Lines</h3>
                  <a href="tel:+8801813065665" className="block text-black/60 dark:text-white/60 text-sm mt-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+880 1813065665</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-8 rounded-3xl shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Send size={24} />
                </div>
                <h3 className="text-xl font-bold">Message Sent Successfully</h3>
                <p className="text-black/60 dark:text-white/60 text-sm">We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Your Name</label>
                  <input name="name" required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Email Address</label>
                  <input name="email" required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Your Inquiry</label>
                  <textarea name="message" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full min-h-[120px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3" />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
