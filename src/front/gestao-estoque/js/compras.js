// Variáveis de entrada
const inputId = document.getElementById('id');
const inputDescricao = document.getElementById('descInsumo');
const inputQuant = document.getElementById('quantidade');
const inputQuantidadeSugestao = document.getElementById('quantidadeSugest');

// URL dos insumos e sugestões de compra
const urlSugestoesCompra = 'http://localhost:8080/insumo/sugestoes-compra';
const urlInsumos = 'http://localhost:8080/insumo/';

// Recupera o ID do pedido do localStorage
const idNovoPedido = localStorage.getItem('idNovoPedido');

// Tabelas e elementos do DOM
const tabelaSugestoes = document.getElementById('sugestao');
const tabelaPedidos = document.getElementById('tableItens');
const dialogFornecedor = document.getElementById('dialogForncedor');
const dialogAddFornecedor = document.getElementById('dialogCadFornecedor');
const btnForncedor = document.getElementById('fornecedor');
const btnAddForncedor = document.getElementById('addFornecedor');
btnForncedor.style.display = 'none';
const btnSalvaFornecedor = document.getElementById('addFornecedor');
const btnSConcluir = document.getElementById('concluir');
const btnAgregar = document.getElementById('btnAgregar');
const btnBuscar = document.getElementById('btnBuscar');
const divDisplaySugestoes = document.getElementById('displaySugestoes');
const tableInsumopedido = document.getElementById('tableItens')
const dialogSugest = document.getElementById('confirmaSugestao');
const btnConfirmaEntrada= document.getElementById('confirmaEntarda');
const dilodIdNaoencontrado= document.getElementById('naoencontrado');
const dilogValorInvalido= document.getElementById('quantidadeInvalida');
const dilogDigiteUmId= document.getElementById('digiteID');


let idNovaRelacao;
let currentInsumoPesquisado;
let vetorInsumos = [];

const dadosSalvos = localStorage.getItem('vetorInsumos');
if (dadosSalvos) {
    vetorInsumos = JSON.parse(dadosSalvos); // ← Isso transforma de string para array
}




// Evento de abrir o dialog de fornecedor
btnForncedor.addEventListener('click', () => {
    dialogFornecedor.showModal();
});


btnAddForncedor.addEventListener('click', () => {
    dialogAddFornecedor.showModal();
});

// Função de busca de insumo quando o botão "Buscar" for clicado
btnBuscar.addEventListener('click', () => {
    if (inputId.value.trim() === '') {
        dia
    } else {
        getInsumosPesquisado(urlInsumos, inputId.value);
    }
});

btnAgregar.style.display = "none";
btnAgregar.addEventListener('click', () => {
    // Adiciona o item ao pedido
    addItemPedido();

    inputId.value=''
    inputDescricao.value=''
    inputQuant.value=''
});

