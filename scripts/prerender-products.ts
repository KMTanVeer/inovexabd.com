import fs from 'fs';
import path from 'path';
import { PRODUCTS } from '../src/data/products.ts';

const distPath = path.join(process.cwd(), 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found! Run npm run build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');

PRODUCTS.forEach(product => {
  const title = `${product.name} | ISP, Enterprise Networking & Data Center Solutions | INOVEXA Technologies`;
  const desc = `Buy ${product.name} from InovexaBD. Trusted supplier of ISP equipment, enterprise networking hardware, servers, storage systems, fiber optic solutions, and data center infrastructure in Bangladesh.`;
  const productUrl = `https://www.inovexabd.com/product/${product.id}`;
  
  let finalImage = product.image;
  if (finalImage.startsWith('/')) {
    finalImage = `https://www.inovexabd.com${finalImage}`;
  }

  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Replace Description
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${desc}" />`);

  // Replace Canonical Link
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${productUrl}" />`);

  // Replace Open Graph Tags
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${productUrl}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${desc}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${finalImage}" />`);

  // Replace Twitter Tags
  html = html.replace(/<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:url" content="${productUrl}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${desc}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${finalImage}" />`);

  // Create product folder
  const productDir = path.join(distPath, 'product', String(product.id));
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  // Write pre-rendered index.html
  fs.writeFileSync(path.join(productDir, 'index.html'), html);
});

console.log(`Successfully pre-rendered ${PRODUCTS.length} product pages.`);
