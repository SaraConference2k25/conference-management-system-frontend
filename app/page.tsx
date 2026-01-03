'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import AnnouncementBar from '@/components/AnnouncementBar'
import HomeSection from '@/components/HomeSection'
import RegistrationSection from '@/components/RegistrationSection'
import SubmissionSection from '@/components/SubmissionSection'
import PublicationSection from '@/components/PublicationSection'
import ContactsSection from '@/components/ContactsSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    closeMobileMenu()

    // Scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'registration':
        return <RegistrationSection />
      case 'submission':
        return <SubmissionSection />
      case 'publication':
        return <PublicationSection />
      case 'contacts':
        return <ContactsSection />
      default:
        return <HomeSection />
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <Navigation
        activeSection={activeSection}
        onNavClick={handleNavClick}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <AnnouncementBar />
      <main className="w-full">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}