btnSConcluir.addEventListener('click', () => {
    // Container principal do PDF
    const conteudo = document.createElement('div');
    conteudo.style.fontFamily = 'Arial, sans-serif';
    conteudo.style.padding = '20px';

    // Cabeçalho
    conteudo.innerHTML = `
        <div style="display: flex; align-items: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
            <img src="../images/logo.png" alt="Logo" style="height: 60px; margin-right: 20px;">
            <h1 style="margin: 0;">SENSOR FIX</h1>
        </div>
        <h2 style="text-align: center; margin-top: 0;">Pedido de Compra</h2>
        <h3>Itens do Pedido:</h3>
    `;

    // Cria a tabela
    const tabela = document.createElement('table');
    tabela.style.width = '100%';
    tabela.style.borderCollapse = 'collapse';
    tabela.style.marginTop = '15px';

    // Cabeçalho da tabela
    const cabecalho = `
        <thead>
            <tr>
                <th style="border: 1px solid black; padding: 8px;">ID</th>
                <th style="border: 1px solid black; padding: 8px;">Nome</th>
                <th style="border: 1px solid black; padding: 8px;">Peso (kg)</th>
                <th style="border: 1px solid black; padding: 8px;">Quantidade</th>
            </tr>
        </thead>
    `;
    tabela.innerHTML = cabecalho;

    // Corpo da tabela com os dados do vetor
    const corpo = document.createElement('tbody');
    vetorInsumos.forEach(item => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td style="border: 1px solid black; padding: 8px;">${item.insumo.id}</td>
            <td style="border: 1px solid black; padding: 8px;">${item.insumo.nome}</td>
            <td style="border: 1px solid black; padding: 8px;">${item.insumo.peso.toFixed(2)}</td>
            <td style="border: 1px solid black; padding: 8px;">${item.quantidade}</td>
        `;
        corpo.appendChild(linha);
    });
    tabela.appendChild(corpo);

    // Adiciona a tabela ao conteúdo
    conteudo.appendChild(tabela);

    // Rodapé
    conteudo.innerHTML += `
        <footer style="border-top: 1px solid #ccc; padding-top: 10px; text-align: center; font-size: 0.9em; color: #555;">
            <p>Solicito ao setor financeiro que aprove e envie para faturamento</p>
            <p>Documento gerado em: <span id="dataGeracao">${new Date().toLocaleString()}</span></p>
        </footer>
    `;

    // Gera o PDF
    html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: 'pedido_compra.pdf',
        html2canvas: { scale: 1 },
        jsPDF: { unit: "mm", format: 'a4', orientation: 'portrait' }
    }).from(conteudo).save().then(() => {
        localStorage.removeItem('vetorInsumos');
        window.location.href = 'estoque.html';
    });
});




// Função de inicialização
window.addEventListener('load', function () {
    
    buscaSugestoes();
    if (idNovoPedido) {
        console.log("ID do pedido recuperado:", idNovoPedido);
    } else {
        alert("Nenhum pedido foi criado ainda.");
    }
    preencherTabelaInsumos();
});

// Função para buscar as sugestões de insumos
function buscaSugestoes() {
    getInsumosCriticos(urlSugestoesCompra);
}

// Função para buscar insumos críticos
async function getInsumosCriticos(url) {
    try {
        const resposta = await fetch(url, { method: "GET" });

        if (resposta.ok) {
            const dataCritico = await resposta.json();
            console.log(dataCritico);
            populaSugestoes(dataCritico);
        } else {
            console.error("Erro na requisição:", resposta.status);
        }
    } catch (erro) {
        console.error("Erro ao buscar insumo:", erro);
    }
}

// Função para buscar insumos pesquisados pelo ID
async function getInsumosPesquisado(url, id) {
    const urlCompleta = url + id;
    try {
        const resposta = await fetch(urlCompleta, { method: "GET" });

        if (resposta.ok) {
            const dataInsumoPesq = await resposta.json();
            currentInsumoPesquisado = dataInsumoPesq;
            console.log(dataInsumoPesq);
            populaCabecalho(dataInsumoPesq);
            btnAgregar.style.display = 'inline';
        } else {
            dilodIdNaoencontrado.showModal();
        }
    } catch (erro) {
        dilodIdNaoencontrado.showModal();
    }
}

// Função para popular a tabela com sugestões de insumos críticos
function populaSugestoes(dataCritico) {
    // Limpa a tabela antes de adicionar novos itens
    tabelaSugestoes.innerHTML = `<tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Estoque</th>
            <th>Quant.Min.</th>
          </tr>`; 

    for (let i = 0; i < dataCritico.length; i++) {
        const tr = document.createElement('tr');
        const tdNome = document.createElement('td');
        tdNome.innerText = dataCritico[i].nome;

        const tdEstoque = document.createElement('td');
        tdEstoque.innerText = dataCritico[i].quantidade;

        const tdQuantMin = document.createElement('td');
        tdQuantMin.innerText = dataCritico[i].estoqueMin;

        const tdId = document.createElement('td');
        tdId.innerText = dataCritico[i].id;
        
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdEstoque);
        tr.appendChild(tdQuantMin);
        
        
        tabelaSugestoes.appendChild(tr);
    }
}


let quantidadeEntrada;
            btnConfirmaEntrada.addEventListener("click",()=>{
                quantidadeEntrada = inputQuantidadeSugestao.value;
                inputQuantidadeSugestao.value= "";
                const novoElementorelacional =  {
                    idRelacao : parseInt(idNovaRelacao),
                    insumo : {
                        id : parseInt(dataCritico[i].id),
                        nome :dataCritico[i].nome,
                        peso : parseFloat(dataCritico[i].peso)
                    },
    
                    quantidade:parseInt(quantidadeEntrada)
                }
    
                vetorInsumos.push(novoElementorelacional);
                preencherTabelaInsumos();
                dialogSugest.close();
            })
            

// Função para popular os dados no cabeçalho do insumo
function populaCabecalho(insumo) {
    inputDescricao.value = insumo.nome;
}

// Função para adicionar item ao pedido
function addItemPedido() {
    const quantidade = parseInt(inputQuant.value);

    if (quantidade <= 0) {
        dilogValorInvalido.showModal();
        return;
    }

    const novaRelacao = {
        quantidade: quantidade,
        insumo: {
            id: parseInt(inputId.value)
        },
        pedidoCompra: {
            id: parseInt(idNovoPedido)
        }
    };

    postRelacaoInsumoPedidoCompra(novaRelacao);
}

// Função para enviar a relação de insumo para o pedido
async function postRelacaoInsumoPedidoCompra(novaRelacao) {
    const quantidade = parseInt(inputQuant.value);
    try {
        const resposta = await fetch(`http://localhost:8080/pedido-insumos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaRelacao)
        });

        if (resposta.ok) {
            const novaRelacaoSalva = await resposta.json();
            idNovaRelacao = novaRelacaoSalva.id;
            
            console.log(novaRelacao);
            const novoElementorelacional =  {
                idRelacao : parseInt(idNovaRelacao),
                insumo : {
                    id : currentInsumoPesquisado.id,
                    nome :currentInsumoPesquisado.nome,
                    peso : currentInsumoPesquisado.peso
                },

                quantidade:quantidade
            }

            vetorInsumos.push(novoElementorelacional);
            
            preencherTabelaInsumos();
        } else {
            console.error("Erro ao criar relação.");
            alert("Erro ao criar relação.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro na requisição: " + erro);
    }
}

