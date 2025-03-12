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


// !--------------------------------------------------------------------------------
// ! Dynamic Menu
document.addEventListener("DOMContentLoaded", function () {
  let menuData = null;
    const menuContainer = document.querySelector(".menu-container");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const dropdownBtn = document.querySelector(".filter-dropdown-btn");
    const dropdownContent = document.querySelector(".filter-dropdown-content");
    const dropdownItems = document.querySelectorAll(".dropdown-item");


    // Fetch menu data
    fetch("menu-data.json")
        .then(response => response.json())
        .then(data => {
            menuData = data;
            displayMenuItems("all");
        })
        .catch(error => console.error("Error loading menu data:", error));


    // Function to scroll to menu title
    function scrollToMenuTitle() {
        setTimeout(() => {
            const menuTitle = document.querySelector(".menu-title");
            if (menuTitle) {
                const filterSection = document.querySelector(".filter-section");
                const filterHeight = filterSection.offsetHeight;
                const offset = 165; // Adjust this value based on your needs

                window.scrollTo({
                    top: menuTitle.offsetTop - filterHeight - offset,
                    behavior: "smooth"
                });
            }
        }, 100); // Small delay to ensure content is rendered
    }


    // Desktop filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            filterBtns.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const category = this.dataset.category;
            displayMenuItems(category);
            scrollToMenuTitle();
        });
    });


    // Mobile dropdown toggle
    dropdownBtn.addEventListener("click", function() {
        dropdownContent.classList.toggle("show");
        this.classList.toggle("active");
    });


    // Close dropdown when clicking outside
    window.addEventListener("click", function(e) {
        if (!e.target.closest(".filter-dropdown")) {
            dropdownContent.classList.remove("show");
            dropdownBtn.classList.remove("active");
        }
    });


    // Dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener("click", function() {
            const category = this.dataset.category;
            dropdownItems.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            
            // Update dropdown button text
            dropdownBtn.querySelector("span").textContent = this.textContent;
            
            // Close dropdown
            dropdownContent.classList.remove("show");
            dropdownBtn.classList.remove("active");
            
            // Display filtered items and scroll
            displayMenuItems(category);
            scrollToMenuTitle();
        });
    });


  // Function to display menu items
  function displayMenuItems(category) {
      let menuHTML = "";

      if (category === "all") {
          // Display all categories
          for (const categoryName in menuData) {
              menuHTML += generateCategoryHTML(categoryName, menuData[categoryName]);
          }
      } else {
          // Display single category
          const categoryItems = menuData[category];
          if (categoryItems) {
              menuHTML = generateCategoryHTML(category, categoryItems);
          }
      }

      menuContainer.innerHTML = menuHTML;
  }


  // Helper function to generate HTML for a category
  function generateCategoryHTML(categoryName, items) {
      let categoryHTML = `
          <h2 class="menu-title text-center">${categoryName}</h2>
          <div class="row align-items-center">
      `;

      items.forEach(item => {
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

      categoryHTML += `</div>`;
      return categoryHTML;
  }
});
