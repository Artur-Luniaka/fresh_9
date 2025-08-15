// Cookie Banner Functionality
document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookie-consent-banner");
  const acceptButton = document.getElementById("accept-cookies-btn");

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("princess-cookies-accepted");

  if (!cookiesAccepted) {
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 1000);
  }

  // Handle accept button click
  acceptButton.addEventListener("click", function () {
    // Save to localStorage
    localStorage.setItem("princess-cookies-accepted", "true");

    // Hide banner with animation
    cookieBanner.classList.remove("show");

    // Remove banner from DOM after animation
    setTimeout(() => {
      cookieBanner.style.display = "none";
    }, 300);
  });

  // Optional: Add escape key functionality
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cookieBanner.classList.contains("show")) {
      acceptButton.click();
    }
  });
});
