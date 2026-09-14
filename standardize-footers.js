const fs = require('fs');
const path = require('path');

function getFooter(depth) {
    const prefix = depth === 1 ? '../' : '../../';
    const knCenter = depth === 1 ? 'index.html' : '../index.html';
    
    return `    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="${prefix}assets/logo.png" alt="Saikrupa Computers and CCTV Logo" class="footer-logo">
                    <p class="footer-desc">Computer, laptop, networking, WiFi and CCTV solutions in Surat.</p>
                    <p class="footer-est">Established in 2004</p>
                </div>
                
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="${prefix}index.html#home">Home</a></li>
                        <li><a href="${prefix}index.html#about">About</a></li>
                        <li><a href="${prefix}index.html#services">Services</a></li>
                        <li><a href="${knCenter}">Knowledge Center</a></li>
                        <li><a href="${prefix}index.html#clients">Clients</a></li>
                        <li><a href="${prefix}index.html#reviews">Reviews</a></li>
                        <li><a href="${prefix}index.html#contact">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-contact">
                    <h3>Contact Information</h3>
                    <p><i class="fa-solid fa-phone"></i> +91 98251 14379</p>
                    <p><i class="fa-solid fa-envelope"></i> Saikrupa.computers@gmail.com</p>
                    <p><i class="fa-solid fa-location-dot"></i> 102-104, Jaybhavani Shopping Centre, Surat - 395006</p>
                </div>
                
                <div class="footer-social">
                    <h3>Follow Us</h3>
                    <a href="https://www.instagram.com/saikrupa_computers" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <br>
                    <a href="https://share.google/Y2UNVjOq1bt1WK77N" target="_blank" rel="noopener noreferrer" style="color: #a0aec0; font-size: 0.9rem; margin-top: 15px; display: inline-block; text-decoration: none;">Google Business Profile</a>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2026 Saikrupa Computers and CCTV. All rights reserved.</p>
            </div>
        </div>
    </footer>`;
}

function processDir(dir, depth) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath, depth + 1);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Remove existing footer and everything up to script tags or body end
            const newFooter = getFooter(depth);
            
            // Regex to find existing footer and replace it
            content = content.replace(/<!-- Footer -->[\s\S]*?<\/footer>/, newFooter);
            
            // Some simplified pages don't have <!-- Footer --> comment, so we fallback
            if (!content.includes('<!-- Footer -->')) {
                 content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, newFooter);
            }

            fs.writeFileSync(fullPath, content);
            console.log('Fixed footer for', fullPath);
        }
    }
}

// Only process the blog directory
processDir(path.join(__dirname, 'blog'), 1);
console.log('Done.');
