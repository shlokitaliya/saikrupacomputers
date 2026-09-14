const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.html')) {
      results.push(file);
    }
  });
  return results;
}

const htmlFiles = walk('.');
for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Reviews Section (only in index.html mostly)
  if (content.includes('elfsight-widget-container')) {
    if (!content.includes('View Google Reviews')) {
        content = content.replace(
            /(<div class="elfsight-widget-container"[^>]*>[\s\S]*?<\/div>)\s*<\/div>/,
            `$1\n                <div class="text-center" style="margin-top: 2rem;">\n                    <a href="https://share.google/Y2UNVjOq1bt1WK77N" target="_blank" rel="noopener noreferrer" class="btn btn-outline">View Google Reviews</a>\n                </div>\n            </div>`
        );
        changed = true;
    }
  }

  // 2. Contact Section
  if (content.includes('Get Directions')) {
    if (!content.includes('View on Google Maps / Google Business')) {
        content = content.replace(
            /(<a href="[^"]+" target="_blank" rel="noopener" class="link-action">Get Directions <i class="fa-solid fa-arrow-right"><\/i><\/a>)/,
            `$1<br>\n                                <a href="https://share.google/Y2UNVjOq1bt1WK77N" target="_blank" rel="noopener noreferrer" class="link-action" style="margin-top: 0.5rem; display: inline-block;">View on Google Maps / Google Business <i class="fa-brands fa-google"></i></a>`
        );
        changed = true;
    }
  }

  // 3. Footer
  if (content.includes('footer-social')) {
    if (!content.includes('>Google Business Profile</a>')) {
        content = content.replace(
            /(<a href="https:\/\/www\.instagram\.com\/saikrupa_computers" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram">\s*<i class="fa-brands fa-instagram"><\/i>\s*<\/a>)/,
            `$1\n                    <br>\n                    <a href="https://share.google/Y2UNVjOq1bt1WK77N" target="_blank" rel="noopener noreferrer" style="color: #a0aec0; font-size: 0.9rem; margin-top: 15px; display: inline-block; text-decoration: none;">Google Business Profile</a>`
        );
        changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
}
console.log('Done.');
