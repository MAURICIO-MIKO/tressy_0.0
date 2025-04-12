
  function openDetails(card) {
    // Extraer los datos de la tarjeta
    const name = card.dataset.name;
    const image = card.dataset.image;
    const style = card.dataset.style;
    const location = card.dataset.location;
    const price = card.dataset.price;

    // Asignar a la pantalla de detalles
    document.getElementById("detailName").innerText = name;
    document.getElementById("detailImage").src = image;
    document.getElementById("detailStyle").innerText = style;
    document.getElementById("detailLocation").innerText = location;
    document.getElementById("detailPrice").innerText = price;

    // Mostrar la pantalla
    document.getElementById("detailsView").classList.remove("hidden");
  }

  function closeDetails() {
    document.getElementById("detailsView").classList.add("hidden");
  }
