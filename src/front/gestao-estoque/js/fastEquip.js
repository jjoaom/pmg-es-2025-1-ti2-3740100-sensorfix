// URLs da API

const urlinsumo = "http://localhost:8080/equipamentos/";

//variaveis
const inputId = document.getElementById('id');
const inputDescricao = document.getElementById('desc');
const inputEstoque = document.getElementById('total');
let dataEquipamento;

//botões
const btnSalvar =  document.getElementById('btnBuscar');
btnSalvar.addEventListener('click',()=>{
    getEquipamento(urlinsumo, inputId.value);    
})

// Busca um equipamento pelo ID


async function getEquipamento(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            dataEquipamento = await resposta.json();
            console.log(dataEquipamento);
            preencheAutomatico(dataEquipamento.nome,dataEquipamento.quantidade);
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