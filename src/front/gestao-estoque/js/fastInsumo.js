// URLs da API

const urlinsumo = "http://localhost:8080/insumo/";

//variaveis
const inputId = document.getElementById('id');
const inputDescricao = document.getElementById('desc');
const inputEstoque = document.getElementById('total');
let dataInsumo;

//botões
const btnSalvar =  document.getElementById('btnBuscar');
btnSalvar.addEventListener('click',()=>{
    getInsumo(urlinsumo, inputId.value);    
})

// Busca um equipamento pelo ID


async function getInsumo(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            dataInsumo = await resposta.json();
            console.log(dataInsumo);
            preencheAutomatico(dataInsumo.nome,dataInsumo.quantidade);
        } else {
            console.error("Erro na requisição:", resposta.status);
            
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}

function preencheAutomatico(desc,quantidade) {
    inputDescricao.value = desc;
    inputEstoque.value = quantidade;
}