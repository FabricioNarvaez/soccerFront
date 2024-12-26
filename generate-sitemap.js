const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFileSync } = require('fs');
const path = require('path');
const { routes } = require('./src/router/index.js');

(async () => {
    // TODO: Replace the url
    const hostname = 'https://www.tu-dominio.com';
    const sitemap = new SitemapStream({ hostname });

    routes.forEach((route) => {
      if (route.props || route.path.includes(':')) {
        return;
      }

      sitemap.write({
        url: route.path,
        changefreq: 'weekly',
        priority: route.meta?.priority || 0.6,
      });
    });
  
    sitemap.end();

    const sitemapData = await streamToPromise(sitemap).then((sm) => sm.toString());
    const outputPath = path.resolve(__dirname, 'dist/sitemap.xml');
    writeFileSync(outputPath, sitemapData);
  
    console.log('Sitemap generado en:', outputPath);
  })();
