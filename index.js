//Botão para cadastrar um pedido;
const botaoSalvar = document.querySelector("#botao_salvar");

//Botões para indicar promoção ou não;
const promo = document.querySelector("#botao_sim");
const semPromo = document.querySelector("#botao_nao");

//Campo responsável pela lista de produtos;
const produtos = document.querySelector("#lista_produtos");

//Arrays reponsáveis pelo localStorage;
let listaPrato = [];
let listaPreco = [];
let listaPromocao = [];

//Variáveis auxiliáres;
let itemPromocao;
let precoFinal;

const salvar = () => {
    //Valores digitados pelo usuário;
    let prato = document.querySelector("#input_prato").value;
    let preco = Number(document.querySelector("#input_preco").value);

    //Checagem de promoção;
    if(promo.checked){
        itemPromocao = 1;
        listaPromocao.push(1);
    }else if(semPromo.checked){
        itemPromocao = 2;
        listaPromocao.push(2);
    }

    //Adiciona valores aos arrays;
    listaPrato.push(prato);
    listaPreco.push(preco);

    //Adiciona itens ao localStorage;
    localStorage.setItem("prato", listaPrato);
    localStorage.setItem("preço", listaPreco);
    localStorage.setItem("promocao", listaPromocao);

    //Chamada da função responsável por criar o elemento;
    criarElemento(prato, preco, itemPromocao);
}

const criarElemento = (prato, preco, promocao) => {
    //Cria um item da lista e adiciona uma classe;
    let item = document.createElement("li");
    item.classList.add("produtos");

    //Cria um container para o nome e preço além de adicionar uma classe;
    let nomeEpreco = document.createElement("div");
    nomeEpreco.classList.add("produto");

    //Responsável por adicionar imagem do hamburguer; 
    inserirImagem();

    //Cria uma tag que receberá o nome do prato e adiciona uma classe;
    let nome = document.createElement("p");
    nome.classList.add("nome_da_comida");

    //Cria uma tag que receberá o valor do prato e adiciona uma classe;
    let valor = document.createElement("span");
    valor.classList.add("valor_da_comida");

    //Cria o botão de remover o container e adiciona uma classe;
    let botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botao_remover");
    botaoRemover.textContent = "remover";
    
    //Função responsável por inserir a imagem do hamburguer;
    function inserirImagem(){
        let img = document.createElement("img");
        img.src = "hamburger.png";
        img.width = 30;
        img.height = 30;
        item.appendChild(img);
    }

    //Remove itens do container e do localStorage;
    botaoRemover.addEventListener("click", () => {
        produtos.removeChild(item);
        for(let k=0;k<listaPrato.length;k++){
            if(listaPrato[k]===prato&&listaPreco[k]===preco){
                console.log(k);
                listaPrato.splice(k, 1);
                listaPreco.splice(k, 1);
                listaPromocao.splice(k, 1);
                
                localStorage.setItem("prato", listaPrato);
                localStorage.setItem("preço", listaPreco);
                localStorage.setItem("promocao", listaPromocao);
            }
        }
    });

    //Chamada da função que confere se há promoção ou não no produto;
    if(promocao==1){
        precoFinal = conferePromocao(promocao, preco);
        item.id = "em_promo";
        produtos.appendChild(item);
    }
    else if(promocao==2){
        precoFinal = conferePromocao(promocao, preco);
        produtos.prepend(item);
    }

    //Atribui o nome e o preço do prato;
    nome.textContent = prato;
    valor.textContent = precoFinal;
    
    //Adiciona os elementos ao container;
    nomeEpreco.appendChild(nome);
    nomeEpreco.appendChild(valor);
    item.appendChild(nomeEpreco);
    item.appendChild(botaoRemover);
}

//Responsável por carregar os ítens armazenados dentro do localStorage;
const carregarPagina = () =>{
    if(localStorage.getItem("prato")){
        let prato = localStorage.prato; 
        prato = prato.split(',');
        listaPrato = prato;
    
        let preco = localStorage.preço;
        preco = preco.split(',');
        listaPreco = preco;

        let promocao = localStorage.promocao;
        promocao = promocao.split(',');
        listaPromocao = promocao;
    
        for(let k = 0;k < prato.length;k++){
            criarElemento(prato[k], preco[k], promocao[k]);
        }
    }
}

//Função responsável por ajustar o preço caso haja promoção ou não; 
const conferePromocao = (promocao, preco) => {
    let valorFinal;

    if(promocao==1){
        valorFinal = `Preço: R$${Number(preco)-(0.2*Number(preco))}`;

        return valorFinal;
    }
    else if(promocao==2){
        valorFinal = `Preço: R$${preco}`;

        return valorFinal;
    }
}

//Associação de eventos a página e ao botão;
botaoSalvar.addEventListener("click", salvar);
window.addEventListener("load", carregarPagina);