document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const tarjetas = document.querySelectorAll(".tarjeta");
  
    searchInput.addEventListener("input", () => {
      const valorBusqueda = searchInput.value.toLowerCase();
  
      tarjetas.forEach(tarjeta => {
        const texto = tarjeta.textContent.toLowerCase();
        tarjeta.style.display = texto.includes(valorBusqueda) ? "block" : "none";
      });
    });
  });
  