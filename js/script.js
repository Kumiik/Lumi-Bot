const commandsData = {
  funRandom: {
    icon: "🎲",
    title: "Fun & Random",
    subtitle: "Zábavné príkazy",
    commands: [
      { name: "!roll", description: "Hod kockou", permission: "All" },
      { name: "!flip", description: "Hod mincou", permission: "All" },
      { name: "owo / uwu", description: "odpovede späť", permission: "All" },
      { name: "!fox / !cat / !dog", description: "Obrázky zvieratiek", permission: "All" },
      { name: "!bbyfur", description: "Babyfur obrázky", permission: "All" },
      { name: "!say (text)", description: "Zopakuje správu", permission: "All" },
      { name: "!pp", description: "PP meter", permission: "All" },
      { name: "!gay", description: "Gay meter", permission: "All" },
      { name: "!meme", description: "Random meme", permission: "All" },
      { name: "!decide", description: "Vyberie jedno z tvojích dvoch možností", permission: "All" },
      { name: "!komix", description: "ABDL komiksy!", permission: "All" },
    ],
  },
  interakcie: {
    icon: "💖",
    title: "Interakcie",
    subtitle: "Akcie medzi používateľmi",
    commands: [
      { name: "!hug", description: "Objatie", permission: "All" },
      { name: "!cuddle", description: "Cuddle", permission: "All" },
      { name: "!pat", description: "Pohladkanie", permission: "All" },
      { name: "!snack", description: "Daruješ snack", permission: "All" },
    ],
  },
  minihry: {
    icon: "🎮",
    title: "Minihry",
    subtitle: "Hry a výzvy",
    commands: [
      { name: "!counting", description: "Nastaví counting kanál", permission: "All" },
      { name: "!wordgame", description: "Slovný football", permission: "All" },
      { name: "!kpn / @user", description: "Kameň, papier, nožnice", permission: "All" },
      {
        name: "!pet",
        description: "Aktivuješ Lumiho ako mazlíka ↳ !check · !feed · !change · !play · !sleep",
        permission: "All",
      },
    ],
  },
  ekonomika: {
    icon: "💸",
    title: "Ekonomika",
    subtitle: "Money & shop systém",
    commands: [
      { name: "!daily", description: "Denná odmena", permission: "All" },
      { name: "!bump", description: "Odmena za bump servera", permission: "All" },
      { name: "!coins", description: "Zostatok coinov", permission: "All" },
      { name: "!shop", description: "Lumiho obchodík", permission: "All" },
      { name: "!batoh", description: "Tvoj inventár", permission: "All" },
    ],
  },
  narodeniny: {
    icon: "🎂",
    title: "Narodeniny",
    subtitle: "Birthday systém",
    commands: [
      { name: "!bday", description: "Uloží tvoje narodeniny", permission: "All" },
      { name: "!listbday", description: "Zoznam narodenín", permission: "All" },
      { name: "!setbdaychannel", description: "Nastaví B-day kanál", permission: "All" },
    ],
  },
  nastroje: {
    icon: "⚙️",
    title: "Nástroje",
    subtitle: "Užitočné utility",
    commands: [
      { name: "!profile", description: "Vytvorí ti tvoju profile kartičku", permission: "All" },
      { name: "!info", description: "Analýza používateľa", permission: "All" },
      { name: "!stats", description: "Diagnostika bota", permission: "All" },
      { name: "!avatar", description: "Profilový obrázok", permission: "All" },
      { name: "!potty", description: "Tvoj potty kalendár", permission: "All" },
      { name: "!voicecreate", description: "Nastaví private VC (Admin)", permission: "Admin" },
      { name: "!confession", description: "Anonymné správy (Admin tool)", permission: "Admin" },
      { name: "!clean (count)", description: "Admin tool", permission: "Admin" },
    ],
  },
};

function createCategoryButton(key, category) {
  return `
        <div class="bg-white/5 rounded-2xl border border-white/10" id="${key}-container">
            <button class="w-full px-8 py-6 text-left text-2xl font-semibold" onclick="toggleCategory('${key}')">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                            ${category.icon}
                        </div>
                        <div class="flex flex-col text-left">
                            <span>${category.title}</span>
                            <span class="text-sm text-white/70 mt-1">${category.subtitle}</span>
                        </div>
                    </div>
                    <svg class="w-6 h-6 transform transition-transform" id="${key}-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </button>
            <div class="hidden px-8 pb-6 space-y-4" id="${key}-commands">
                <!-- Commands will be loaded here when category is opened -->
            </div>
        </div>
    `;
}

