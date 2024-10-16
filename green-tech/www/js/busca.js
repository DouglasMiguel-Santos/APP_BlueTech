//API MERCADO LIVRE BUSCA PRODUTOS

const inputBusca = document.querySelector("#Search");
const btnBusca = document.querySelector("#iconeBuscar");

const mercadolivre = (value) => {
  const result = fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${value}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return result;
};

btnBusca.addEventListener("click", async () => {
  const Produto = document.querySelector(".produto");
  Produto.innerHTML = ""; // Limpa os produtos anteriores
  const result = await mercadolivre(inputBusca.value);

  for (let index = 0; index <= 50; index++) {
    Produto.innerHTML += `
        <!-- ITEM CARD -->
        <div class="item-Card">
          <a data-id="${
            result.results[index].category_id
          }" href="#" class="item">
            <div class="img-Caixa">
              <img src="${result.results[index].thumbnail}" alt="${
      result.results[index].title
    }" />
            </div>
            <div class="nome-rating">
              <span class="color-gray">${result.results[index].title}</span>
            </div>
            <div class="price"> 
              ${result.results[index].price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              ${
                result.results[index].original_price
                  ? result.results[index].original_price.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )
                  : "Preço original indisponível"
              }
           </div>
          </a>
        </div>
      `;
  }
});
