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
function adicionarLinha() {
  const tbody = document.getElementById('falhas-body');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select>
        <option value="" selected disabled>Selecione</option>
        <option>Não Liga</option>
        <option>Sem Sinal</option>
        <option>Leds Piscando</option>
      </select>
    </td>
    <td>
      <select>
        <option value="" selected disabled>Selecione</option>
        <option>Membrana</option>
        <option>Solda</option>
        <option>Fusivel Queimado</option>
      </select>
    </td>
    <td>
      <select>
        <option value="" selected disabled>Selecione</option>
        <option>Outras</option>
        <option>Cabo</option>
        <option>Fio Desconectado</option>
      </select>
    </td>
    <td>
      <select>
        <option value="" selected disabled>Selecione</option>
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
