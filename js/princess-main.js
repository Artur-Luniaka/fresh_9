// Princess Run 3D - Main JavaScript
// Royal functions and game mechanics

// Game state variables
let collectedOutfits = [];
let charismaScore = 0;
let currentLevel = 1;
let isGameRunning = false;

// Royal game functions
function dashThroughObstacles() {
  console.log("🏃‍♀️ Princess is dashing through obstacles!");
  charismaScore += 10;
  updateCharismaDisplay();
}

function upgradeCharisma() {
  console.log("✨ Upgrading princess charisma!");
  charismaScore += 25;
  updateCharismaDisplay();
}

function avoidMudPatch() {
  console.log("🚫 Princess avoided the mud patch!");
  charismaScore += 15;
  updateCharismaDisplay();
}

function collectOutfit(outfitType) {
  console.log(`👗 Princess collected ${outfitType}!`);
  collectedOutfits.push(outfitType);
  charismaScore += 20;
  updateCharismaDisplay();
  updateOutfitsDisplay();
}

function updateCharismaDisplay() {
  const charismaElements = document.querySelectorAll(".charisma-score");
  charismaElements.forEach((element) => {
    element.textContent = charismaScore;
  });
}

function updateOutfitsDisplay() {
  const outfitsContainer = document.getElementById("collected-outfits");
  if (outfitsContainer) {
    outfitsContainer.innerHTML = collectedOutfits
      .map((outfit) => `<span class="outfit-badge">${outfit}</span>`)
      .join("");
  }
}

// Mobile menu functionality removed - using adaptive navigation

// Start Run button functionality
function initializePlayButton() {
  const startRunButton = document.querySelector(".start-run-button");
  if (startRunButton) {
    startRunButton.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("🎮 Starting Princess Run 3D!");
      this.textContent = "Loading...";
      this.style.pointerEvents = "none";

      // Simulate game loading
      setTimeout(() => {
        this.textContent = "Game Started!";
        isGameRunning = true;

        // Reset button after a delay
        setTimeout(() => {
          this.textContent = "Start Run";
          this.style.pointerEvents = "auto";
        }, 2000);
      }, 1500);
    });
  }
}

// Form handling
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get("name").trim();
      const phone = formData.get("phone").trim();
      const message = formData.get("message").trim();

      // Simple validation - check if fields are filled
      if (!name) {
        showSimpleNotification("Please enter your name!");
        return;
      }

      if (!phone) {
        showSimpleNotification("Please enter your phone number!");
        return;
      }

      if (!message) {
        showSimpleNotification("Please enter your message!");
        return;
      }

      // Show processing overlay and scroll to top
      showProcessingOverlay();
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Simulate form processing
      setTimeout(() => {
        // Show notification first
        showSimpleNotification(
          "Message sent successfully! We will reply soon!"
        );

        // Hide overlay after notification is shown
        setTimeout(() => {
          hideProcessingOverlay();
        }, 100);

        // Reset form
        this.reset();
      }, 3000);
    });
  }
}

// Processing overlay functions
function showProcessingOverlay() {
  const overlay = document.getElementById("processing-overlay");
  if (overlay) {
    overlay.classList.add("show");
  }
}

function hideProcessingOverlay() {
  const overlay = document.getElementById("processing-overlay");
  if (overlay) {
    overlay.classList.remove("show");
  }
}

// Simple notification system
function showSimpleNotification(message) {
  const notification = document.createElement("div");
  notification.className = "simple-notification";
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Auto hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Parallax effect removed - keeping only transitions and hover effects

// Animated counters removed - keeping only transitions and hover effects

// Cookie consent
function initializeCookieConsent() {
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    const consentBanner = document.createElement("div");
    consentBanner.className = "cookie-consent-banner";
    consentBanner.innerHTML = `
            <div class="consent-content">
                <p>🍪 We use cookies to enhance your royal experience!</p>
                <div class="consent-buttons">
                    <button class="consent-accept dress-sprint">Accept</button>
                    <button class="consent-decline mud-dodge">Decline</button>
                </div>
            </div>
        `;

    document.body.appendChild(consentBanner);

    // Handle consent
    const acceptBtn = consentBanner.querySelector(".consent-accept");
    const declineBtn = consentBanner.querySelector(".consent-decline");

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      consentBanner.remove();
    });

    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      consentBanner.remove();
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializePlayButton();
  initializeContactForm();
  initializeSmoothScrolling();
  initializeCookieConsent();

  // Set current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// Royal sparkle effect removed - keeping only transitions and hover effects

// Export functions for use in other modules
window.PrincessRun3D = {
  dashThroughObstacles,
  upgradeCharisma,
  avoidMudPatch,
  collectOutfit,
  showSimpleNotification,
  showProcessingOverlay,
  hideProcessingOverlay,
};
