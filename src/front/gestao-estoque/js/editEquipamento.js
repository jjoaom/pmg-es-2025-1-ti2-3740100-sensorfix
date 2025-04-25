// URLs da API
const urlEquipamento = "http://localhost:8080/equipamento/";
const urlinsumo = "http://localhost:8080/insumo/";

// VARIÁVEIS DE INPUT
const inputDescricao = document.getElementById('desc');
const inputPeso = document.getElementById('peso');
const inputEstMin = document.getElementById('estMin');
const inputEnd = document.getElementById('end');
const inputEstoque = document.getElementById('total');
const inputIdEquipamento = document.getElementById('idEquipamento');
const inputIdInsumo = document.getElementById('id');
const inputDescInsumo = document.getElementById('descInsumo');
const inputQuantidadeInsumo = document.getElementById('quantidade');

// VARIÁVEIS DE DADOS
let dataEquip;
let dataInusmo;
let vetorInsumos = [];

// TABELA
const tableInsumo = document.getElementById('tabelaInsumos');

// DIALOGS
const dialogOk = document.getElementById('dialogOk');
const naoCadastrado = document.getElementById('naoCadastrado');

// BOTÕES
const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', () => {
    getEquipamento(urlEquipamento, inputIdEquipamento.value);
    getInsumosDoEquipamento(inputIdEquipamento.value);
});

const btnBusca = document.getElementById('btnBusca');
btnBusca.addEventListener('click', () => {
    getInsumo(urlinsumo, inputIdInsumo.value);
});

const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', () => {
    addInsumo();
});

const btnSalvar = document.getElementById('btnSalvar');
btnSalvar.style.display = "none";
btnSalvar.addEventListener('click',() =>{
    putEquipamento(urlEquipamento,inputIdEquipamento.value);
    tableInsumo.innerHTML="";
    location.reload();

});
// FUNÇÕES

// Busca um equipamento pelo ID
async function getEquipamento(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            dataEquip = await resposta.json();
            console.log(dataEquip);
            
            preencheAutomatico(
                dataEquip.nome,
                dataEquip.peso,
                dataEquip.estoqueMin,
                dataEquip.endereco,
                dataEquip.quantidade
            );
            btnSalvar.style.display='inline';
        } else {
            console.error("Erro na requisição:", resposta.status);
            naoCadastrado.showModal();
            btnSalvar.style.display='none';
        }
    } catch (erro) {
        console.error("Erro ao buscar equipamento:", erro);
    }
}

// Preenche automaticamente os dados do equipamento nos campos
function preencheAutomatico(desc, peso, estMin, end, quantidade) {
    inputDescricao.value = desc;
    inputPeso.value = peso;
    inputEstMin.value = estMin;
    inputEnd.value = end;
    inputEstoque.value = quantidade;
}

// Busca insumos relacionados ao equipamento
async function getInsumosDoEquipamento(idEquipamento) {
    const urlInsumoEquipamento = `http://localhost:8080/equipamento-insumos/por-equipamento/${idEquipamento}`;

    try {
        const resposta = await fetch(urlInsumoEquipamento);
        if (resposta.ok) {
            const dados = await resposta.json();
            vetorInsumos = dados;
            preencherTabelaInsumos();
        } else {
            console.error("Erro ao buscar insumos do equipamento");
        }
    } catch (erro) {
        console.error("Erro:", erro);
    }
}

