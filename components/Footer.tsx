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
                <a href="mailto:conference@saranathan.ac.in" className="hover:text-white transition-colors">
                  conference@saranathan.ac.in
                </a>
              </li>
              <li>+91-431-2760801</li>
              <li>Saranathan College of Engineering</li>
              <li>Trichy - 620012, India</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                f
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                𝕏
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                in
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                ig
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
            Saranathan College of Engineering | Affiliated to Anna University, Chennai
          </p>
        </div>
      </div>
    </footer>
  )
}
