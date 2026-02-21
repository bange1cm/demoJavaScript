// DOM Elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const colorBox = document.getElementById("colorBox");
const counterDisplay = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const rotateBox = document.getElementById("rotateBox");
const slidePanel = document.getElementById("slidePanel");

// State variables
let counter = 0;
let currentSlide = 0;
let carouselSlides = document.querySelectorAll(".carousel-slide");
let carouselIndicators = document.querySelectorAll(".indicator");
let autoSlideInterval;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  startAutoSlide();
});

// Event Listeners
function initializeEventListeners() {
  // Hamburger menu
  hamburger.addEventListener("click", toggleHamburgerMenu);

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal on escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  // Rotate box click
  rotateBox.addEventListener("click", rotateElement);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Hamburger Menu Functionality
function toggleHamburgerMenu() {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Animate hamburger lines
  const spans = hamburger.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
}

// Modal Functionality
function showModal(type) {
  let content = "";

  switch (type) {
    case "welcome":
      content = `
                <div class="modal-header">
                    <h2>Welcome to JavaScript Demo!</h2>
                </div>
                <div class="modal-body">
                    <p>This interactive demo showcases various JavaScript and HTML features including:</p>
                    <ul>
                        <li>Responsive navigation with dropdown menus</li>
                        <li>Image carousel with auto-play</li>
                        <li>Modal dialogs and pop-ups</li>
                        <li>CSS animations and transitions</li>
                        <li>Interactive elements and form validation</li>
                        <li>API integration examples</li>
                    </ul>
                    <p>Explore the different sections to see vanilla JavaScript in action!</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="closeModal()">Get Started</button>
                </div>
            `;
      break;

    case "formDemo":
      content = `
                <div class="modal-header">
                    <h2>Form Validation Demo</h2>
                </div>
                <div class="modal-body">
                    <form id="demoForm">
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="message">Message:</label>
                            <textarea id="message" name="message" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 80px;"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            `;

      // Add form validation after modal is shown
      setTimeout(() => {
        const form = document.getElementById("demoForm");
        if (form) {
          form.addEventListener("submit", validateForm);
        }
      }, 100);
      break;

    case "apiDemo":
      content = `
                <div class="modal-header">
                    <h2>API Demo</h2>
                </div>
                <div class="modal-body">
                    <p>Click the button to fetch a random joke from an API:</p>
                    <div id="jokeContainer" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; min-height: 60px; display: flex; align-items: center;">
                        <p style="margin: 0; font-style: italic;">Click "Get Joke" to load a random joke...</p>
                    </div>
                    <button class="btn btn-primary" onclick="fetchJoke()">Get Joke</button>
                </div>
            `;
      break;
  }

  modalBody.innerHTML = content;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Carousel Functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 4000);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % carouselSlides.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide =
    (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  // Update slides
  carouselSlides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  // Update indicators
  carouselIndicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });

  // Move carousel
  const carousel = document.querySelector(".carousel");
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Interactive Elements
function changeColor() {
  const colors = [
    "#667eea",
    "#764ba2",
    "#f093fb",
    "#f5576c",
    "#4facfe",
    "#00f2fe",
    "#43e97b",
    "#38f9d7",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.background = randomColor;
}

function startProgress() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        progressBar.style.width = "0%";
      }, 1000);
    }
  }, 50);
}

// Animation Functions
function rotateElement() {
  const currentRotation = rotateBox.style.transform || "rotate(0deg)";
  const currentAngle =
    parseInt(currentRotation.replace("rotate(", "").replace("deg)", "")) || 0;
  const newAngle = currentAngle + 360;
  rotateBox.style.transform = `rotate(${newAngle}deg)`;
}

function toggleSlide() {
  slidePanel.classList.toggle("visible");
}

// Modal-specific functions
function changeModalColor() {
  const modalColorBox = document.getElementById("modalColorBox");
  if (modalColorBox) {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#f5576c",
      "#4facfe",
      "#00f2fe",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    modalColorBox.style.background = randomColor;
  }
}

// Form Validation
function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;
  let errors = [];

  // Name validation
  if (name.length < 2) {
    isValid = false;
    errors.push("Name must be at least 2 characters long");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    isValid = false;
    errors.push("Please enter a valid email address");
  }

  // Message validation
  if (message.length < 10) {
    isValid = false;
    errors.push("Message must be at least 10 characters long");
  }

  if (isValid) {
    // Show success message
    modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Form Submitted Successfully!</h2>
            </div>
            <div class="modal-body">
                <div style="text-align: center; color: #28a745;">
                    <h3>✓ Thank you for your submission!</h3>
                    <p>Your form has been validated and processed.</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        `;
  } else {
    // Show error message
    const errorHtml = errors.map((error) => `<li>${error}</li>`).join("");
    modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Form Validation Error</h2>
            </div>
            <div class="modal-body">
                <div style="color: #dc3545;">
                    <h3>Please fix the following errors:</h3>
                    <ul>${errorHtml}</ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="showModal('formDemo')">Try Again</button>
            </div>
        `;
  }
}

// API Demo
async function fetchJoke() {
  const jokeContainer = document.getElementById("jokeContainer");

  try {
    jokeContainer.innerHTML = '<p style="margin: 0;">Loading joke...</p>';

    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke",
    );
    const data = await response.json();

    jokeContainer.innerHTML = `
            <div>
                <p style="margin: 0; font-weight: bold;">${data.setup}</p>
                <p style="margin: 10px 0 0 0; font-style: italic; color: #667eea;">${data.punchline}</p>
            </div>
        `;
  } catch (error) {
    jokeContainer.innerHTML =
      '<p style="margin: 0; color: #dc3545;">Failed to load joke. Please try again.</p>';
    console.error("Error fetching joke:", error);
  }
}

// Utility function to add button small class for todo buttons
document.addEventListener("DOMContentLoaded", function () {
  // Add CSS for small buttons
  const style = document.createElement("style");
  style.textContent = `
        .btn-sm {
            padding: 5px 10px;
            font-size: 0.8rem;
            border-radius: 3px;
        }
    `;
  document.head.appendChild(style);
});
