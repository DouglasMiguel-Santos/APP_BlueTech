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

$(".add-cart").on("click", function () {
  adicionarAoCarrinho(item, 1);

  var toastCenter = app.toast.create({
    text: `${item.nome} adicionado ao carrinho`,
    position: "center",
    closeTimeout: 2000,
  });
  toastCenter.open();
});
