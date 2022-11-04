
const botaoSalvar = document.querySelector("#botao_salvar");

const prato = document.querySelector("#input_prato");

const preco = document.querySelector("#input_preco");

const promo = document.querySelector("#botao_sim");

const semPromo = document.querySelector("#botao_nao");

const produtos = document.querySelector("#lista_produtos");

botaoSalvar.addEventListener("click", (e) => {
    let nomePrato = prato.value;
    let valorPreco = preco.value;

    
    const item = document.createElement("li");
    item.classList.add("produtos")
    const nomeEpreco = document.createElement("div")
    nomeEpreco.classList.add("produto");
    inserirImagem();
    let nome = document.createElement("p");
    nome.classList.add("nome_da_comida");
    let valor = document.createElement("span");
    valor.classList.add("valor_da_comida");
    let botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botao_remover");
    
    botaoRemover.addEventListener("click", () => {
        produtos.removeChild(item);
    })

    estaEmPromo();
    
    nome.textContent = nomePrato;
    valor.textContent = valorPreco;
    botaoRemover.textContent = "Remover"

    nomeEpreco.appendChild(nome);
    nomeEpreco.appendChild(valor);
    item.appendChild(nomeEpreco);
    item.appendChild(botaoRemover);

    e.preventDefault();

    function inserirImagem(){
        let img = document.createElement("img");
        img.src = "hamburger.png";
        img.width = 30;
        img.height = 30;
        item.appendChild(img);
    }

    function estaEmPromo(){
        if(promo.checked){
            valorPreco = `Preço: R$${preco.value-(20/100*preco.value)}`;
            produtos.appendChild(item);
            item.id = "em_promo";
        }else if(semPromo.checked){
            valorPreco = `Preço: R$${valorPreco}`;
            produtos.prepend(item);
        }
    }
})
