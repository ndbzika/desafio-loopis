let caixa_produtos = document.querySelector("#produtos");

const addProdutos = () => {
    let div_produto = document.createElement("div");
    div_produto.classList.add("caixa_de_produtos");

    caixa_produtos.appendChild(div_produto);
}