function createCommandHTML(cmd) {
  return `
        <div class="command-card bg-white/5 p-6 rounded-xl border border-white/10">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="text-xl font-semibold mb-2">${cmd.name}</h4>
                    <p class="text-white/70">${cmd.description}</p>
                </div>
                <span class="px-3 py-1 bg-[#9C8CFF]/20 text-[#9C8CFF] rounded-lg text-sm">
                    ${cmd.permission}
                </span>
            </div>
        </div>
    `;
}

const loadedCategories = new Set();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 500);
    }
  }, 1000);
});

gsap.registerPlugin(ScrollTrigger);
gsap.from("#hero-heading", {
  opacity: 0,
  y: 50,
  duration: 1.5,
  delay: 0.5,
  ease: "power4.out",
});

gsap.from("#hero-subheading", {
  opacity: 0,
  y: 30,
  duration: 1.2,
  delay: 0.7,
  ease: "power4.out",
});

gsap.from("#hero-button1", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 1,
  ease: "power4.out",
});

gsap.from("#hero-button2", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 1.2,
  ease: "power4.out",
});

gsap.from("#hero-logo", {
  opacity: 0,
  scale: 0.8,
  duration: 1.5,
  delay: 0.5,
  ease: "power4.out",
});

function initHeroAnimations() {
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  timeline
    .from("#hero h1", {
      opacity: 0,
      y: 100,
      duration: 1,
    })
    .from(
      "#hero p",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
      },
      "-=0.5",
    )
    .from(
      "#hero button",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
      },
      "-=0.5",
    )
    .from(
      "#hero img",
      {
        opacity: 0,
        x: 100,
        duration: 1,
      },
      "-=0.5",
    );
}

function initFeaturesAnimations() {
  const cards = gsap.utils.toArray(".feature-card");

  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      rotation: 5,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  });
}

function toggleCategory(category) {
  const container = document.getElementById(`${category}-commands`);
  const arrow = document.getElementById(`${category}-arrow`);
  const cards = container.querySelectorAll(".command-card");

  if (container.classList.contains("hidden")) {
    container.classList.remove("hidden");

    arrow.classList.add("rotate");

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 100);
    });
  } else {
    cards.forEach((card) => {
      card.classList.remove("show");
    });

    arrow.classList.remove("rotate");

    setTimeout(() => {
      container.classList.add("hidden");
    }, 300);
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const navHeight = document.querySelector("nav").offsetHeight;

      if (target) {
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        if (this.getAttribute("href") === "#commands") {
          gsap.to("#commands", {
            backgroundColor: "rgba(156, 140, 255, 0.12)",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          });
        }
      }
    });
  });
}

function initScrollAnimations() {
  gsap.to("nav", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "+=100",
      toggleClass: { targets: "nav", className: "nav-blur" },
      scrub: true,
    },
  });

  gsap.from("#commands .bg-white\\/5", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#commands",
      start: "top center+=100",
      toggleActions: "play none none reverse",
    },
  });
}

document.addEventListener("DOMContentLoaded", initializeWebsite);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 500);
    }
  }, 1000);
});

gsap.registerPlugin(ScrollTrigger);
gsap.from("#hero-heading", {
  opacity: 0,
  y: 50,
  duration: 1.5,
  delay: 0.5,
  ease: "power4.out",
});

gsap.from("#hero-subheading", {
  opacity: 0,
  y: 30,
  duration: 1.2,
  delay: 0.7,
  ease: "power4.out",
});

gsap.from("#hero-button1", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 1,
  ease: "power4.out",
});

gsap.from("#hero-button2", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 1.2,
  ease: "power4.out",
});

gsap.from("#hero-logo", {
  opacity: 0,
  scale: 0.8,
  duration: 1.5,
  delay: 0.5,
  ease: "power4.out",
});

function initHeroAnimations() {
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  timeline
    .from("#hero h1", {
      opacity: 0,
      y: 100,
      duration: 1,
    })
    .from(
      "#hero p",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
      },
      "-=0.5",
    )
    .from(
      "#hero button",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
      },
      "-=0.5",
    )
    .from(
      "#hero img",
      {
        opacity: 0,
        x: 100,
        duration: 1,
      },
      "-=0.5",
    );
}

