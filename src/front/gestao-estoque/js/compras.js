//URLS
const urlSugestoesCompra = 'http://localhost:8080/insumo/sugestoes-compra';
const urlInsumos = 'http://localhost:8080/insumo/';

//variaveis 
const inputId = document.getElementById('id');
const inputDescricao = document.getElementById('descInsumo');
const inputQuant = document.getElementById('quantidade');
//data
let dataCritico;
let dataInsumoPesq;
//tabelas
const tabelaSugestoes = document.getElementById('sugestao');
const tabelaPedidos = document.getElementById('tableItens');
//dialogs
const dialogFornecedor = document.getElementById('dialogForncedor');
const dialogAddFornecedor = document.getElementById('dialogCadFornecedor');

//botões
const btnForncedor = document.getElementById('fornecedor');
const btnAddForncedor = document.getElementById('addFornecedor');
const btnSalvaFornecedor = document.getElementById('addFornecedor');
const btnAgregar = document.getElementById('btnAgregar');
const btnBuscar = document.getElementById('btnBuscar');

//divs
const divDisplaySugestoes = document.getElementById('displaySugestoes');

btnForncedor.addEventListener('click',()=>{
    
    dialogFornecedor.showModal();
})

btnAddForncedor.addEventListener('click',()=>{
    
    dialogAddFornecedor.showModal();
})

btnBuscar.addEventListener('click',()=>{
    getInsumos(urlInsumos,inputId.value);
})



//funções 

window.addEventListener('load', function() {
    buscaSugestões();
    
});

function buscaSugestões(){
    getInsumosCriticos(urlSugestoesCompra);
}

async function getInsumosCriticos(url) {
    
    try {
        const resposta = await fetch(url, { method: "GET" });

        if (resposta.ok) {
            dataCritico = await resposta.json();
            console.log(dataCritico);
            populaSugestoes();
        } else {
            console.error("Erro na requisição:", resposta.status);   
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}

async function getInsumos(url,id) {
    const urlCompleta = url+id;
    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            dataInsumoPesq = await resposta.json();
            console.log(dataInsumoPesq);
            
        } else {
            console.error("Erro na requisição:", resposta.status);   
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}

function populaSugestoes() {
    

    for (let i = 0; i < dataCritico.length; i++) {
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.innerText = dataCritico[i].nome;

        const tdEstoque = document.createElement('td');
        tdEstoque.innerText = dataCritico[i].quantidade;

        const tdQuantMin = document.createElement('td');
        tdQuantMin.innerText = dataCritico[i].estoqueMin;

        const tdBotao = document.createElement('td');
        const btnAdd = document.createElement('button');
        btnAdd.textContent = "+";
        btnAdd.id = `btn-${dataCritico[i].id}`;
        btnAdd.className = 'btnAdd';
        btnAdd.style.backgroundColor = "green";

        btnAdd.addEventListener('click', () => {
            alert(`Adicionar insumo ID: ${dataCritico[i].id}`);
            // Aqui você pode chamar uma função: adicionarNaLista(dataCritico[i]);
        });

        tdBotao.appendChild(btnAdd);

        // Adiciona os td à tr
        tr.appendChild(tdNome);
        tr.appendChild(tdEstoque);
        tr.appendChild(tdQuantMin);
        tr.appendChild(tdBotao);

        // Adiciona a tr à tabela
        tabelaSugestoes.appendChild(tr);
    }
}

