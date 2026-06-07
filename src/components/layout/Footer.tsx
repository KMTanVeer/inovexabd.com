import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Twitter, Github, Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from '@/src/components/common/BrandLogo.tsx';

export function Footer() {
  const location = useLocation();
  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-black pt-24 pb-12 overflow-hidden border-t border-black/5 dark:border-white/10">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
              <BrandLogo showMark={false} className="w-12 h-12 transform transition-transform group-hover:rotate-12" />
            </Link>
            <p className="text-black/60 dark:text-white/50 text-sm leading-relaxed max-w-xs">
              InovexaBD is a trusted provider of ISP equipment, enterprise networking solutions, servers, fiber optic products, and data center infrastructure. We help businesses and service providers build reliable, scalable, and future-ready technology environments.
            </p>
            <div className="flex gap-4">
              <a aria-label="Facebook" href="https://www.facebook.com/inovexatechnologies" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:text-blue-500 hover:border-blue-500 transition-all">
                <Facebook size={18} />
              </a>
              {[{Icon: Twitter, label: 'Twitter'}, {Icon: Github, label: 'GitHub'}, {Icon: Linkedin, label: 'LinkedIn'}].map(({Icon, label}, i) => (
                <a aria-label={label} key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:text-blue-500 hover:border-blue-500 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-black dark:text-white font-bold tracking-tight">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/shop' },
                { name: 'Categories', path: '/categories' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'New Page (PDF)', path: '/testpage1' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    onClick={item.path === '/' ? handleLogoClick : undefined}
                    className="block w-full text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors text-sm py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-black dark:text-white font-bold tracking-tight">Customer Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'Returns & Warranty', path: '/returns' },
                { name: 'Order Tracking', path: '#' },
                { name: 'Shipping Policy', path: '/shipping' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="block w-full text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors text-sm py-1">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-black dark:text-white font-bold tracking-tight">Get in Touch</h4>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com/?q=Asadgate,+Shyamoli,+Dhaka,+Bangladesh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-3 text-sm text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors w-full py-1"
              >
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Asadgate, Shyamoli, Dhaka,<br />Bangladesh</span>
              </a>
              <a 
                href="tel:+8801813065665" 
                className="flex items-center gap-3 text-sm text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors w-full py-1"
              >
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+8801813065665</span>
              </a>
              <a 
                href="mailto:info@inovexabd.com" 
                className="flex items-center gap-3 text-sm text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors w-full py-1"
              >
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>info@inovexabd.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-black/10 dark:border-white/5 flex flex-col items-center justify-center gap-6">
          <p className="text-black/60 dark:text-white/60 text-xs font-medium text-center">
            © {new Date().getFullYear()} Inovexa Technologies. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
