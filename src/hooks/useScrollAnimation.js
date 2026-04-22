import { useEffect } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Wait for DOM to settle, then observe all elements
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach((element) => {
        observer.observe(element)
        // Check if element is already in view on page load
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('in-view')
        }
      })
    }, 100)

    return () => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])
}