function initFeaturesAnimations() {
  const cards = gsap.utils.toArray(".feature-card");

  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      rotation: 5,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  });
}

function toggleCategory(category) {
  const commandsDiv = document.getElementById(`${category}-commands`);
  const arrow = document.getElementById(`${category}-arrow`);

  if (!loadedCategories.has(category)) {
    const commandsHTML = commandsData[category].commands
      .map((cmd) => createCommandHTML(cmd))
      .join("");
    commandsDiv.innerHTML = commandsHTML;
    loadedCategories.add(category);
  }

  commandsDiv.classList.toggle("hidden");
  arrow.classList.toggle("rotate-180");
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const navHeight = document.querySelector("nav").offsetHeight;

      if (target) {
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        if (this.getAttribute("href") === "#commands") {
          gsap.to("#commands", {
            backgroundColor: "rgba(156, 140, 255, 0.12)",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          });
        }
      }
    });
  });
}

function initScrollAnimations() {
  gsap.to("nav", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "+=100",
      toggleClass: { targets: "nav", className: "nav-blur" },
      scrub: true,
    },
  });

  gsap.from("#commands .bg-white\\/5", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#commands",
      start: "top center+=100",
      toggleActions: "play none none reverse",
    },
  });
}

async function loadDiscordInviteData(inviteCode) {
  const endpoint = `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`;
  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Discord invite fetch failed");
    }

    const data = await response.json();
    const guild = data.guild || {};
    const iconUrl = guild.icon
      ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
      : "images/logo.png";

    const nameEl = document.getElementById("discord-server-name");
    const descEl = document.getElementById("discord-server-desc");
    const membersEl = document.getElementById("discord-server-members");
    const presenceEl = document.getElementById("discord-server-presence");
    const iconEl = document.getElementById("discord-server-icon");
    const joinLink = document.getElementById("discord-server-link");

    if (iconEl) iconEl.src = iconUrl;
    if (nameEl) nameEl.textContent = guild.name || "LUMI Server";
    if (descEl)
      descEl.textContent =
        guild.description || "Oficiálny Discord server LittleSpace komunity";
    if (membersEl)
      membersEl.textContent = `${data.approximate_member_count || "?"} členov`;
    if (presenceEl)
      presenceEl.textContent = `${data.approximate_presence_count || "?"} online`;
    if (joinLink) joinLink.href = `https://discord.com/invite/${inviteCode}`;
  } catch (error) {
    console.warn("Discord invite fetch failed:", error);
  }
}

function initializeWebsite() {
  initHeroAnimations();
  initFeaturesAnimations();
  initScrollAnimations();
  initSmoothScroll();
  loadDiscordInviteData("tadqJjbfpr");

  const ctaButtons = document.querySelectorAll(".gradient-bg");
  ctaButtons.forEach((button) => button.classList.add("pulse-on-hover"));

  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => card.classList.add("shine-effect"));
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.onscroll = function () {
  const button = document.querySelector('[onclick="scrollToTop()"]');
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    button.style.opacity = "1";
    button.style.pointerEvents = "auto";
  } else {
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
  }
};

document.addEventListener("DOMContentLoaded", initializeWebsite);
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("commands-container");

  const categoriesHTML = Object.entries(commandsData)
    .map(([key, category]) => createCategoryButton(key, category))
    .join("");

  container.innerHTML = categoriesHTML;
});

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.querySelector(".menu-icon");
  const menuButton = document.querySelector(".md\\:hidden button");

  if (mobileMenu.classList.contains("hidden")) {
    // Show menu
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("animate-fade-in");
    menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
  } else {
    // Hide menu
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("animate-fade-in");
    menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
  }

  // Stop event propagation
  event.stopPropagation();
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuButton = document.querySelector(".md\\:hidden button");

  // Only close if menu is open and click is outside menu and button
  if (
    !mobileMenu.classList.contains("hidden") &&
    !mobileMenu.contains(e.target) &&
    !menuButton.contains(e.target)
  ) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("animate-fade-in");
    document
      .querySelector(".menu-icon")
      .setAttribute("d", "M4 6h16M4 12h16M4 18h16");
  }
});

// Prevent menu from closing when clicking inside
document.getElementById("mobileMenu")?.addEventListener("click", (e) => {
  e.stopPropagation();
});
