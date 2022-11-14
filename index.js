//Selecionando botão de salvar conteúdo
const botaoSalvar = document.querySelector("#botao_salvar");

//Selecionando inputs do nome da comida e do preço
const prato = document.querySelector("#input_prato");
const preco = document.querySelector("#input_preco");


const divCadastro = document.querySelector("#cadastro")


//Selecionando radio buttons com valores diferentes
const promo = document.querySelector("#botao_sim");
const semPromo = document.querySelector("#botao_nao");

//Selecionando lista de produtos
const produtos = document.querySelector("#lista_produtos");

//Evento de click no botão de salvar comida
botaoSalvar.addEventListener("click", (e) => {
    //Armazenando o nome do prato e o preço
    let nomePrato = prato.value;
    let valorPreco = preco.value;

    //Criando elemento li e adicionando um classe ao mesmo
    const item = document.createElement("li");
    item.classList.add("produtos");

    //Criando div do produto que será adicionado e atribuindo-a uma classe
    const nomeEpreco = document.createElement("div");
    nomeEpreco.classList.add("produto");

    
    //Colocando nome do prato em um elemento p e o preço em um span
    let nome = document.createElement("p");
    nome.classList.add("nome_da_comida");
    let valor = document.createElement("span");
    valor.classList.add("valor_da_comida");
    
    //Criando botão para remover item futuramente
    let botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botao_remover");
    
    //Evento para remover div do produto
    botaoRemover.addEventListener("click", () => {
        produtos.removeChild(item);
    })
    
    //Atribuindo conteúdo para a div
    nome.textContent = nomePrato;
    valor.textContent = valorPreco;
    botaoRemover.textContent = "Remover"

    let valorNan = document.createElement("p");
    valorNan.textContent = `Valor informado inválido`;
    valorNan.classList.add("valor_invalido");

    let contadorNan = 0;

    if(!isNaN(Number(valorPreco))){
        //Função que verifica se o produto está em promoção ou não
        estaEmPromo();
        
        //Gerando e colocando imagem na div
        inserirImagem();

        //Adicionando conteúdos na div
        nomeEpreco.appendChild(nome);
        nomeEpreco.appendChild(valor);
        item.appendChild(nomeEpreco);
        item.appendChild(botaoRemover);

    }else if(isNaN(Number(valorPreco)) | valorPreco === ""){
        if(contadorNan === 0){
            divCadastro.appendChild(valorNan);
            ++contadorNan;
        }else if(contadorNan>0){
            divCadastro.removeChild(valorNan);
                contadorNan = 0;
        }
        botaoSalvar.addEventListener("click", () => {
            if(contadorNan > 0){
                divCadastro.removeChild(valorNan);
                contadorNan = 0;
                console.log(contadorNan);
            }
        })
    }

        //Função para verificar se o item está em promoçao ou não
        function estaEmPromo(){
            if(promo.checked){
                //Se estiver em promoção diminua 20% do seu valor
                valorPreco = `Preço: R$${Number(preco.value)-(20/100*Number(preco.value))}`;
                produtos.appendChild(item);
                item.id = "em_promo";
            }else if(semPromo.checked){
                //Se não, o valor continua o mesmo e adicione-o antes daqueles em promoção
                valorPreco = `Preço: R$${valorPreco}`;
                produtos.prepend(item);
            }
        }
    
    //Função para inserir imagem
    function inserirImagem(){
        let img = document.createElement("img");
        img.src = "hamburger.png";
        img.width = 30;
        img.height = 30;
        item.appendChild(img);
    }
})
