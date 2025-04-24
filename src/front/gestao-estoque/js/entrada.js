
///////////////////VARIAVEIS///////////////
const url = 'http://localhost:8080/insumo/'

//////////////////////CAPTURANDO BOTÕES /////////////////////////////
const btnBuscar = document.getElementById('btnBuscar');
const btnEntrada = document.getElementById('btnEntrar');
const btnCadastro = document.getElementById('btnCadastro');
btnCadastro.style.display="none";//ao carregar a pagina ele não deve aparecer

//////////////CAPTURANDO ELEMENTOS DA TELA///////////////////////////
const dialogCadastro = document.getElementById('dialogCadastro');
const naoCadastrado = document.getElementById('naoCadastrado');
const atualizado = document.getElementById('atualizado');
const  inputId= document.getElementById('id');
const inputDescricao = document.getElementById('desc');
const inputPeso = document.getElementById('peso');
const inputEstMin = document.getElementById('estMin');
const inputEnd = document.getElementById('end');
const inputEstoque = document.getElementById('total');
const inputQuantidadeAtualizada = document.getElementById('entrada');

let data;


////////////////////FUNÇÕES BOTÕES///////////////////////////////////

//função que mostra a dialog de cadastrar
btnCadastro.addEventListener('click', () => {
    
    dialogCadastro.showModal();
    
});

btnBuscar.addEventListener('click', () => {
    const valorId = inputId.value;
    getInsumo(url, valorId);
});

btnEntrar.addEventListener('click', () =>{
    
    putInsumo(url);
    limparCampos();
})



///////////////////DEMAIS FUNÇÕES ////////////////////////////
//função que vai buscar o insumo 

async function getInsumo(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            data = await resposta.json();
            console.log(data);
            btnCadastro.style.display = 'none';
            preencheAutomatico(data.nome,data.peso,data.estoqueMin,data.endereco,data.quantidade);
        } else {
            console.error("Erro na requisição:", resposta.status);
            naoCadastrado.showModal();
            btnCadastro.style.display = 'inline';
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}

//colcoar valores do item que foi achado;
function preencheAutomatico (desc,peso,estoqueMin,end,quantidade){
    inputDescricao.value = desc;
    inputPeso.value=peso;
    inputEstMin.value = estoqueMin;
    inputEnd.value = end;
    inputEstoque.value = quantidade;
}


async function putInsumo(url) {
    const urlCompleta = url + data.id;
    const valorInput = Number(inputQuantidadeAtualizada.value);
    const valorData = Number(data.quantidade);

    
    data.quantidade = valorInput + valorData;
    
    try {
        const resposta = await fetch(urlCompleta, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (resposta.ok) {
            atualizado.showModal();
            
        } else {
            console.error("Erro na atualização:", resposta.status);
        }
    } catch (erro) {
        console.error("Erro ao tentar atualizar:", erro);
    }
}


function limparCampos() {
    inputDescricao.value = "";
    inputEnd.value = "";
    inputEstMin.value = "";
    inputEstoque.value = "";
    inputPeso.value="";
    inputQuantidadeAtualizada.value="";
    inputId.value="";
}