// Função para excluir a relação (exemplo de exclusão de item)
async function excluirRelacao(idRelacao) {
    try {
        const resposta = await fetch(`http://localhost:8080/pedido-insumos/${idRelacao}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            console.log("Relação excluída com sucesso!");

            // Remove o item do vetor
            vetorInsumos = vetorInsumos.filter(item => item.idRelacao !== idRelacao);

            // Atualiza a tabela
            preencherTabelaInsumos();
        } else {
            console.error("Erro ao excluir relação:", resposta.status);
        }
    } catch (erro) {
        console.error("Erro ao excluir relação:", erro);
    }
}



function preencherTabelaInsumos() {
    // Atualiza a tabela
    tableInsumopedido.innerHTML = `
    <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Peso(g)</th>
        <th>Quantidade</th>
        
    </tr>`;

    for (let i = 0; i < vetorInsumos.length; i++) {
        const tr = document.createElement('tr');
        const tdNomeInsumo = document.createElement('td');
        const tdIDInsumo = document.createElement('td');
        const tdPesoInsumo = document.createElement('td');
        const tdQuantidadeItemPedido = document.createElement('td');
        const tdBtnExcluir = document.createElement('td');

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = "X";
        btnExcluir.className = 'btnExcluir';
        btnExcluir.style.backgroundColor ='red'

        btnExcluir.addEventListener('click', async () => {
            await excluirRelacao(vetorInsumos[i].idRelacao);
        });

        tdIDInsumo.textContent = vetorInsumos[i].insumo.id;
        tdNomeInsumo.textContent = vetorInsumos[i].insumo.nome;
        tdPesoInsumo.textContent = vetorInsumos[i].insumo.peso;
        tdQuantidadeItemPedido.textContent = vetorInsumos[i].quantidade;
        tdBtnExcluir.appendChild(btnExcluir);

        tr.appendChild(tdIDInsumo);
        tr.appendChild(tdNomeInsumo);
        tr.appendChild(tdPesoInsumo);
        tr.appendChild(tdQuantidadeItemPedido);
        tr.appendChild(tdBtnExcluir);

        tableInsumopedido.appendChild(tr);
    }

    // >>> SALVA O VETOR NO LOCALSTORAGE <<<
    localStorage.setItem("vetorInsumos", JSON.stringify(vetorInsumos));
}
