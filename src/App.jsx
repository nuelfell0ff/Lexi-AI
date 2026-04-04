import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Faqs from './components/Faqs'
import Footer from './components/Footer'
import Loading from './components/Loading'

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
}

export default App