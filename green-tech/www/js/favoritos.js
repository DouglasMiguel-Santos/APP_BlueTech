//app.dialog.alert("funcionou");

var localFavorito = localStorage.getItem("favorito");
if (localFavorito) {
  var favorito = JSON.parse(localFavorito);
  if (favorito.length > 0) {
    //tem itens no carrinho
    //renderizar carrinho
    renderizarfavorito();
    //somar totais dos produtos
    calcularTotal();
  } else {
    //mostrara favorito vazio
    favoritoVazio();
  }
} else {
  //mostrar favorito vazio
  favoritoVazio();
}
function renderizarfavorito() {
  //esvaziar area dos itens
  $("#listafavorito").empty();
  //percorrer o nosso favorito e alimentar a area

  $.each(favorito, function (index, itemfavorito) {
    var itemDiv = `   <!--ITEM DO favorito-->
          <div class="item-favorito" >
            <div class="area-img">
              <img src="${itemfavorito.item.imagem}" />
            </div>
            <div class="area-details">
              <div class="sup">
                <span class="name-prod">${itemfavorito.item.nome}</span>
                <a data-index="${index}" class="delete-item" href="#">
                  <i class="ri-close-line"></i>
                </a>
              </div>
              <div class="middle">
                <span>${itemfavorito.item.principal_caracteristica}</span>
              </div>
              <div class="preco-quantidade">
                <span>${itemfavorito.item.preco_promocional.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}</span>
                <div class="count">
                  <a href="#" class="minus" data-index="${index}" >-</a>
                  <input readonly class="qtd-item" type="text" value="${
                    itemfavorito.quantidade
                  }" />
                  <a href="#" class="plus" data-index="${index}" >+</a>
                </div>
              </div>
            </div>
          </div>`;
    $("#listafavorito").append(itemDiv);
    console.log(itemfavorito);
  });

  $(".delete-item").on("click", function () {
    var index = $(this).data("index");
    //confirmar
    app.dialog.confirm(
      "Tem certeza que quer remover esse item?",
      "Remover",
      function () {
        //remover o item do favorito
        favorito.splice(index, 1);
        //atualizar o favorito com o item removido
        localStorage.setItem("favorito", JSON.stringify(favorito));
        //atualizar a pagina
        app.views.main.router.refreshPage();
      }
    );
  });

  $(".minus").on("click", function () {
    var index = $(this).data("index");
    if (favorito[index].quantidade > 1) {
      favorito[index].quantidade--;
      favorito[index].total_item =
        favorito[index].quantidade * favorito[index].item.preco_promocional;
      localStorage.setItem("favorito", JSON.stringify(favorito));
      app.views.main.router.refreshPage();
    } else {
      var itemname = favorito[index].item.nome;
      app.dialog.confirm(
        `gostaria de remover <strong>${itemname}</strong>?`,
        "REMOVER",
        function () {
          favorito.splice(index, 1);
          localStorage.setItem("favorito", JSON.stringify(favorito));
          renderizarfavorito();
          calcularTotal();
        }
      );
    }
  });

  $(".plus").on("click", function () {
    var index = $(this).data("index");
    favorito[index].quantidade++;
    favorito[index].quantidade * favorito[index].item.preco_promocional;
    localStorage.setItem("favorito", JSON.stringify(favorito));
    renderizarfavorito();
    calcularTotal();
  });
}
function calcularTotal() {
  var totalfavorito = 0;
  $.each(favorito, function (index, itemfavorito) {
    totalfavorito += itemfavorito.total_item;
  });

  //mostrar o total
  $("#subtotal").html(
    totalfavorito.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );
}

function favoritoVazio() {
  //esvaziar lista do favorito
  $("#listafavorito").empty();
  //sumir os itens de baixo botao e totais
  $("#toolbarTotais").addClass("display-none");
  $("#toolbarCheckout").addClass("display-none");

  //mostrar sacolinha vazia
  $("#listafavorito").html(`
    <div class="text-align-center ">
     <img width="300" src="img/empty.gif">
     <br> <span class="color-gray"> Nada por enquanto...</span>

    </div>
    `);
}
$("#esvaziar").on("click", function () {
  app.dialog.confirm(
    "Tem certeza que quer esvaziar o favorito?",
    "<strong>Esvaziar</strong>",
    function () {
      localStorage.removeItem("favorito");
      app.views.main.router.refreshPage();
    }
  );
});
