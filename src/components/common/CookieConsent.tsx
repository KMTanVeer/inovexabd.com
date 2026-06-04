import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay before showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Decorative glowing gradient at the top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {/* Cookie Icon */}
              <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 14v.01" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-black dark:text-white tracking-tight">
                  Cookie Preference
                </h4>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                  We use cookies to improve your browsing experience, analyze traffic, and personalize product recommendations. Learn more in our{' '}
                  <Link
                    to="/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    onClick={() => setIsVisible(false)}
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={handleDecline}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-[0_2px_10px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_15px_rgba(37,99,235,0.35)] transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
