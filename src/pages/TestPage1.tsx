import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Printer, Download, ArrowLeft, Layers, ShieldCheck, Mail, Info, FileText } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '@/src/data/products.ts';
import { SEO } from '@/src/components/common/SEO.tsx';
import { BrandLogo } from '@/src/components/common/BrandLogo.tsx';

export function TestPage1() {
  // Group products by category
  const productsByCategory = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    
    // Initialize groups based on categories
    CATEGORIES.forEach(cat => {
      groups[cat.id] = [];
    });
    
    // Fill groups
    PRODUCTS.forEach(prod => {
      if (groups[prod.category]) {
        groups[prod.category].push(prod);
      } else {
        // Fallback for uncategorized
        if (!groups['uncategorized']) {
          groups['uncategorized'] = [];
        }
        groups['uncategorized'].push(prod);
      }
    });
    
    return groups;
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-32 pb-24 relative">
      <SEO 
        title="Product Catalog PDF - Inovexa Technologies" 
        description="Download or print our complete product catalog including servers, storage, and networking hardware." 
      />

      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 print:hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      {/* SCREEN VIEW (Hidden when printing) */}
      <div className="container mx-auto px-6 max-w-6xl print:hidden">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        {/* Catalog Control Header */}
        <div className="relative overflow-hidden p-8 md:p-12 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-md shadow-xl mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest">
                <FileText size={12} />
                <span>Printable Document</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-wider text-black dark:text-white leading-tight">
                Official Catalog
              </h1>
              <p className="text-sm md:text-base text-black/60 dark:text-white/60 max-w-2xl font-light">
                Generate and download a high-contrast, professional PDF catalog containing our entire portfolio of enterprise-grade hardware, grouped clearly into categories with black pricing.
              </p>
            </div>
            
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-98 cursor-pointer group shrink-0"
            >
              <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              Download PDF Catalog
            </button>
          </div>
        </div>

        {/* Live Catalog Preview */}
        <div className="space-y-12">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-black dark:text-white">Catalog Preview</h2>
            <span className="text-xs font-bold text-black/45 dark:text-white/45 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-black/5 dark:border-white/5">
              {PRODUCTS.length} Products Available
            </span>
          </div>

          {CATEGORIES.map(category => {
            const categoryProducts = productsByCategory[category.id] || [];
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 shrink-0">
                    <category.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-black dark:text-white">
                    {category.name}
                  </h3>
                  <span className="text-xs text-black/40 dark:text-white/40 font-medium">
                    ({categoryProducts.length} items)
                  </span>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-sm shadow-md">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                        <th className="p-4 font-bold text-black/70 dark:text-white/70 w-24 text-center">Image</th>
                        <th className="p-4 font-bold text-black/70 dark:text-white/70">Product Name</th>
                        <th className="p-4 font-bold text-black/70 dark:text-white/70 hidden md:table-cell">Specifications</th>
                        <th className="p-4 font-bold text-black/70 dark:text-white/70 text-right w-36">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {categoryProducts.map(product => (
                        <tr key={product.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 text-center">
                            <div className="w-14 h-14 border border-black/10 dark:border-white/10 rounded-xl flex items-center justify-center overflow-hidden bg-white mx-auto shadow-xs">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="max-w-full max-h-full object-contain p-1"
                                loading="lazy"
                              />
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-black dark:text-white max-w-xs md:max-w-sm">
                            <div className="line-clamp-2">{product.name}</div>
                            <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-blue-500">
                              {product.specs.Model || product.specs.Brand || 'Enterprise'}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-black/60 dark:text-white/60 hidden md:table-cell max-w-xs">
                            <div className="space-y-0.5">
                              {Object.entries(product.specs || {}).slice(0, 3).map(([key, val]) => (
                                <div key={key} className="truncate">
                                  <span className="font-semibold text-black/80 dark:text-white/80">{key}:</span> {val}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-right font-bold text-black dark:text-white text-base">
                            {product.price > 0 ? `${product.price.toLocaleString()} ৳` : 'Call for Price'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guide / Instructions block */}
        <div className="mt-16 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-center max-w-2xl mx-auto">
          <h4 className="font-bold text-sm text-black dark:text-white mb-2 uppercase tracking-wider">How to Save as PDF</h4>
          <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed font-light">
            When you click "Download PDF Catalog", your browser's print utility will open. Under "Destination", select <span className="font-bold text-blue-600 dark:text-blue-400">Save as PDF</span>. Ensure "Headers and footers" is disabled and "Background graphics" is enabled for the best formatted output.
          </p>
        </div>

      </div>

      {/* PRINT VIEW CONTAINER (Visible ONLY during print / PDF generation) */}
      <div className="hidden print:block printable-content font-sans text-xs">
        
        {/* Style block dedicated to printing overrides */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            /* 1. Reset page structure for print */
            html, body, #root, main {
              background: #ffffff !important;
              color: #000000 !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
              height: auto !important;
              width: 100% !important;
            }

            /* 2. Hide all non-printable elements */
            nav, 
            footer, 
            header, 
            aside, 
            button, 
            .print\\:hidden,
            .print-hidden,
            [class*="WhatsApp"],
            [class*="whatsapp"],
            [class*="cookie"],
            [class*="Cookie"],
            div[style*="position: fixed"],
            div[style*="position: absolute"] {
              display: none !important;
            }

            /* 3. Style the printable container */
            .printable-content {
              display: block !important;
              background: #ffffff !important;
              color: #000000 !important;
              padding: 20px !important;
              width: 100% !important;
            }

            .print-price {
              color: #000000 !important;
              font-weight: bold !important;
            }

            .print-table {
              border-collapse: collapse !important;
              width: 100% !important;
              margin-top: 10px !important;
              page-break-inside: auto !important;
            }

            .print-table tr {
              page-break-inside: avoid !important;
              page-break-after: auto !important;
            }

            .print-table th, .print-table td {
              border: 1px solid #999999 !important;
              padding: 8px !important;
              text-align: left !important;
              vertical-align: middle !important;
              color: #000000 !important;
              font-size: 11px !important;
            }

            .print-table th {
              background-color: #f3f4f6 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              font-weight: bold !important;
            }

            .print-category-header {
              page-break-after: avoid !important;
              page-break-inside: avoid !important;
              margin-top: 30px !important;
              margin-bottom: 15px !important;
              border-bottom: 2px solid #000000 !important;
              padding-bottom: 5px !important;
              font-size: 14px !important;
              font-weight: bold !important;
              text-transform: uppercase !important;
            }

            .print-image-box {
              width: 50px !important;
              height: 50px !important;
              border: 1px solid #999999 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              overflow: hidden !important;
              background-color: #ffffff !important;
              margin: 0 auto !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .print-image-box img {
              max-width: 100% !important;
              max-height: 100% !important;
              object-fit: contain !important;
            }

            .page-break {
              page-break-before: always !important;
            }

            .print-header {
              border-bottom: 3px double #000000 !important;
              padding-bottom: 15px !important;
              margin-bottom: 25px !important;
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
              justify-content: space-between !important;
            }

            .print-motto {
              font-style: italic !important;
              color: #374151 !important;
              font-size: 11px !important;
              margin-top: 5px !important;
            }

            .print-logo-text {
              font-size: 22px !important;
              font-weight: 900 !important;
              letter-spacing: -0.5px !important;
              text-transform: uppercase !important;
            }

            .print-footer {
              margin-top: 40px !important;
              text-align: center !important;
              font-size: 9px !important;
              color: #4b5563 !important;
              border-top: 1px solid #d1d5db !important;
              padding-top: 10px !important;
              page-break-inside: avoid !important;
            }
          }
        `}} />

        {/* Print Header: Logo + Motto */}
        <div className="print-header">
          <div>
            <div className="print-logo-text">
              INOVEXA <span style={{ color: '#2563eb' }}>X</span> Technologies
            </div>
            <div className="print-motto">
              Empowering Connectivity, Infrastructure, and Innovation
            </div>
          </div>
          <div className="text-right text-[10px] text-zinc-500">
            <div className="font-bold">INFORMATIVE PRODUCT LIST</div>
            <div>Web: www.inovexabd.com</div>
            <div>Email: sales@inovexabd.com</div>
          </div>
        </div>

        {/* Print Content categorized */}
        {CATEGORIES.map((category, catIdx) => {
          const categoryProducts = productsByCategory[category.id] || [];
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id} className={catIdx > 0 ? "page-break" : ""}>
              <div className="print-category-header">
                {category.name} ({categoryProducts.length} Items)
              </div>

              <table className="print-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>Image</th>
                    <th>Product Name</th>
                    <th>Specifications</th>
                    <th style={{ width: '100px', textAlign: 'right' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryProducts.map(product => (
                    <tr key={product.id}>
                      <td style={{ textAlign: 'center' }}>
                        <div className="print-image-box">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                          />
                        </div>
                      </td>
                      <td style={{ fontWeight: 'bold', fontSize: '11px' }}>
                        {product.name}
                      </td>
                      <td style={{ fontSize: '9px', color: '#333' }}>
                        {Object.entries(product.specs || {}).slice(0, 4).map(([k, v]) => (
                          <div key={k}>• <strong>{k}:</strong> {v}</div>
                        ))}
                      </td>
                      <td style={{ textAlign: 'right' }} className="print-price">
                        {product.price > 0 ? `${product.price.toLocaleString()} ৳` : 'Call for Price'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        {/* Print Footer */}
        <div className="print-footer">
          © {new Date().getFullYear()} Inovexa Technologies. All rights reserved. Document generated dynamically from www.inovexabd.com.
        </div>
      </div>
    </div>
  );
}
