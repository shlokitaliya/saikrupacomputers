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

  // 1. Footer - for pages without footer-social (simplified footer)
  if (content.includes('Saikrupa.computers@gmail.com</p>') && !content.includes('Google Business Profile')) {
    content = content.replace(
      /(<p><i class="fa-solid fa-envelope"><\/i> Saikrupa.computers@gmail.com<\/p>)/,
      `$1\n                    <p style="margin-top: 10px;"><a href="https://share.google/Y2UNVjOq1bt1WK77N" target="_blank" rel="noopener noreferrer" style="color: #a0aec0; font-size: 0.9rem; text-decoration: none;"><i class="fa-brands fa-google"></i> Google Business Profile</a></p>`
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
}
console.log('Done fixing simplified footers.');
