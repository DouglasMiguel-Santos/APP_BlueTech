/*const buscar = document.querySelector("#search");
buscar.addEventListener("submit", async function (event) {
  event.preventDefault();
  const inputValue = event.target[0].value;
  console.log(event);

  const products = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`
  );
});*/

fetch("js/backend.json")
  .then((response) => response.json())
  .then((data) => {
    // Salvar os dados no localStorage
    localStorage.setItem("produtos", JSON.stringify(data));

    // Simular carregamento online
    setTimeout(() => {
      // Esvaziar a área de produtos
      $("#produtos").empty();

      data.forEach((produto) => {
        var produtoHTML = `
          <!-- ITEM CARD -->
          <div class="item-card">
            <a data-id="${produto.id}" href="#" class="item">
              <div class="img-container">
                <img src="${produto.imagem}" alt="${produto.nome}" />
              </div>
              <div class="nome-rating">
                <span class="color-gray">${produto.nome}</span>
                <span class="bold ">
                  <i class="ri-star-s-fill"></i> ${produto.rating}
                </span>
              </div>
              <div class="price"> 
                ${produto.preco_promocional.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </a>
          </div>
        `;
        $("#produtos").append(produtoHTML);
      });

      $(".item").on("click", function () {
        var id = $(this).attr("data-id");
        localStorage.setItem("detalhe", id);
        app.views.main.router.navigate("/detalhes/");
      });
    }, 1000);
  })
  .catch((error) => console.error("Erro ao fazer fetch dos dados: " + error));

//ver quantos item tem dentro do carrinho

setTimeout(() => {
  var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  //alimentar o contador da sacola
  $(".btn-cart").attr("data-count", carrinho.length);
}, 1000);
