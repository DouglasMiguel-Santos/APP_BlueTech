//recuperar o id detalhe no localstorage

var id = parseInt(localStorage.getItem("detalhe"));
//pegar os produtos do localstorage
var produtos = JSON.parse(localStorage.getItem("produtos"));
var item = produtos.find((produto) => produto.id === id);
if (item) {
  //tem o item
  console.log("produto encontrado", item);
  $("#imagem-detalhe").attr("src", item.imagem);
  $("#nome-detalhe").html(item.nome);
  $("#rating-detalhe").html(item.rating);
  $("#like-detalhe").html(item.likes);
  $("#descricao-detalhe").html(item.descricao);
  $("#reviews-detalhe").html(item.reviews + " reviews");
  $("#preco-detalhe").html(
    item.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );

  $("#precopromo-detalhe").html(
    item.preco_promocional.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );

  var tabelaDetalhes = $("#tabdetalhes");

  item.detalhes.forEach((detalhe) => {
    var linha = `
              <tr>
                <td>${detalhe.caracteristica}</td>
                <td>${detalhe.detalhes}</td>
              </tr>
    `;
    tabelaDetalhes.append(linha);
  });
} else {
  //alimentar com os valores do item
  console.log("produto nao encontrado");
}
//funçao para adicionar ao carrinho

var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

//funçao para adicionar ao carrinho
function adicionarAoCarrinho(item, quantidade) {
  var itemNoCarrinho = carrinho.find((c) => c.item.id === item.id);
  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade += quantidade;
    itemNoCarrinho.total_item =
      itemNoCarrinho.quantidade * item.preco_promocional;
  } else {
    carrinho.push({
      item: item,
      quantidade: quantidade,
      total_item: quantidade * item.preco_promocional,
    });
  }
  //atualizar localstorage de carrinho
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
$(".add-cart").on("click", function () {
  adicionarAoCarrinho(item, 1);

  var toastCenter = app.toast.create({
    text: `${item.nome} adicionado ao carrinho`,
    position: "center",
    closeTimeout: 2000,
  });
  toastCenter.open();
});

//--------------------------------------------------------------------------------------------------------

$(document).ready(function () {
  // Recuperar os favoritos do localStorage
  var localFavorito = localStorage.getItem("detalhes");
  var favorito = localFavorito ? JSON.parse(localFavorito) : [];

  if (favorito.length > 0) {
    // Renderizar a lista de favoritos
    renderizarfavorito();
    // Calcular total (opcional, se você quiser exibir um total na página)
    calcularTotal();
  } else {
    // Mostrar mensagem de favorito vazio
    favoritoVazio();
  }

  function renderizarfavorito() {
    // Limpar a área dos itens
    $("#listaFavorito").empty();

    // Percorrer os favoritos e adicionar ao HTML
    $.each(favorito, function (index, itemfavorito) {
      var itemDiv = `
        <div class="item-favorito">
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
                { style: "currency", currency: "BRL" }
              )}</span>
              <div class="count">
                <a href="#" class="minus" data-index="${index}">-</a>
                <input readonly class="qtd-item" type="text" value="${
                  itemfavorito.quantidade
                }" />
                <a href="#" class="plus" data-index="${index}">+</a>
              </div>
            </div>
          </div>
        </div>`;

      $("#listaFavorito").append(itemDiv);
    });
    console.log(itemfavorito, index);

    // Função para remover o item dos favoritos
    $(".delete-item").on("click", function (e) {
      e.preventDefault(); // Previne o comportamento padrão do link
      var index = $(this).data("index");
      // Confirmar remoção
      app.dialog.confirm(
        "Tem certeza que quer remover esse item?",
        "Remover",
        function () {
          favorito.splice(index, 1);
          localStorage.setItem("favorito", JSON.stringify(favorito));
          renderizarfavorito(); // Atualiza a página
        }
      );
    });

    // Função para diminuir a quantidade-------------------------------------------------------

    $(".minus").on("click", function (e) {
      e.preventDefault();

      var index = $(this).data("index");

      if (favorito[index].quantidade > 1) {
        favorito[index].quantidade--;
      } else {
        app.dialog.confirm(
          `Gostaria de remover <strong>${favorito[index].item.nome}</strong>?`,
          "REMOVER",
          function () {
            favorito.splice(index, 1);
          }
        );
      }
      localStorage.setItem("favorito", JSON.stringify(favorito));
      renderizarfavorito(); // Atualiza a lista de favoritos
      calcularTotal(); // Atualiza o total
    });

    // Função para aumentar a quantidade-------------------------------------------------------
    $(".plus").on("click", function (e) {
      e.preventDefault();
      var index = $(this).data("index");

      favorito[index].quantidade;
      favorito[index].quantidade++;

      localStorage.setItem("favorito", JSON.stringify(favorito));

      renderizarfavorito(); // Atualiza a lista de favoritos
      calcularTotal(); // Atualiza o total
    });
  }

  function calcularTotal() {
    var totalfavorito = 0;
    $.each(favorito, function (index, itemfavorito) {
      totalfavorito +=
        itemfavorito.quantidade * itemfavorito.item.preco_promocional;
    });
    // Exibir o total (se necessário)
    $("#subtotal").html(
      totalfavorito.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  }
  //----------------------------------------------------------------------------------------------
  function favoritoVazio() {
    $("#listafavorito").empty();
    $("#toolbarTotais").addClass("display-none");
    $("#toolbarCheckout").addClass("display-none");

    // Mostrar mensagem de favoritos vazios
    $("#listafavorito").html(`
      <div class="text-align-center">
        <img width="300" src="img/empty.gif">
        <br> <span class="color-gray">Nada por enquanto...</span>
      </div>
    `);
  }

  // Evento para esvaziar a lista de favoritos
  $("#esvaziar").on("click", function () {
    app.dialog.confirm(
      "Tem certeza que quer esvaziar o favorito?",
      "<strong>Esvaziar</strong>",
      function () {
        localStorage.removeItem("favorito");
        favorito = []; // Limpa a lista na memória
        favoritoVazio(); // Atualiza a visualização
      }
    );
  });
});