// Preenche a tabela com os insumos
function preencherTabelaInsumos() {
    tableInsumo.innerHTML = '';
    for (let i = 0; i < vetorInsumos.length; i++) {
        const tr = document.createElement('tr');
        const tdInsumo = document.createElement('td');
        const tdInsumoQuantidade = document.createElement('td');
        const tdBtnExcluir = document.createElement('td');

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = "X";
        btnExcluir.id = `${vetorInsumos[i].id}`;
        btnExcluir.className = 'btnExcluir';

        // Adiciona o evento de clique no botão de excluir
        btnExcluir.addEventListener('click', async () => {
            await excluirRelacao(vetorInsumos[i].id);  // Chama a função para excluir
        });

        tdInsumo.textContent = vetorInsumos[i].insumo.nome;
        tdInsumoQuantidade.textContent = vetorInsumos[i].quantidade;
        tdBtnExcluir.appendChild(btnExcluir);

        tr.appendChild(tdInsumo);
        tr.appendChild(tdInsumoQuantidade);
        tr.appendChild(tdBtnExcluir);

        tableInsumo.appendChild(tr);
    }
}

// Busca um insumo pelo ID
async function getInsumo(url, idInsumo) {
    const urlCompleta = url + idInsumo;

    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            dataInusmo = await resposta.json();
            console.log(dataInusmo);
            preencheAutomaticoInsumo(dataInusmo.nome);
        } else {
            console.error("Erro na requisição:", resposta.status);
            naoCadastrado.showModal();
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}

// Preenche automaticamente a descrição do insumo
function preencheAutomaticoInsumo(desc) {
    inputDescInsumo.value = desc;
}

// Adiciona um insumo à relação com o equipamento
async function addInsumo() {
    const novaRelacao = {
        equipamento: {
            id: parseInt(dataEquip.id)
        },
        insumo: {
            id: parseInt(dataInusmo.id)
        },
        quantidade: parseInt(inputQuantidadeInsumo.value)
    };

    // Envia a requisição para o backend e espera a resposta antes de continuar
    await postRelacaoInsumoEquipamento(novaRelacao);

    // Após a criação da relação, busca os insumos atualizados do equipamento
    getInsumosDoEquipamento(inputIdEquipamento.value);
}

async function postRelacaoInsumoEquipamento(novaRelacao) {
    try {
        const resposta = await fetch("http://localhost:8080/equipamento-insumos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaRelacao)
        });

        if (resposta.ok) {
            const novaRelacaoSalva = await resposta.json();
            console.log("Relação criada:", novaRelacaoSalva);

            // Adiciona o retorno ao vetor local, se quiser
            vetorInsumos.push(novaRelacaoSalva);
            preencherTabelaInsumos();
        } else {
            console.error("Erro ao criar relação.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}

// Função para excluir a relação no banco de dados
async function excluirRelacao(id) {
    try {
        const resposta = await fetch(`http://localhost:8080/equipamento-insumos/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            console.log("Relação excluída com sucesso!");

            // Após excluir no banco, atualiza a tabela
            vetorInsumos = vetorInsumos.filter(relacao => relacao.id !== id);  // Remove do vetor local
            preencherTabelaInsumos();  // Atualiza a tabela

        } else {
            console.error("Erro ao excluir relação:", resposta.status);
        }
    } catch (erro) {
        console.error("Erro ao excluir relação:", erro);
    }
}

async function putEquipamento(id, urlBase) {
    const url = id+urlBase;
    console.log(url);
    const equipamento = {
        nome: document.getElementById('desc').value,
        peso: parseFloat(document.getElementById('peso').value),
        estoqueMin: parseInt(document.getElementById('estMin').value),
        endereco: document.getElementById('end').value,
        quantidade: parseInt(document.getElementById('total').value),
        deposito: 2 // fixa ou dinamiza se quiser
    };
    console.log(equipamento)

    try {
        const resposta = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipamento)
        });

        if (resposta.ok) {
            dialogOk.showModal();
        } else {
            alert(`Erro ao atualizar equipamento: ${resposta.status}`);
        }
    } catch (erro) {
        console.error('Erro na requisição PUT:', erro);
        alert('Erro ao atualizar insumo. Veja o console para mais detalhes.');
    }

    limparCampos();
}

function limparCampos() {
    inputDescricao.value = "";
    inputEnd.value = "";
    inputEstMin.value = "";
    inputEstoque.value = "";
    inputPeso.value="";
    
    inputIdInsumo.value="";
}