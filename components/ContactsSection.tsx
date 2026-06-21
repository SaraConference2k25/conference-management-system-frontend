import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon, DocumentIcon, MapPinIcon } from './Icons';

export default function ContactsSection() {
  const contactCards = [
    {
      title: 'General Inquiries',
      icon: EnvelopeIcon,
      contacts: [
        { label: 'Email', value: 'conference@saranathan.ac.in' },
        { label: 'Phone', value: '+91-431-2760801, 2760802' },
        { label: 'Website', value: 'www.saranathan.ac.in' },
      ],
    },
    {
      title: 'Conference Chair',
      icon: PhoneIcon,
      contacts: [
        { label: 'Name', value: 'Dr. Conference Chair' },
        { label: 'Email', value: 'chair@saraconference.ac.in' },
        { label: 'Phone', value: '+91-9XXXXXXXXX' },
      ],
    },
    {
      title: 'Paper Submission',
      icon: DocumentIcon,
      contacts: [
        { label: 'Department', value: 'Technical Program Committee' },
        { label: 'Email', value: 'papers@saraconference.ac.in' },
        { label: 'Phone', value: '+91-9XXXXXXXXX' },
      ],
    },
    {
      title: 'Registration Queries',
      icon: MapPinIcon,
      contacts: [
        { label: 'Department', value: 'Registration Desk' },
        { label: 'Email', value: 'registration@saraconference.ac.in' },
        { label: 'Phone', value: '+91-9XXXXXXXXX' },
      ],
    },
  ]

  const faqs = [
    {
      q: 'What if I have questions about registration?',
      a: (
        <>
          Please reach out to our Registration Desk at{' '}
          <a href="mailto:registration@saraconference.ac.in" className="text-blue-700 hover:text-blue-800">registration@saraconference.ac.in</a>{' '}
          or call +91-9XXXXXXXXX for immediate assistance.
        </>
      ),
    },
    {
      q: 'How do I submit my paper?',
      a: (
        <>
          After registering, you can submit your paper through our online portal. For any submission-related queries, contact our Technical Program Committee at{' '}
          <a href="mailto:papers@saraconference.ac.in" className="text-blue-700 hover:text-blue-800">papers@saraconference.ac.in</a>.
        </>
      ),
    },
    {
      q: 'Is accommodation provided?',
      a: 'We can assist in arranging accommodation at partner hotels. Please contact the General Inquiries desk for more details about available options and rates.',
    },
    {
      q: 'What are the visa requirements?',
      a: 'International participants should check with their respective embassies for visa requirements. We can provide an invitation letter upon request. Contact our general inquiries desk for assistance.',
    },
  ]

  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-2">Contact Information</h2>
          <p className="text-slate-500">Get in touch with us</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {contactCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                </div>
                <div className="space-y-3">
                  {card.contacts.map((contact, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{contact.label}</p>
                      <p className="text-slate-900 text-sm mt-0.5">
                        {contact.label === 'Email' ? (
                          <a href={`mailto:${contact.value}`} className="text-blue-700 hover:text-blue-800 break-all">{contact.value}</a>
                        ) : contact.label === 'Website' ? (
                          <a href={`https://${contact.value}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">{contact.value}</a>
                        ) : (
                          contact.value
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Venue Section */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 mb-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-blue-700" />
            Conference Venue
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-base font-semibold text-slate-900 mb-3">Saranathan College of Engineering</h4>
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="text-slate-900 font-medium">Address:</strong><br />Panjappur, Trichy - 620012<br />Tamil Nadu, India</p>
                <p><strong className="text-slate-900 font-medium">Facilities:</strong><br />Modern auditoriums, seminar halls, conference rooms</p>
                <p><strong className="text-slate-900 font-medium">Accessibility:</strong><br />Wheelchair accessible, parking available</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Saranathan College of Engineering is a premier institution affiliated to Anna University. Our
                state-of-the-art campus facilities provide an ideal environment for academic discourse and professional
                networking. The venue features modern infrastructure with comfortable accommodation options nearby.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 mb-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-semibold text-slate-900 mb-1.5">{faq.q}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form CTA */}
        <div className="bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_50%,#1e40af_100%)] rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Still Have Questions?</h3>
          <p className="mb-6 text-blue-200/80 text-sm">
            We are here to help! Feel free to reach out through any of the contact channels above.
          </p>
          <Link href="/contact-form" className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-blue-700 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
            Send us a Message
          </Link>
        </div>
      </div>
    </div>
  )
}
