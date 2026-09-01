document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const topBtn = document.getElementById("topBtn");

  // Mobile navigation
  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "×" : "☰";
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn?.setAttribute("aria-expanded", "false");
      if (menuBtn) menuBtn.textContent = "☰";
    });
  });

  // Navbar + active section + back to top
  const onScroll = () => {
    const y = window.scrollY;
    navbar?.classList.toggle("scrolled", y > 25);
    topBtn?.classList.toggle("show", y > 550);

    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-links a");
    let current = "home";

    sections.forEach(section => {
      if (y >= section.offsetTop - 150) current = section.id;
    });

    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  topBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal animations
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add("visible"));
  }

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
