// Princess Run 3D - Dynamic Content Loader
// Loads header, footer and JSON content dynamically

class RoyalContentLoader {
  constructor() {
    this.basePath = "";
    this.init();
  }

  init() {
    this.loadHeader();
    this.loadFooter();
    this.loadPageContent();
  }

  // Load header dynamically
  async loadHeader() {
    try {
      const response = await fetch("princess-header.html");
      const headerHtml = await response.text();

      const headerPlaceholder = document.getElementById(
        "royal-header-placeholder"
      );
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHtml;

        // Re-initialize mobile menu after header is loaded
        if (window.initializeMobileMenu) {
          window.initializeMobileMenu();
        }
      }
    } catch (error) {
      console.error("Failed to load header:", error);
      this.showFallbackHeader();
    }
  }

  // Load footer dynamically
  async loadFooter() {
    try {
      const response = await fetch("royal-footer.html");
      const footerHtml = await response.text();

      const footerPlaceholder = document.getElementById(
        "royal-footer-placeholder"
      );
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHtml;

        // Set current year
        const currentYearElement = document.getElementById("current-year");
        if (currentYearElement) {
          currentYearElement.textContent = new Date().getFullYear();
        }
      }
    } catch (error) {
      console.error("Failed to load footer:", error);
      this.showFallbackFooter();
    }
  }

  // Load page-specific content from JSON
  async loadPageContent() {
    const currentPage = this.getCurrentPage();

    // Only load JSON content for pages that have JSON files
    if (["home", "updates", "contact"].includes(currentPage)) {
      try {
        const response = await fetch(`data/${currentPage}-content.json`);
        const pageData = await response.json();
        this.renderPageContent(pageData);
      } catch (error) {
        console.error(`Failed to load ${currentPage} content:`, error);
        this.loadFallbackContent();
      }
    }
  }

  // Get current page name
  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");

    // Map page names to JSON files
    const pageMap = {
      index: "home",
      "princess-updates": "updates",
      "contact-princess": "contact",
      "princess-disclaimer": "disclaimer",
      "princess-cookies": "cookies",
      "princess-privacy": "privacy",
    };

    return pageMap[filename] || "home";
  }

  // Render content based on page data
  renderPageContent(data) {
    const currentPage = this.getCurrentPage();

    switch (currentPage) {
      case "home":
        this.renderHomeContent(data);
        break;
      case "updates":
        this.renderUpdatesContent(data);
        break;
      case "contact":
        this.renderContactContent(data);
        break;
      case "disclaimer":
      case "cookies":
      case "privacy":
        // These pages don't need JSON content rendering
        break;
      default:
        console.log("No specific renderer for page:", currentPage);
    }
  }

  // Render home page content
  renderHomeContent(data) {
    // Features section
    if (data.features && data.features.length > 0) {
      const featuresContainer = document.getElementById("features-container");
      if (featuresContainer) {
        featuresContainer.innerHTML = data.features
          .map(
            (feature) => `
                    <div class="royal-feature-card">
                        <h3 class="royal-feature-title">${feature.title}</h3>
                        <p class="royal-feature-description">${
                          feature.description
                        }</p>
                        <div class="royal-feature-details">
                            <span class="royal-feature-tag">${
                              feature.title.split(" ")[0]
                            }</span>
                            <span class="royal-feature-tag">${
                              feature.title.split(" ").slice(-1)[0]
                            }</span>
                            <span class="royal-feature-tag">Feature</span>
                        </div>
                    </div>
                `
          )
          .join("");
      }
    }

    // Player reviews
    if (data.reviews && data.reviews.length > 0) {
      const reviewsContainer = document.getElementById("reviews-container");
      if (reviewsContainer) {
        reviewsContainer.innerHTML = data.reviews
          .map(
            (review) => `
                    <div class="royal-testimonial-card">
                        <p class="royal-testimonial-text">${review.text}</p>
                        <p class="royal-testimonial-author">- ${review.name}</p>
                    </div>
                `
          )
          .join("");
      }
    }

    // Royal wardrobe collection
    if (data.items && data.items.length > 0) {
      const itemsContainer = document.getElementById("items-container");
      if (itemsContainer) {
        itemsContainer.innerHTML = data.items
          .map(
            (item) => `
                     <div class="royal-wardrobe-card">
                         <h3 class="royal-wardrobe-title">${item.name}</h3>
                         <p class="royal-wardrobe-effect">${item.effect}</p>
                     </div>
                 `
          )
          .join("");
      }
    }

    // Royal wardrobe info text
    if (data.wardrobeInfo && data.wardrobeInfo.length > 0) {
      const infoContainer = document.getElementById("wardrobe-info-container");
      if (infoContainer) {
        infoContainer.innerHTML = `
           <h3 class="royal-wardrobe-info-title">Royal Collection Guide</h3>
           ${data.wardrobeInfo
             .map((info) => `<p class="royal-wardrobe-info-text">${info}</p>`)
             .join("")}
         `;
      }
    }

    // Royal stats and progress
    if (data.stats && data.stats.length > 0) {
      const statsContainer = document.getElementById("stats-container");
      if (statsContainer) {
        statsContainer.innerHTML = data.stats
          .map(
            (stat) => `
                     <div class="royal-stat-card">
                         <div class="royal-stat-number" data-value="${stat.value}">${stat.value}</div>
                         <div class="royal-stat-label">${stat.label}</div>
                     </div>
                 `
          )
          .join("");
      }
    }
  }

  // Render updates page content
  renderUpdatesContent(data) {
    // Game improvements
    if (data.improvements && data.improvements.length > 0) {
      const improvementsContainer = document.getElementById(
        "improvements-container"
      );
      if (improvementsContainer) {
        improvementsContainer.innerHTML = data.improvements
          .map(
            (improvement) => `
                    <div class="royal-update-card">
                        <h3 class="royal-update-title">${improvement.title}</h3>
                        <p class="royal-update-date">${improvement.date}</p>
                        <p class="royal-update-description">${improvement.description}</p>
                    </div>
                `
          )
          .join("");
      }
    }

    // Princess diaries
    if (data.diaries && data.diaries.length > 0) {
      const diariesContainer = document.getElementById("diaries-container");
      if (diariesContainer) {
        diariesContainer.innerHTML = data.diaries
          .map(
            (diary) => `
                    <div class="royal-chronicle-card">
                        <h3 class="royal-chronicle-title">${diary.title}</h3>
                        <p class="royal-chronicle-author">By ${diary.author}</p>
                        <p class="royal-chronicle-content">${diary.story}</p>
                        <p class="royal-chronicle-date">${diary.date}</p>
                    </div>
                `
          )
          .join("");
      }
    }
  }

  // Render contact page content
  renderContactContent(data) {
    // Contact details
    if (data.contactDetails) {
      const contactDetailsContainer =
        document.getElementById("contact-details");
      if (contactDetailsContainer) {
        contactDetailsContainer.innerHTML = `
                    <div class="contact-detail-item">
                        <h3>Email</h3>
                        <p><a href="mailto:${data.contactDetails.email}">${data.contactDetails.email}</a></p>
                        <p class="contact-description">Send us your royal messages and we'll respond within 24 hours</p>
                    </div>
                    <div class="contact-detail-item">
                        <h3>Phone</h3>
                        <p><a href="tel:${data.contactDetails.phone}">${data.contactDetails.phone}</a></p>
                        <p class="contact-description">Call us during business hours for immediate assistance</p>
                    </div>
                    <div class="contact-detail-item">
                        <h3>Address</h3>
                        <p>${data.contactDetails.address}</p>
                        <p class="contact-description">Visit our royal palace for in-person consultations</p>
                    </div>
                `;
      }
    }
  }

  // Load fallback content when JSON fails
  loadFallbackContent() {
    const currentPage = this.getCurrentPage();

    switch (currentPage) {
      case "home":
        this.loadFallbackHomeContent();
        break;
      case "updates":
        this.loadFallbackUpdatesContent();
        break;
      case "contact":
        this.loadFallbackContactContent();
        break;
      case "disclaimer":
      case "cookies":
      case "privacy":
        // These pages don't need fallback content
        break;
    }
  }

  // Fallback home content
  loadFallbackHomeContent() {
    const fallbackFeatures = [
      {
        icon: "🏃‍♀️",
        title: "Endless Running",
        description:
          "Run through beautiful 3D worlds with endless challenges and obstacles to overcome.",
      },
      {
        icon: "👗",
        title: "Outfit Collection",
        description:
          "Collect stunning dresses and accessories to increase your charisma and style.",
      },
      {
        icon: "✨",
        title: "Charisma Boost",
        description:
          "Level up your princess charisma by avoiding mud and collecting magical items.",
      },
    ];

    const featuresContainer = document.getElementById("features-container");
    if (featuresContainer) {
      featuresContainer.innerHTML = fallbackFeatures
        .map(
          (feature) => `
                <div class="feature-card">
                    <span class="feature-icon">${feature.icon}</span>
                    <h3 class="feature-title">${feature.title}</h3>
                    <p class="feature-description">${feature.description}</p>
                </div>
            `
        )
        .join("");
    }
  }

  // Fallback updates content
  loadFallbackUpdatesContent() {
    const fallbackImprovements = [
      {
        title: "New Princess Outfits",
        date: "February 2025",
        description:
          "Added 5 new beautiful dresses with special effects and charisma bonuses.",
      },
      {
        title: "Improved Obstacle System",
        date: "February 2025",
        description:
          "Enhanced mud patches and weather effects for more challenging gameplay.",
      },
    ];

    const improvementsContainer = document.getElementById(
      "improvements-container"
    );
    if (improvementsContainer) {
      improvementsContainer.innerHTML = fallbackImprovements
        .map(
          (improvement) => `
                <div class="royal-update-card">
                    <h3 class="royal-update-title">${improvement.title}</h3>
                    <p class="royal-update-date">${improvement.date}</p>
                    <p class="royal-update-description">${improvement.description}</p>
                </div>
            `
        )
        .join("");
    }
  }

  // Fallback contact content
  loadFallbackContactContent() {
    const contactDetailsContainer = document.getElementById("contact-details");
    if (contactDetailsContainer) {
      contactDetailsContainer.innerHTML = `
                <div class="contact-detail-item">
                    <h3>Email</h3>
                    <p><a href="mailto:princess@HyperPixelArena.com">princess@HyperPixelArena.com</a></p>
                    <p class="contact-description">Send us your royal messages and we'll respond within 24 hours</p>
                </div>
                <div class="contact-detail-item">
                    <h3>Phone</h3>
                    <p><a href="tel:+61865532918">+61 8 6553 2918</a></p>
                    <p class="contact-description">Call us during business hours for immediate assistance</p>
                </div>
                <div class="contact-detail-item">
                    <h3>Address</h3>
                    <p>5 Wattle Court Albany WA 6330 Australia</p>
                    <p class="contact-description">Visit our royal palace for in-person consultations</p>
                </div>
            `;
    }
  }

  // Show fallback header
  showFallbackHeader() {
    const headerPlaceholder = document.getElementById(
      "royal-header-placeholder"
    );
    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = `
                <header class="royal-header">
                    <div class="header-container">
                        <div class="logo-section">
                            <div class="royal-logo">
                                <span class="crown-icon">👑</span>
                                <span class="logo-text">Princess Run 3D</span>
                            </div>
                        </div>
                        <nav class="royal-navigation">
                            <ul class="nav-menu">
                                <li class="nav-item">
                                    <a href="index.html" class="nav-link dress-sprint">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a href="princess-updates.html" class="nav-link dress-sprint">News</a>
                                </li>
                                <li class="nav-item">
                                    <a href="contact-princess.html" class="nav-link dress-sprint">Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            `;
    }
  }

  // Show fallback footer
  showFallbackFooter() {
    const footerPlaceholder = document.getElementById(
      "royal-footer-placeholder"
    );
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = `
                <footer class="footer-royal">
                    <div class="footer-container">
                        <div class="footer-left-column">
                            <div class="footer-section">
                                <h3 class="footer-title">Legal</h3>
                                <ul class="footer-links">
                                    <li><a href="princess-cookies.html" class="footer-link">Cookie Policy</a></li>
                                    <li><a href="princess-privacy.html" class="footer-link">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div class="footer-section">
                                <h3 class="footer-title">Contact</h3>
                                <div class="footer-contact-info">
                                    <p class="footer-contact-item">
                                        <a href="mailto:princess@HyperPixelArena.com" class="footer-contact-link">princess@HyperPixelArena.com</a>
                                    </p>
                                    <p class="footer-contact-item">
                                        <a href="tel:+61865532918" class="footer-contact-link">+61 8 6553 2918</a>
                                    </p>
                                    <p class="footer-contact-item">
                                        <span class="footer-contact-text">5 Wattle Court Albany WA 6330 Australia</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="footer-bottom-content">
                            <p class="footer-copyright-text">
                                © ${new Date().getFullYear()} Princess Run 3D. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            `;
    }
  }
}

// Initialize the content loader when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  new RoyalContentLoader();
});

// Export for use in other modules
window.RoyalContentLoader = RoyalContentLoader;
