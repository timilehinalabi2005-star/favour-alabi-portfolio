const filterButtons = document.querySelectorAll(".filter-button");
const toolCards = document.querySelectorAll(".tool-card");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const siteHeader = document.querySelector(".site-header");
const yearLabel = document.querySelector("#current-year");
const heroVideo = document.querySelector(".photo-main");
const videoToggle = document.querySelector(".video-toggle");
const printCvButton = document.querySelector(".print-cv");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(filterButton => {
            const isSelected = filterButton === button;
            filterButton.classList.toggle("is-selected", isSelected);
            filterButton.setAttribute("aria-pressed", String(isSelected));
        });

        toolCards.forEach(card => {
            card.hidden = selectedFilter !== "all" && card.dataset.category !== selectedFilter;
        });
    });
});

if (menuToggle && navMenu) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        navMenu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
        navMenu.classList.toggle("is-open", !isExpanded);
        document.body.classList.toggle("menu-open", !isExpanded);
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

if (siteHeader) {
    const updateHeader = () => {
        siteHeader.classList.toggle("has-shadow", window.scrollY > 8);
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
}

if (yearLabel) {
    yearLabel.textContent = new Date().getFullYear();
}

if (printCvButton) {
    printCvButton.addEventListener("click", () => window.print());
}

if (heroVideo && videoToggle) {
    const updateVideoToggle = () => {
        const isPaused = heroVideo.paused;
        videoToggle.textContent = isPaused ? "Play video" : "Pause video";
        videoToggle.setAttribute("aria-label", `${isPaused ? "Play" : "Pause"} cybersecurity video`);
    };

    heroVideo.addEventListener("play", updateVideoToggle);
    heroVideo.addEventListener("pause", updateVideoToggle);
    videoToggle.addEventListener("click", async () => {
        if (heroVideo.paused) {
            try {
                await heroVideo.play();
            } catch {
                videoToggle.textContent = "Video unavailable";
                videoToggle.disabled = true;
            }
        } else {
            heroVideo.pause();
        }
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heroVideo.pause();
    }
}