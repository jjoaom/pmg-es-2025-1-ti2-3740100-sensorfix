// URLs
const urlInsumos = 'http://localhost:8080/insumo';
const urlEquipamentos = 'http://localhost:8080/equipamentos';

// Dados
let dataInsumos = [];
let dataEquipamentos = [];

// Elementos
const btnInsumo = document.getElementById('btnInsumo');
const btnEquipamento = document.getElementById('btnEquipamentos');
const inputBusca = document.querySelector('#cabeçalho input');
const divInsumos = document.getElementById('showInsumos');
const divEquipamentos = document.getElementById('showEquipamentos');
const tbodyInsumos = document.querySelector('#tableInsumos tbody');
const tbodyEquipamentos = document.querySelector('#tableEquipamentos tbody');

// Variável de controle para saber qual modo estamos (insumo ou equipamento)
let modoAtual = 'insumos';

// Event Listeners
btnInsumo.addEventListener('click', async () => {
  modoAtual = 'insumos';
  divInsumos.style.display = 'block';
  divEquipamentos.style.display = 'none';
  btnInsumo.style.backgroundColor = '#4CAF50'; // Verde
  btnInsumo.style.color = 'white'; // Texto branco

  btnEquipamento.style.backgroundColor = ''; // Volta ao padrão
  btnEquipamento.style.color = ''; 
  if (dataInsumos.length === 0) {
    await getInsumos();
  }
  renderTabela();
});

btnEquipamento.addEventListener('click', async () => {
  modoAtual = 'equipamentos';
  divInsumos.style.display = 'none';
  divEquipamentos.style.display = 'block';
  btnEquipamento.style.backgroundColor = '#4CAF50'; // Verde
  btnEquipamento.style.color = 'white';

  btnInsumo.style.backgroundColor = ''; // Volta ao padrão
  btnInsumo.style.color = '';
  if (dataEquipamentos.length === 0) {
    await getEquipamentos();
  }
  renderTabela();
});

inputBusca.addEventListener('input', () => {
  renderTabela();
});

// Funções

async function getInsumos() {
  try {
    const resposta = await fetch(urlInsumos);
    if (resposta.ok) {
      dataInsumos = await resposta.json();
    } else {
      console.error("Erro ao buscar insumos:", resposta.status);
    }
  } catch (erro) {
    console.error("Erro ao buscar insumos:", erro);
  }
}

async function getEquipamentos() {
  try {
    const resposta = await fetch(urlEquipamentos);
    if (resposta.ok) {
      dataEquipamentos = await resposta.json();
    } else {
      console.error("Erro ao buscar equipamentos:", resposta.status);
    }
  } catch (erro) {
    console.error("Erro ao buscar equipamentos:", erro);
  }
}

function renderTabela() {
    const filtro = inputBusca.value.trim().toLowerCase();
  
    if (modoAtual === 'insumos') {
      tbodyInsumos.innerHTML = '';
      const insumosFiltrados = dataInsumos.filter(insumo => 
        insumo.nome.toLowerCase().includes(filtro)
      );
  
      insumosFiltrados.forEach(insumo => {
        const row = tbodyInsumos.insertRow();
        row.insertCell(0).textContent = insumo.id;
        row.insertCell(1).textContent = insumo.nome;
        row.insertCell(2).textContent = insumo.quantidade;
        row.insertCell(3).textContent = insumo.estoqueMin;
        row.insertCell(4).textContent = insumo.endereco;
      });
  
    } else if (modoAtual === 'equipamentos') {
      tbodyEquipamentos.innerHTML = '';
      const equipamentosFiltrados = dataEquipamentos.filter(equipamento => 
        equipamento.nome.toLowerCase().includes(filtro)
      );
  
      equipamentosFiltrados.forEach(equipamento => {
        const row = tbodyEquipamentos.insertRow();
        row.insertCell(0).textContent = equipamento.id;
        row.insertCell(1).textContent = equipamento.nome;
        row.insertCell(2).textContent = equipamento.quantidade;
        row.insertCell(3).textContent = equipamento.estoqueMin;
        row.insertCell(4).textContent = equipamento.endereco;
      });
    }
  }
