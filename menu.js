"use strict";

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


// ! --------------------------------------------------------------------------------
// ! Dynamic Menu Fetching
document.addEventListener("DOMContentLoaded", function () {
  fetch("menu-data.json")
      .then(response => response.json())
      .then(data => {
          const menuContainer = document.querySelector(".menu-container");

          let menuHTML = ""; // Store the full menu structure here

          for (const category in data) {
              let categoryHTML = `
                  <h2 class="menu-title text-center">${category}</h2>
                  <div class="row align-items-center">  
              `;
              // Open the row div

              data[category].forEach(item => {
                  categoryHTML += `
                      <div class="col-12 col-md-6">
                          <div class="food-card">
                              <div class="food-info">
                                  <img src="${item.img}" alt="${item['food-title']}">
                                  <div class="food-title">${item['food-title']}</div>
                              </div>
                              <div class="food-price">$${item['food-price']}</div>
                          </div>
                      </div>
                  `;
              });

              categoryHTML += `</div>`; // Close the row div
              menuHTML += categoryHTML; // Append category block to menuHTML
          }

          // Inject the final HTML into the menu container
          menuContainer.innerHTML = menuHTML;
      })
      .catch(error => console.error("Error loading menu data:", error));
});
