export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-900 dark:bg-black text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">SARA 2025</h4>
            <p className="text-sm leading-relaxed">
              A premier national conference bringing together leading researchers and academicians to advance research
              and academic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#registration" className="hover:text-white transition-colors">
                  Registration
                </a>
              </li>
              <li>
                <a href="#submission" className="hover:text-white transition-colors">
                  Paper Submission
                </a>
              </li>
              <li>
                <a href="#publication" className="hover:text-white transition-colors">
                  Publication
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:veeyes@saranathan.ac.in" className="hover:text-white transition-colors">
                  veeyes@saranathan.ac.in
                </a>
              </li>
              <li>+91 84899 15204</li>
              <li>Saranathan College of Engineering</li>
              <li>Trichy - 620012, India</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/saranathanengg/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white text-gray-300 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.25 10.44 21.95v-7.02H7.9v-2.86h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.86h-2.34v7.02C18.34 21.25 22 17.09 22 12.07z"/></svg>
              </a>
              <a href="https://x.com/saranathanengg" aria-label="X" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-black hover:text-white text-gray-300 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 5l12 14" />
                  <path d="M6 19L18 5" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/school/saranathan-college-of-engineering/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#0A66C2] hover:text-white text-gray-300 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 24h4V7h-4v17zM8.5 7h3.73v2.34h.05C13.6 8.06 14.95 7 17.52 7 22 7 24 9.24 24 14.08V24h-4v-9.18c0-2.2-.79-3.7-2.76-3.7-1.51 0-2.4 1.02-2.79 2v9.88H8.5V7z"/></svg>
              </a>
              <a href="https://www.instagram.com/explore/locations/1389518217771106/saranathan-college-of-engineering/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#962fbf] hover:text-white text-gray-300 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.4-3.1a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center sm:text-left">
              © {currentYear} SARA 2025 National Conference. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>
            Saranathan College of Engineering (Autonomous Institution), Trichy - 620012, India.
          </p>
        </div>
      </div>
    </footer>
  )
}
