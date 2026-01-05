document.addEventListener('DOMContentLoaded', () => {
  // 1. Unified Year Update
  const currentYear = new Date().getFullYear()
  // Using querySelectorAll lets us update both IDs at once if they exist
  document.querySelectorAll('#currentYear, #year').forEach(el => {
    el.textContent = currentYear;
  })

  // 2. Smooth Scroll for local links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })

  // 3. Performance-Optimized Back to Top (Using Intersection Observer)
  const backToTop = document.getElementById("backToTop")
  const heroSection = document.querySelector('.hero') // To Observe hero section

  if (backToTop && heroSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // If the Hero section is NOT visible, show the button
        if (!entry.isIntersecting) {
          backToTop.style.display = "flex"
          setTimeout(() => backToTop.style.opacity = "1", 10)
        } else {
          backToTop.style.opacity = "0"
          setTimeout(() => {
            if (backToTop.style.opacity === "0") backToTop.style.display = "none"
          }, 300)
        }
      })
    }, { threshold: 0 }) // Trigger as soon as Hero leaves viewport

    observer.observe(heroSection)
  }

  // 4. Project Roadmap Links - Feedback for "Soon" features
  document.querySelectorAll('.in-progress-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      alert("🚀 This project is currently being containerized for AWS deployment. Check back in a few days!")
    })
  })
})
