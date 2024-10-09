document
  .getElementById("iconeBuscar")
  .addEventListener("click", async function () {
    // Captura o valor do input
    const inputValue = document.getElementById("Search").value;

    // Verifica se o input não está vazio
    if (!inputValue) {
      console.log("O campo de busca está vazio");
      return;
    }

    const products = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`
    );
  });
