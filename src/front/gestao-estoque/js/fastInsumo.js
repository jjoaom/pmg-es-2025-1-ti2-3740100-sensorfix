// URLs da API
const urlinsumo = "http://localhost:8080/insumo/";

// variáveis
const inputId = document.getElementById('id');
const inputDescricao = document.getElementById('desc');
const inputEstoque = document.getElementById('total');
const inputEntrada = document.getElementById('entradaQuantidade');

// checkbox
const checkSaida = document.getElementById('saida');
const checkEntrada = document.getElementById('entradaCheckbox');
//dialogs 
const dialogSucesso = document.getElementById('atualizado');
const dialogfalha = document.getElementById('falha');
const dialogsaldoInsuficiente = document.getElementById('saidaFalha');
const dialogValorInvalido = document.getElementById('valorErrado');
const dialogCheckFalse = document.getElementById('checkbox');
// dados
let dataInsumo;

// botões
const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', () => {
    getInsumo(urlinsumo, inputId.value);
});

const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.style.display = 'none';
btnAgregar.addEventListener('click', () => {
    putInsumo(urlinsumo);
});

// Funções

// Busca um equipamento pelo ID
async function getInsumo(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            dataInsumo = await resposta.json();
            
            preencheAutomatico(dataInsumo.nome, dataInsumo.quantidade);
            btnAgregar.style.display = 'inline-block'; // Mostra o botão depois de buscar
        } else {
            console.error("Erro na requisição:", resposta.status);
            dialogfalha.showModal();
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
        alert("Erro de conexão com o servidor!");
    }
}

function preencheAutomatico(desc, quantidade) {
    inputDescricao.value = desc;
    inputEstoque.value = quantidade;
}

async function putInsumo(url) {
    const urlCompleta = url + dataInsumo.id;
    const valorInput = Number(inputEntrada.value);
    const valorData = Number(dataInsumo.quantidade);

    if (isNaN(valorInput) || valorInput <= 0) {
        dialogValorInvalido.showModal();
        return;
    }

    if (checkEntrada.checked) {
        dataInsumo.quantidade = valorData + valorInput;
    } else if (checkSaida.checked) {
        if (valorData < valorInput) {
            dialogsaldoInsuficiente.showModal();
            return;
        }
        dataInsumo.quantidade = valorData - valorInput;
    } else {
        dialogCheckFalse.showModal();
        return;
    }

    try {
        const resposta = await fetch(urlCompleta, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataInsumo)
        });

        if (resposta.ok) {
            dialogSucesso.showModal();
            resetarFormulario();
        } else {
            console.error("Erro na atualização:", resposta.status);
            alert("Erro ao atualizar o estoque!");
        }
    } catch (erro) {
        console.error("Erro ao tentar atualizar:", erro);
        alert("Erro de comunicação com o servidor!");
    }
}

// Só permite uma checkbox marcada
checkEntrada.addEventListener('click', () => {
    
    if (checkEntrada.checked) {
        checkSaida.checked = false;
    }
});

checkSaida.addEventListener('click', () => {
    if (checkSaida.checked) {
        checkEntrada.checked = false;
    }
});

// Reseta o formulário depois de atualizar
function resetarFormulario() {
    inputId.value = '';
    inputDescricao.value = '';
    inputEstoque.value = '';
    inputEntrada.value = '';
    checkEntrada.checked = false;
    checkSaida.checked = true; // volta para saída como padrão
    btnAgregar.style.display = 'none';
}
