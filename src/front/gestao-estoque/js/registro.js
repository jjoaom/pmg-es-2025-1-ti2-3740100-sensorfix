const urlEquipamento = "http://localhost:8080/equipamentos/";

// captura de elementos
const inputIdEquipamento = document.getElementById("idEquipamento");
const displayEquipamento = document.getElementById("divdisplayEquipamento");

// botões
const btnBuscaEquipamento = document.getElementById("buscarSalvar");

// variáveis
let currentEquipamento;

// evento de clique no botão
btnBuscaEquipamento.addEventListener("click", async () => {
  const valorId = inputIdEquipamento.value;
  await getEquipamento(urlEquipamento, valorId); 
});

// adiciona nova linha à tabela
let rowCounter = 0; // Variável global para gerar IDs únicos

function adicionarLinha() {
  const tbody = document.getElementById('falhas-body');
  const tr = document.createElement('tr');
  
  rowCounter++; // Incrementa o contador para cada nova linha
  tr.setAttribute('data-row-id', rowCounter); // Adiciona o data-row-id à linha
  
  tr.innerHTML = `
    <td>
      <select id="sintoma_${rowCounter}">
        <option value="" selected disabled>Selecione...</option>
        <option>Equipamento Não Liga</option>
        <option>Equipamento Sem Sinal</option>
        <option>LED constante</option>
        <option>Sensor Não Carrega</option>
        <option>Equipamento Descalibrado</option>
      </select>
    </td>
    <td>
      <select id="falhaEncontrada_${rowCounter}">
        <option value="" selected disabled>Selecione...</option>
        <option>Membrana Rompida</option>
        <option>Solda</option>
        <option>Fusivel Queimado</option>
        <option>Fio desconectado</option>
        <option>Falha No Alimentador</option>
        <option>Equipamento Quebrado</option>
        <option>Erro De Calibragem</option>
      </select>
    </td>
    <td>
      <select id="causaProvavel_${rowCounter}">
        <option value="" selected disabled>Selecione...</option>
        <option>Mal Uso Do Equipamento</option>
        <option>Falha De Fabricação</option>
        <option>Armazenamento Inadequado</option>
      </select>
    </td>
    <td>
      <select id="acao_${rowCounter}">
        <option value="" selected disabled>Selecione...</option>
        <option>Encaminhar para Descarte</option>
        <option>Encaminhar para Manutenção</option>
        <option>Encaminhar para Aproveitamento de Componentes</option>
      </select>
    </td>
    <td class="acao-coluna">
      <button class="btn-remover" onclick="removerLinha(this)">🗑️</button>
    </td>
  `;
  tbody.appendChild(tr);
}

// remove linha da tabela
function removerLinha(botao) {
  const linha = botao.closest('tr');
  if (linha) {
    linha.remove();
  }
}

// busca equipamento por ID
async function getEquipamento(url, idEquipamento) {
  const urlCompleta = url + idEquipamento;

  try {
    const resposta = await fetch(urlCompleta, { method: "GET" });

    if (resposta.ok) {
      currentEquipamento = await resposta.json();
      console.log(currentEquipamento);

      displayEquipamento.innerText = currentEquipamento.nome;

    } else {
      console.error("Erro na requisição:", resposta.status);
      displayEquipamento.innerText = "Equipamento não encontrado.";
    }
  } catch (erro) {
    console.error("Erro ao buscar equipamento:", erro);
    displayEquipamento.innerText = "Erro ao buscar equipamento.";
  }
}


function coletarDadosJSON() {
  const falhasBody = document.getElementById('falhas-body');
  const linhas = falhasBody.getElementsByTagName('tr');
  const dadosManutencao = [];

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const rowId = linha.getAttribute('data-row-id'); // Obtém o ID da linha

    // usa getElementById com os IDs únicos
    const sintomaSelect = document.getElementById(`sintoma_${rowId}`);
    const falhaEncontradaSelect = document.getElementById(`falhaEncontrada_${rowId}`);
    const causaProvavelSelect = document.getElementById(`causaProvavel_${rowId}`);
    const acaoSelect = document.getElementById(`acao_${rowId}`);

    const dadosLinha = {
      sintoma: sintomaSelect ? sintomaSelect.value : '',
      falhaEncontrada: falhaEncontradaSelect ? falhaEncontradaSelect.value : '',
      causaProvavel: causaProvavelSelect ? causaProvavelSelect.value : '',
      acao: acaoSelect ? acaoSelect.value : '',
    };
    dadosManutencao.push(dadosLinha);
  }

  console.log('Dados para JSON:', dadosManutencao);
  return dadosManutencao;
}

function montarJsonManutencao() {
  // 1. Coletar dados estáticos do formulário
  const idEquipamento = document.getElementById("idEquipamento").value;
  const estadoHardware = document.getElementById("estadoHardware").value;
  const observacoes = document.getElementById("observacoes").value;

  // Coletar o estado dos checkboxes de \'Trabalho a Ser Realizado\'
  const perdaTotal = document.getElementById("perdaTotalCheckbox").checked;
  const revisao = document.getElementById("revisaoCheckbox").checked;
  const refuncionalizacao = document.getElementById("refuncionalizacaoCheckbox").checked;

  // 2. Coletar dados dinâmicos das falhas usando a função já existente
  const detalhesFalhas = coletarDadosJSON(); // Esta função retorna o array de objetos de falha

  // 3. Montar o objeto JSON final
  const jsonFinal = {
    idEquipamento: idEquipamento,
    estadoHardware: estadoHardware,
    observacoes: observacoes,
    trabalhoRealizado: {
      perdaTotal: perdaTotal,
      revisao: revisao,
      refuncionalizacao: refuncionalizacao
    },
    detalhesFalhas: detalhesFalhas
  };

  return jsonFinal;
}

document.getElementById("btnSalvarDados").addEventListener("click", async () => {
  const dadosManutencao = montarJsonManutencao();
  const urlBackend = "http://sensorfix-backend-fegvfqa4bra5csbq.brazilsouth-01.azurewebsites.net/api/demandas"; 

  try {
    const response = await fetch(urlBackend, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosManutencao), // Converte o objeto JS em string JSON
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Dados enviados com sucesso!", result);
      alert("Registro de manutenção salvo com sucesso!");
    } else {
      const errorData = await response.json();
      console.error("Erro ao enviar dados:", response.status, errorData);
      alert("Erro ao salvar o registro de manutenção: " + (errorData.message || "Erro desconhecido"));
    }
  } catch (error) {
    console.error("Erro na requisição fetch:", error);
    alert("Ocorreu um erro de rede ao tentar salvar o registro.");
  }
});


