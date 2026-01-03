import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon, DocumentIcon, MapPinIcon } from './Icons';

export default function ContactsSection() {
  const contactCards = [
    {
      title: 'General Inquiries',
      icon: <EnvelopeIcon />,
      contacts: [
        { label: 'Email', value: 'conference@saranathan.ac.in' },
        { label: 'Phone', value: '+91-431-2760801, 2760802' },
        { label: 'Website', value: 'www.saranathan.ac.in' },
      ],
    },
    {
      title: 'Conference Chair',
      icon: <PhoneIcon />,
      contacts: [
        { label: 'Name', value: 'Dr. Conference Chair' },
        { label: 'Email', value: 'chair@saraconference.ac.in' },
        { label: 'Phone', value: '+91-9XXXXXXXXX' },
      ],
    },
    {
      title: 'Paper Submission',
      icon: <DocumentIcon />,
      contacts: [
        { label: 'Department', value: 'Technical Program Committee' },
        { label: 'Email', value: 'papers@saraconference.ac.in' },
        { label: 'Phone', value: '+91-9XXXXXXXXX' },
      ],
    },
    {
      title: 'Registration Queries',
      icon: <MapPinIcon />,
      contacts: [
        { label: 'Department', value: 'Registration Desk' },
        { label: 'Email', value: 'registration@saraconference.ac.in' },
        { label: 'Phone', value: '+91-9XXXXXXXXX' },
      ],
    },
  ]

  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Get in Touch with Us</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-600 overflow-hidden"
            >
              {/* Icon Badge Header */}
              <div className="h-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center px-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                  {card.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {card.title}
                </h3>
                <div className="space-y-4">
                  {card.contacts.map((contact, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{contact.label}</p>
                      <p className="text-gray-900 dark:text-white mt-1">
                        {contact.label === 'Email' ? (
                          <a
                            href={`mailto:${contact.value}`}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 break-all"
                          >
                            {contact.value}
                          </a>
                        ) : contact.label === 'Website' ? (
                          <a
                            href={`https://${contact.value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          contact.value
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Venue Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-indigo-800 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <MapPinIcon className="w-8 h-8 text-blue-600" />
            Conference Venue
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Saranathan College of Engineering
              </h4>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Address:</strong><br />
                  Panjappur, Trichy - 620012<br />
                  Tamil Nadu, India
                </p>
                <p>
                  <strong>Facilities:</strong><br />
                  Modern auditoriums, seminar halls, conference rooms
                </p>
                <p>
                  <strong>Accessibility:</strong><br />
                  Wheelchair accessible, parking available
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Saranathan College of Engineering is a premier institution affiliated to Anna University. Our
                state-of-the-art campus facilities provide an ideal environment for academic discourse and professional
                networking. The venue features modern infrastructure with comfortable accommodation options nearby.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What if I have questions about registration?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Please reach out to our Registration Desk at{' '}
                <a
                  href="mailto:registration@saraconference.ac.in"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  registration@saraconference.ac.in
                </a>{' '}
                or call +91-9XXXXXXXXX for immediate assistance.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do I submit my paper?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                After registering, you can submit your paper through our online portal. For any submission-related
                queries, contact our Technical Program Committee at{' '}
                <a
                  href="mailto:papers@saraconference.ac.in"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  papers@saraconference.ac.in
                </a>
                .
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is accommodation provided?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                We can assist in arranging accommodation at partner hotels. Please contact the General Inquiries desk
                for more details about available options and rates.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What are the visa requirements?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                International participants should check with their respective embassies for visa requirements. We can
                provide an invitation letter upon request. Contact our general inquiries desk for assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="mb-6 text-blue-100">
            We are here to help! Feel free to reach out through any of the contact channels above.
          </p>
          <Link
            href="/contact-form"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Send us a Message
          </Link>
        </div>
      </div>
    </div>
  )
}
