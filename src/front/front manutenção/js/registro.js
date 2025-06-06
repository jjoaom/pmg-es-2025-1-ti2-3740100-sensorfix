/**
 * Adiciona uma nova linha na tabela de registro de falhas com botão de exclusão
 */
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



function removerLinha(botao) {
  const linha = botao.closest('tr');
  if (linha) {
    linha.remove();
  }
}
