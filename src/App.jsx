import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Faqs from './components/Faqs'
import Footer from './components/Footer'
import Loading from './components/Loading'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/company/About'
import AboutMedxVerse from './pages/company/AboutMedxVerse'
import Leadership from './pages/company/Leadership'
import Careers from './pages/company/Careers'
import Press from './pages/company/Press'
import Blog from './pages/company/Blog'
import Newsroom from './pages/company/Newsroom'
import AISymptomChecker from './pages/Products'
import VirtualHealthAssistant from './pages/VirtualHealthAssistant'
import ChronicDiseaseManagement from './pages/ChronicDiseaseManagement'
import MentalHealthSupport from './pages/MentalHealthSupport'
import WomensHealth from './pages/WomensHealth'
import PreventiveHealthMonitoring from './pages/PreventiveHealthMonitoring'
import APIDeveloperPlatform from './pages/APIDeveloperPlatform'
import PartnerWithLexiAI from './pages/partner/PartnerWithLexiAI'
import HealthcareProviders from './pages/partner/HealthcareProviders'
import GovernmentsAndPublicHealth from './pages/partner/GovernmentsAndPublicHealth'
import NGOsAndGlobalHealth from './pages/partner/NGOsAndGlobalHealth'
import InsuranceAndFintech from './pages/partner/InsuranceAndFintech'
import PharmaceuticalPartnerships from './pages/partner/PharmaceuticalPartnerships'
import CorporateWellness from './pages/partner/CorporateWellness'
import PrivacyPolicy from './pages/partner/PrivacyPolicy'
import DataProtectionAndSecurity from './pages/partner/DataProtectionAndSecurity'
import AIEthics from './pages/AIEthics'
import MedicalDisclaimer from './pages/MedicalDisclaimer'
import RegulatoryCompliance from './pages/RegulatoryCompliance'
import HIPAAGDPRAlignment from './pages/HIPAAGDPRAlignment'
import TermsOfService from './pages/TermsOfService'

const Home = ({ isLoading }) => (
  <>
    {isLoading && <Loading />}
    <Navbar />
    <section id="home">
      <Hero />
    </section>
    <section id="features">
      <Features />
    </section>
    <section id="pricing">
      <Pricing />
    </section>
    <section id="faq">
      <Faqs />
    </section>
    <section id="contact">
      <Footer />
    </section>
  </>
)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/ai-symptom-checker" element={<AISymptomChecker />} />
        <Route path="/virtual-health-assistant" element={<VirtualHealthAssistant />} />
        <Route path="/chronic-disease-management" element={<ChronicDiseaseManagement />} />
        <Route path="/mental-health-support" element={<MentalHealthSupport />} />
        <Route path="/womens-health" element={<WomensHealth />} />
        <Route path="/preventive-health-monitoring" element={<PreventiveHealthMonitoring />} />
        <Route path="/api-developer-platform" element={<APIDeveloperPlatform />} />
        <Route path="/partner-with-lexi-ai" element={<PartnerWithLexiAI />} />
        <Route path="/healthcare-providers" element={<HealthcareProviders />} />
        <Route path="/governments-and-public-health" element={<GovernmentsAndPublicHealth />} />
        <Route path="/ngos-and-global-health" element={<NGOsAndGlobalHealth />} />
        <Route path="/insurance-and-fintech" element={<InsuranceAndFintech />} />
        <Route path="/pharmaceutical-partnerships" element={<PharmaceuticalPartnerships />} />
        <Route path="/corporate-wellness" element={<CorporateWellness />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/data-protection-and-security" element={<DataProtectionAndSecurity />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-medxverse" element={<AboutMedxVerse />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/ai-ethics-responsible-ai" element={<AIEthics />} />
        <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
        <Route path="/regulatory-compliance" element={<RegulatoryCompliance />} />
        <Route path="/hipaa-gdpr-alignment" element={<HIPAAGDPRAlignment />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  )
}

export default App