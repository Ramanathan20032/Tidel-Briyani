"use strict";

// ! -------------------------------------------------------------------------
// ! PRELOAD - loading will be end after document is loaded /
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preload");

  window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });
});

// ! -------------------------------------------------------------------------
// ! NAVBAR - Sticky /
window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".z-navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// ! -------------------------------------------------------------------------
// ! SIDE NAV Functionality /
const sidebarIcon = document.querySelector(".hamburger");
const x_mark = document.querySelector(
  ".side-nav .side-nav-container .img-cross .x-mark"
);

const sideNav = document.querySelector(".side-nav .side-nav-container");

// * hamburger /
sidebarIcon.addEventListener("click", () => {
  sideNav.classList.add("active");
});

// * x-mark /
x_mark.addEventListener("click", closeSideNav);

// Function to close sideNav and overlay
function closeSideNav() {
  sideNav.classList.remove("active"); // Hide sideNav first
  setTimeout(() => {
    document.querySelector(".overlay").classList.remove("show"); // Hide overlay after sideNav hides
  }, 300); // Wait for sideNav transition (0.3s)
}

sidebarIcon.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay");

  overlay.classList.add("show"); // Show overlay first
  setTimeout(() => {
    sideNav.classList.add("active"); // Show sideNav after 0.1s
  }, 100);
});

// Close when clicking outside of sideNav (i.e., clicking on overlay)
document.querySelector(".overlay").addEventListener("click", closeSideNav);

// Automatically close sideNav when screen size is above 768px
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeSideNav();
  }
});

// ? ----------------------------------------------------
// ? ----------------------------------------------------
// ? Animation

// !--------------------------------------------------------------------------------
// ! Banner Animation
document.addEventListener("DOMContentLoaded", function () {
  const welcomeText = document.querySelector(".banner-wrapper .welcome-text");
  const bannerText = document.querySelector(".banner-container p");
  const bannerTagLine = document.querySelector(".banner-container p");

  setTimeout(() => {
    welcomeText.style.opacity = "1";
    bannerText.style.opacity = "1";
    bannerTagLine.style.opacity = "1";
  }, 1000); // Delays animation for better effect
});

// !--------------------------------------------------------------------------------
// ! About Us Animation
document.addEventListener("DOMContentLoaded", function () {
  const elementsToObserve = document.querySelectorAll(".zoom, .up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // To trigger only once
        }
      });
    },
    { threshold: 0.1 }
  );

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
});

// !--------------------------------------------------------------------------------
// ! Popular Animation
document.addEventListener("DOMContentLoaded", () => {
  const zoomElements = document.querySelectorAll(
    ".popular-wrapper .popular-container .row .e-zoom"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // Stop observing after animation triggers
      }
    });
  });

  zoomElements.forEach((element) => {
    observer.observe(element);
  });
});

// !--------------------------------------------------------------------------------
// ! Features Animation
document.addEventListener("DOMContentLoaded", function () {
  const elementsToObserve = document.querySelectorAll(".zoom1, .up1");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // To trigger only once
        }
      });
    },
    { threshold: 0.1 }
  );

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
});

// !--------------------------------------------------------------------------------
// ! Counter Animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stats-count");

  const updateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = Math.max(target / 50);

    let count = 0;
    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.min(Math.ceil(count), target);
        requestAnimationFrame(update);
      } else {
        counter.innerText = `${target}+`;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          updateCounter(counter);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

// ? Animation
// ? ----------------------------------------------------
// ? ----------------------------------------------------

// !--------------------------------------------------------------------------------
// ! Gallery In - View
const galleryImages = document.querySelectorAll(".big, .small");

// Get the lightbox and lightbox image elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".lightbox .close");

// Add event listener to each .big and .small container
galleryImages.forEach((container) => {
  container.addEventListener("click", (e) => {
    // Get the inner img element inside the clicked .big or .small div
    const imgElement = container.querySelector("img");
    
    if (imgElement) {
      lightboxImage.src = imgElement.src;
      lightbox.style.display = "flex";
    }
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});


// !--------------------------------------------------------------------------------
// !Testimonial Section
document.addEventListener('DOMContentLoaded', function () {
  const testimonials = [
    {
        content: `Hands down the best biriyani spot in Chennai! The dum biriyani and kebabs are phenomenal. A must-visit if you're near Edison.  
                  The service is super fast and efficient. The aroma is irresistible, and the taste is simply out of this world. Highly recommend this place!`,
        name: `Shravankumar Hiregoudar`
    },
    {
        content: `Incredible biriyani flavors! The texture, spices, and tenderness of the meat are outstanding. Even with a full house, our meals were served quickly.  
                  Special thanks to Rajesh for his polite and prompt service. This place truly deserves five stars. Will surely visit again for a great meal.`,
        name: `Suhas Biwalkar`
    },
    {
        content: `This place is fantastic! They offer a huge variety of biriyani, and every dish is packed with authentic flavors.  
                  I personally love their Hyderabadi and Lucknowi biriyani. If you’re a biriyani lover, I highly recommend this restaurant to everyone.`,
        name: `Om Sonani`
    }
];


  const contentElement = document.querySelector('.testimonial-wrapper .testimonial-content');
  const nameElement = document.querySelector('.testimonial-wrapper .testimonial-name');
  const circleSpans = document.querySelectorAll('.testimonial-wrapper .next-circle span');
  let currentIndex = 0;
  let interval;

  function updateTestimonial(index) {
      // Update content and name
      contentElement.textContent = testimonials[index].content;
      nameElement.textContent = testimonials[index].name;

      // Update active span indicator
      circleSpans.forEach((span, spanIndex) => {
          span.classList.toggle('active', spanIndex === index);   // toggle --- if(add-class ,true) else(remove-class, false)
      });

      // Update currentIndex
      currentIndex = index;
  }

  function startAutoRotation() {
      interval = setInterval(() => {
          const nextIndex = (currentIndex + 1) % testimonials.length;
          updateTestimonial(nextIndex);
      }, 4000);
  }

  // Initialize display and auto-rotation
  updateTestimonial(currentIndex);
  startAutoRotation();

  // Event listeners for clicking on spans to manually navigate
  circleSpans.forEach((span, index) => {
      span.addEventListener('click', () => {
          clearInterval(interval); // Stop auto-rotation
          updateTestimonial(index); // Show the clicked testimonial
          startAutoRotation(); // Restart auto-rotation
      });
  });
});


// !--------------------------------------------------------------------------------
// !Page-Up
document.addEventListener("DOMContentLoaded", () => {
  const pageUp = document.querySelector(".page-up");

  if (!pageUp) {
    console.error("Error: .page-up element not found in the DOM");
    return;
  }

  window.addEventListener("scroll", () => {
  //   console.log("Current Scroll Position (window.scrollY):", window.scrollY); 
    if (window.scrollY >= 120) {  // Ensure visibility after 120px
      pageUp.classList.add("show");
      // console.log("page-up is now visible!"); 
    } else {
      pageUp.classList.remove("show");
      // console.log("page-up is hidden!"); 
    }
  });

  pageUp.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});  
