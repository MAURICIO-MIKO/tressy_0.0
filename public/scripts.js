// Obtener el botón hamburguesa y los enlaces del navbar
const hamburger = document.getElementById("hamburger-menu");
const navbarLinks = document.getElementById("navbar-links");

// Añadir evento al botón hamburguesa
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbarLinks.classList.toggle("active");
});
