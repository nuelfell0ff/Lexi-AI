import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Faqs from './components/Faqs'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
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
}

export default App