import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Star, Heart, ShieldCheck, Truck, RotateCcw, Share2, ChevronRight, Zap, CheckCircle2, MessageCircle, PhoneCall, FileText } from 'lucide-react';
import { type Product, PRODUCTS } from '@/src/data/products.ts';
import { ProductCard } from '@/src/components/common/ProductCard.tsx';
import { SEO } from '@/src/components/common/SEO.tsx';

const TRUST_BADGES = [
  '1 Year Warranty',
  'Technical Support',
  'After-Sales Service',
  'Genuine Hardware',
  'Fully Tested',
  'Warranty Available',
  'Nationwide Delivery',
  'Enterprise Support',
];

const MANUFACTURER_BRANDS = ['Dell', 'Cisco', 'Huawei', 'Juniper', 'Intel'];
const BRAND_LOGOS: Record<string, string> = {
  dell: '/brand-logos/dell.svg',
  cisco: '/brand-logos/cisco.svg',
  huawei: '/brand-logos/huawei.svg',
  juniper: '/brand-logos/juniper.svg',
  intel: '/brand-logos/intel.svg',
};

export function ProductDetail() {
  const { id } = useParams();
  const [allProducts] = useState<Product[]>(PRODUCTS);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews'>('specs');

  const [isLoading] = useState(false);

  useEffect(() => {
    const foundProduct = allProducts.find((p: any) => String(p.id) === String(id) || String(p._id) === String(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImageIndex(0);
      window.scrollTo(0, 0);
    } else {
      setProduct(null);
    }
  }, [id, allProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-black transition-colors">
        <div className="text-center space-y-6">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
          <h2 className="text-2xl font-bold text-black dark:text-white">Loading innovative hardware...</h2>
          <Link to="/shop" className="text-blue-600 dark:text-blue-400 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-black transition-colors">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">Product not found.</h2>
          <Link to="/shop" className="text-blue-600 dark:text-blue-400 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productImages = (product.images?.length ? product.images : [product.image]).filter((image): image is string => Boolean(image));
  const activeImage = productImages[selectedImageIndex] || productImages[0] || '';
  const hasManyImages = productImages.length > 5;
  const isPriceAvailable = Number(product.price) > 0;
  const productName = product.name;
  const productNameLower = productName.toLowerCase();
  const brandFromData = ((product as any).brand as string | undefined)?.trim();
  const detectedBrand = brandFromData || MANUFACTURER_BRANDS.find((brand) => productNameLower.includes(brand.toLowerCase())) || 'Enterprise Hardware';
  const stockValue = (product as any).stock;
  const stockStatus = typeof stockValue === 'number' ? (stockValue > 0 ? 'In Stock' : 'Out of Stock') : 'In Stock';
  const condition = ((product as any).condition as string | undefined) || 'Refurbished';
  const warrantyInfo = ((product as any).warranty as string | undefined) || 'Warranty Available';
  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const specEntries = product.specs ? Object.entries(product.specs) : [];
  const subcategoryLabel =
    product.category === 'networking'
      ? ((product.specs as any)?.Model as string | undefined) || ((product.specs as any)?.Type as string | undefined) || 'Enterprise Networking'
      : ((product.specs as any)?.Series as string | undefined) || ((product.specs as any)?.Model as string | undefined) || 'Enterprise Hardware';
  const normalizedBrand = MANUFACTURER_BRANDS.find((brand) => detectedBrand.toLowerCase().includes(brand.toLowerCase())) || detectedBrand;
  const currentBrandLogo = BRAND_LOGOS[normalizedBrand.toLowerCase()];

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors">
      <SEO
        title={`${product.name} | Enterprise Networking Equipment`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, networking equipment, enterprise router, switch, lan card, ssd`}
        url={`https://inovexabd.com/product/${product.id}`}
        type="product"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: product.category,
          image: product.image,
          brand: {
            '@type': 'Brand',
            name: detectedBrand,
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'BDT',
            price: isPriceAvailable ? String(product.price) : '0.00',
            availability: stockStatus === 'In Stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `https://inovexabd.com/product/${product.id}`,
          },
        }}
      />

      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full -z-10" />

      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wide text-black/70 dark:text-white/75 mb-10">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight size={14} className="text-black/50 dark:text-white/55" />
          <Link to="/shop" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{categoryLabel}</Link>
          <ChevronRight size={14} className="text-black/50 dark:text-white/55" />
          <span className="text-black/80 dark:text-white/85">{subcategoryLabel}</span>
          <ChevronRight size={14} className="text-black/50 dark:text-white/55" />
          <span className="text-black dark:text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          <div className="lg:col-span-8 flex flex-col md:flex-row md:items-stretch gap-5">
            <div
              className={cn(
                'hidden md:block shrink-0 w-32 h-[min(42rem,78vh)] overflow-y-auto overflow-x-hidden pr-1',
                hasManyImages ? 'rounded-2xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] p-3' : '',
              )}
            >
              <div className={cn('gap-3', hasManyImages ? 'grid grid-cols-2 auto-rows-fr' : 'flex flex-col')}>
                {productImages.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={cn(
                      'relative w-full aspect-square rounded-xl border bg-white dark:bg-black overflow-hidden transition-all duration-300',
                      selectedImageIndex === i
                        ? 'border-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,0.45),0_10px_24px_rgba(37,99,235,0.28)]'
                        : 'border-black/15 dark:border-white/20 hover:border-blue-500/60',
                    )}
                  >
                    {selectedImageIndex === i && (
                      <motion.span
                        layoutId="thumbnail-active-ring"
                        className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-blue-500/70"
                      />
                    )}
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover rounded-xl opacity-100"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex-1 group h-[min(42rem,78vh)] rounded-[2rem] overflow-hidden border border-black/15 dark:border-white/20 bg-white dark:bg-neutral-950 p-4 md:p-6"
            >
              <div className="h-full w-full rounded-[1.5rem] bg-white dark:bg-neutral-950 overflow-hidden border border-black/5 dark:border-white/10">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 ease-out md:group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="absolute top-5 right-5 flex flex-col gap-2">
                <button className="p-2.5 rounded-full bg-white/95 dark:bg-black/70 border border-black/10 dark:border-white/20 text-black dark:text-white hover:bg-white dark:hover:bg-black transition-all">
                  <Share2 size={16} />
                </button>
                <button className="p-2.5 rounded-full bg-white/95 dark:bg-black/70 border border-black/10 dark:border-white/20 text-black dark:text-white hover:text-red-500 hover:border-red-500/40 transition-all">
                  <Heart size={16} />
                </button>
              </div>
            </motion.div>

            <div className="md:hidden mt-1 -mx-1">
              <div className="flex gap-3 overflow-x-auto pb-2 px-1">
                {productImages.map((image, i) => (
                  <button
                    key={`mobile-${i}`}
                    onClick={() => setSelectedImageIndex(i)}
                    className={cn(
                      'relative h-20 w-20 min-w-20 rounded-xl overflow-hidden border transition-all',
                      selectedImageIndex === i
                        ? 'border-blue-600 shadow-[0_6px_18px_rgba(37,99,235,0.35)]'
                        : 'border-black/15 dark:border-white/20',
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-7">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {currentBrandLogo ? (
                  <div className="h-10 px-3 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-950 flex items-center">
                    <img src={currentBrandLogo} alt={`${normalizedBrand} logo`} className="h-5 w-auto object-contain" loading="lazy" />
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-black/75 dark:text-white/80">Brand: {normalizedBrand}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-600/12 border border-blue-600/25 text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-[0.18em]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={cn('fill-yellow-500', i < Math.floor(product.rating || 5) ? 'text-yellow-500' : 'text-black/25 dark:text-white/25')} />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-black/70 dark:text-white/70">({product.rating || 5})</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white leading-tight">{product.name}</h1>

              <div className="space-y-1">
                <span className="text-3xl font-bold text-black dark:text-white">
                  {isPriceAvailable ? `${product.price.toLocaleString()} tk` : 'Price on Request'}
                </span>
                {!isPriceAvailable && (
                  <p className="text-sm text-black/75 dark:text-white/75 font-medium">Contact for Pricing</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-semibold text-green-700 dark:text-green-300 uppercase tracking-wider">{stockStatus}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[10px] font-semibold text-black/75 dark:text-white/80 uppercase tracking-wider">
                  {condition}
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[10px] font-semibold text-black/75 dark:text-white/80 uppercase tracking-wider">
                  {warrantyInfo}
                </div>
              </div>

              <p className="text-black/80 dark:text-white/80 leading-relaxed text-sm pt-1">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {TRUST_BADGES.map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/15">
                  <CheckCircle2 size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="text-[11px] font-semibold text-black/80 dark:text-white/80 leading-tight">{badge}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="group relative px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.24)] overflow-hidden text-center"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <FileText size={16} />
                  Request a Quote
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/12 to-white/0 -translate-x-full group-hover:animate-shimmer" />
              </Link>
              <a
                href={`https://wa.me/8801813065665?text=${encodeURIComponent(`Hello, I need pricing details for ${product!.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition-all text-center flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp Inquiry
              </a>
              <a
                href="tel:+8801813065665"
                className="px-4 py-2.5 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-black dark:text-white text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/15 transition-all backdrop-blur-md text-center flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} className="text-blue-600 dark:text-blue-400" />
                Call to Inquire
              </a>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/15">
              <div className="flex items-center gap-6 justify-center sm:justify-start">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-black/65 dark:text-white/70 uppercase tracking-wider">
                  <RotateCcw size={12} className="text-blue-500" />
                  30-Day Evaluation
                </div>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-black/65 dark:text-white/70 uppercase tracking-wider">
                  <ShieldCheck size={12} className="text-blue-500" />
                  Secure Encryption
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="flex border-b border-black/10 dark:border-white/15 gap-12 mb-10 overflow-x-auto scrollbar-hide">
            {['specs', 'description', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  'pb-6 text-sm font-bold uppercase tracking-[0.2em] transition-all relative',
                  activeTab === tab ? 'text-blue-600 dark:text-blue-400' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white',
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl divide-y divide-black/10 dark:divide-white/15"
              >
                {specEntries.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-6 py-3">
                    <span className="text-xs font-semibold text-black/65 dark:text-white/65 uppercase tracking-[0.15em]">{label}</span>
                    <span className="text-sm font-medium text-black dark:text-white text-right">{String(value)}</span>
                  </div>
                ))}
                {(product as any).specifications && (product as any).specifications.map((spec: any, index: number) => (
                  <div key={`${spec.key}-${index}`} className="flex items-start justify-between gap-6 py-3">
                    <span className="text-xs font-semibold text-black/65 dark:text-white/65 uppercase tracking-[0.15em]">{spec.key}</span>
                    <span className="text-sm font-medium text-black dark:text-white text-right">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl space-y-8"
              >
                <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">Innovative Technology for Modern Challenges</h3>
                <p className="text-black/80 dark:text-white/80 leading-relaxed text-lg">
                  The {product.name} represents a pinnacle of engineering from {product.category === 'networking' ? 'networking pioneers' : 'computing experts'}.
                  Built with future-proof materials and cutting-edge silicon, this solution addresses the high-demand requirements of modern data centers and enterprise workflows.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                      <CheckCircle2 size={24} />
                      <h4 className="font-bold text-black dark:text-white uppercase tracking-widest text-xs">Sustainability Built-in</h4>
                    </div>
                    <p className="text-sm text-black/75 dark:text-white/75 leading-relaxed">Our hardware is optimized for lower power consumption without sacrificing throughput performance.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
                      <Zap size={24} />
                      <h4 className="font-bold text-black dark:text-white uppercase tracking-widest text-xs">Dynamic Response</h4>
                    </div>
                    <p className="text-sm text-black/75 dark:text-white/75 leading-relaxed">Intelligent architecture that handles bursty workloads with zero packet loss or latency spikes.</p>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-8 py-10 px-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/15">
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-bold text-black dark:text-white">{product.rating || 5}</div>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <div className="text-[10px] font-semibold text-black/65 dark:text-white/70 uppercase tracking-widest leading-loose">Based on 124 reviews</div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-4">
                        <span className="text-[10px] font-semibold text-black/70 dark:text-white/70 w-4">{stars}</span>
                        <div className="flex-1 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: stars >= 4 ? '85%' : stars === 3 ? '10%' : '5%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {[
                    { user: 'Alex Thompson', comment: 'Integration was seamless with our existing Cisco core. Performance is exactly as advertised. The 10G throughput is rock solid even under peak loads.', rating: 5, date: '2 days ago' },
                    { user: 'Sarah Chen', comment: 'Great product for the price. Huawei did a fantastic job with the thermal management on these cards. They stay cool in our dense rack configurations.', rating: 4, date: '1 week ago' },
                  ].map((review, i) => (
                    <div key={i} className="space-y-4 p-8 rounded-2xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                          <div>
                            <h5 className="font-bold text-black dark:text-white text-sm">{review.user}</h5>
                            <p className="text-[10px] text-black/65 dark:text-white/70 uppercase tracking-widest font-semibold">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                      </div>
                      <p className="text-black/75 dark:text-white/75 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">Complete the Infrastructure</h2>
            <Link to="/shop" className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-500 dark:hover:text-blue-300 transition-colors uppercase tracking-widest text-xs">
              Explore More <ChevronRight size={16} className="inline ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, i) => (
              <ProductCard key={`${(p as any)._id || p.id}-${i}`} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
