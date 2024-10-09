//app.dialog.alert("funcionou");

var localCarrinho = localStorage.getItem("carrinho");
if (localCarrinho) {
  var carrinho = JSON.parse(localCarrinho);
  if (carrinho.length > 0) {
    //tem itens no carrinho
    //renderizar carrinho
    renderizarCarrinho();
    //somar totais dos produtos
    calcularTotal();
  } else {
    //mostrara carrinho vazio
    carrinhoVazio();
  }
} else {
  //mostrar carrinho vazio
  carrinhoVazio();
}
function renderizarCarrinho() {
  //esvaziar area dos itens
  $("#listaCarrinho").empty();
  //percorrer o nosso carrinho e alimentar a area

  $.each(carrinho, function (index, itemCarrinho) {
    var itemDiv = `   <!--ITEM DO CARRINHO-->
          <div class="item-carrinho" >
            <div class="area-img">
              <img src="${itemCarrinho.item.imagem}" />
            </div>
            <div class="area-details">
              <div class="sup">
                <span class="name-prod">${itemCarrinho.item.nome}</span>
                <a data-index="${index}" class="delete-item" href="#">
                  <i class="ri-close-line"></i>
                </a>
              </div>
              <div class="middle">
                <span>${itemCarrinho.item.principal_caracteristica}</span>
              </div>
              <div class="preco-quantidade">
                <span>${itemCarrinho.item.preco_promocional.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}</span>
                <div class="count">
                  <a href="#" class="minus" data-index="${index}" >-</a>
                  <input readonly class="qtd-item" type="text" value="${
                    itemCarrinho.quantidade
                  }" />
                  <a href="#" class="plus" data-index="${index}" >+</a>
                </div>
              </div>
            </div>
          </div>`;
    $("#listaCarrinho").append(itemDiv);
    console.log(itemCarrinho);
  });

  $(".delete-item").on("click", function () {
    var index = $(this).data("index");
    //confirmar
    app.dialog.confirm(
      "Tem certeza que quer remover esse item?",
      "Remover",
      function () {
        //remover o item do carrinho
        carrinho.splice(index, 1);
        //atualizar o carrinho com o item removido
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        //atualizar a pagina
        app.views.main.router.refreshPage();
      }
    );
  });

  $(".minus").on("click", function () {
    var index = $(this).data("index");
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade--;
      carrinho[index].total_item =
        carrinho[index].quantidade * carrinho[index].item.preco_promocional;
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      app.views.main.router.refreshPage();
    } else {
      var itemname = carrinho[index].item.nome;
      app.dialog.confirm(
        `gostaria de remover <strong>${itemname}</strong>?`,
        "REMOVER",
        function () {
          carrinho.splice(index, 1);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          renderizarCarrinho();
          calcularTotal();
        }
      );
    }
  });

  $(".plus").on("click", function () {
    var index = $(this).data("index");
    carrinho[index].quantidade++;
    carrinho[index].quantidade * carrinho[index].item.preco_promocional;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
    calcularTotal();
  });
}
function calcularTotal() {
  var totalCarrinho = 0;
  $.each(carrinho, function (index, itemCarrinho) {
    totalCarrinho += itemCarrinho.total_item;
  });

  //mostrar o total
  $("#subtotal").html(
    totalCarrinho.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );
}

function carrinhoVazio() {
  //esvaziar lista do carrinho
  $("#listaCarrinho").empty();
  //sumir os itens de baixo botao e totais
  $("#toolbarTotais").addClass("display-none");
  $("#toolbarCheckout").addClass("display-none");

  //mostrar sacolinha vazia
  $("#listaCarrinho").html(`
    <div class="text-align-center ">
     <img width="300" src="img/empty.gif">
     <br> <span class="color-gray"> Nada por enquanto...</span>

    </div>
    `);
}
$("#esvaziar").on("click", function () {
  app.dialog.confirm(
    "Tem certeza que quer esvaziar o carrinho?",
    "<strong>Esvaziar</strong>",
    function () {
      localStorage.removeItem("carrinho");
      app.views.main.router.refreshPage();
    }
  );
});
