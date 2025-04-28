// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    // Cursor effects on links and buttons
    const links = document.querySelectorAll("a, button")
  
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorFollower.style.width = "50px"
        cursorFollower.style.height = "50px"
        cursorFollower.style.backgroundColor = "rgba(108, 99, 255, 0.1)"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
        cursorFollower.style.backgroundColor = "transparent"
      })
    })
  
    // Update current time
    function updateTime() {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const ampm = hours >= 12 ? "PM" : "AM"
  
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
  
      document.getElementById("current-time").textContent = `${hours}:${minutes} ${ampm}`
    }
  
    // Update time immediately and then every minute
    updateTime()
    setInterval(updateTime, 60000)
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll(".project, .about-content, .project-item")
  
    function revealOnScroll() {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for reveal elements
    revealElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    })
  
    // Check for elements in view on load and scroll
    window.addEventListener("load", revealOnScroll)
    window.addEventListener("scroll", revealOnScroll)
  })
  