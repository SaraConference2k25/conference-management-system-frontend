export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-slate-900 text-slate-400 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">SARA National Conference</h4>
            <p className="text-sm leading-relaxed text-slate-400">
              A premier national conference bringing together leading researchers and academicians to advance research
              and academic excellence.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Registration', 'Paper Submission', 'Publication'].map((label) => (
                <li key={label}>
                  <a href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
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

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Follow Us</h4>
            <div className="flex gap-2">
              {[
                { href: 'https://www.facebook.com/saranathanengg/', label: 'Facebook', hover: 'hover:bg-[#1877F2]' },
                { href: 'https://x.com/saranathanengg', label: 'X', hover: 'hover:bg-slate-700' },
                { href: 'https://www.linkedin.com/school/saranathan-college-of-engineering/', label: 'LinkedIn', hover: 'hover:bg-[#0A66C2]' },
                { href: 'https://www.instagram.com/explore/locations/1389518217771106/saranathan-college-of-engineering/', label: 'Instagram', hover: 'hover:bg-slate-700' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 flex items-center justify-center rounded-md bg-white/5 text-slate-400 hover:text-white transition-colors ${social.hover}`}
                >
                  <span className="text-xs font-medium">{social.label[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © {currentYear} Saranathan National Conference. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              {['Privacy Policy', 'Terms of Service', 'Code of Conduct'].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-600">
          <p>Saranathan College of Engineering (Autonomous Institution), Trichy - 620012, India.</p>
        </div>
      </div>
    </footer>
  )
}
