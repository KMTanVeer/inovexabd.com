import React, { useEffect } from 'react';

const rippleStyle = `
  @keyframes ripple-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7), 0 10px 30px rgba(37,211,102,0.4);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(37, 211, 102, 0), 0 10px 30px rgba(37,211,102,0.4);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 10px 30px rgba(37,211,102,0.4);
    }
  }
  
  .whatsapp-ripple {
    animation: ripple-pulse 2s infinite;
  }
`;

export function FloatingWhatsApp() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = rippleStyle;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  const whatsappNumber = '8801813065665';
  const url = `https://wa.me/${whatsappNumber}`;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group whatsapp-ripple"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute right-full mr-3 bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity drop-shadow-md">
        Need help? Chat with us
      </div>
      <svg 
        viewBox="0 0 24 24" 
        width="28" 
        height="28" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        <path d="M14 15h.01M9 10h.01M9 9h.01M14 14h.01" />
        <path fill="currentColor" d="M16.32 14.12c-.22-.11-1.3-.64-1.5-.72-.2-.08-.34-.11-.48.11s-.57.72-.7.86c-.13.15-.26.17-.48.06-.21-.11-.93-.34-1.77-1.1-.65-.58-1.09-1.31-1.22-1.52-.13-.22-.01-.34.1-.45.1-.11.22-.22.33-.35.11-.11.15-.19.22-.32.07-.12.03-.23-.02-.34-.05-.11-.48-1.16-.66-1.58-.17-.41-.35-.35-.48-.36-.12-.01-.26-.01-.4-.01s-.36.05-.55.26c-.19.21-.72.7-0.72 1.7 0 1 .74 1.96.84 2.1.1.13 1.44 2.22 3.5 3.1.48.21.86.33 1.15.42.48.15.93.13 1.28.08.39-.06 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.1-.19-.15-.41-.26z" stroke="none" />
      </svg>
    </a>
  );
}
