// ==================== URLs das APIs ====================
const urlDepositos = "http://localhost:8080/estoque-depositos/";
const urlDemandas = "http://localhost:8080/api/demandas/";


// ==================== Elementos DOM ====================
const ctxDepEquip = document.getElementById("cvsDepEquip");
const ctxTempoProducao = document.getElementById("cvsTempoProducao");
const inputAno = document.getElementById("ano");
const btnAplicarFiltro = document.getElementById("btnAplicarFiltro");
const btnLimparFiltro = document.getElementById("btnLimparFiltro");
const containerMeses = document.getElementById("meses");


// ==================== Variáveis Globais ====================
let vetorDepositos = [];
let vetorDemandas = [];
let chartTempoProducao = null;

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


// ==================== Eventos de Página ====================
window.addEventListener("pageshow", async () => {
  criaGraficoDepositos();

  vetorDemandas = await getDemandas(urlDemandas);
  populaFiltroAnos();
  montaCheckboxMeses();

  const tempos = calcularTempos(vetorDemandas);
  plotaGraficoTempoProducao(tempos, false);
});

btnAplicarFiltro.addEventListener("click", () => {
  const ano = parseInt(inputAno.value);
  const mesesSelecionados = Array.from(document.querySelectorAll("#meses input:checked"))
    .map(cb => parseInt(cb.value));

  if (isNaN(ano) || mesesSelecionados.length === 0) {
    alert("Informe um ano e pelo menos um mês.");
    return;
  }

  const vetorFiltrado = filtrarDemandasPorAnoEMes(vetorDemandas, ano, mesesSelecionados);
  const tempos = calcularTempos(vetorFiltrado);
  plotaGraficoTempoProducao(tempos, true);
});

btnLimparFiltro.addEventListener("click", () => {
  const tempos = calcularTempos(vetorDemandas);
  plotaGraficoTempoProducao(tempos, false);
});


// ==================== Funções Auxiliares ====================
function montaCheckboxMeses() {
  containerMeses.innerHTML = "";
  meses.forEach((mes, i) => {
    const div = document.createElement("div");
    div.classList.add("elementoFiltro");
    div.innerHTML = `
      <label for="mes_${i + 1}">${mes}</label>
      <input type="checkbox" id="mes_${i + 1}" value="${i + 1}" />
    `;
    containerMeses.appendChild(div);
  });
}

function populaFiltroAnos() {
  const anos = vetorDemandas
    .map(obj => {
      const arrayData = obj.dataAbertura;
      if (!Array.isArray(arrayData)) return null;

      const data = new Date(...arrayData);
      const ano = data.getFullYear();
      return isNaN(ano) ? null : ano;
    })
    .filter(ano => ano !== null);

  const anosUnicos = [...new Set(anos)].sort((a, b) => a - b);

  const datalist = document.getElementById("anos");
  datalist.innerHTML = "";
  anosUnicos.forEach(ano => {
    const option = document.createElement("option");
    option.value = ano;
    datalist.appendChild(option);
  });
}

function filtrarDemandasPorAnoEMes(vetor, ano, mesesSelecionados) {
  return vetor.filter(obj => {
    if (!obj.dataAbertura || !Array.isArray(obj.dataAbertura)) return false;
    const data = new Date(...obj.dataAbertura);
    return data.getFullYear() === ano && mesesSelecionados.includes(data.getMonth() + 1);
  });
}

function calcularTempos(vetor) {
  return vetor.map(obj => {
    const dtAbertura = obj.dataAbertura ? new Date(...obj.dataAbertura) : new Date(2024, 0, 1);
    const dtConclusao = obj.dataConclusao ? new Date(...obj.dataConclusao) : new Date(2024, 0, 2);
    const diffMs = dtConclusao - dtAbertura;
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHoras;
  });
}


// ==================== Funções de Requisição ====================
async function getDepositos(url) {
  try {
    const resposta = await fetch(url);
    if (resposta.ok) return await resposta.json();
    console.error("Erro na requisição:", resposta.status);
    return [];
  } catch (error) {
    console.error("Erro ao buscar depósitos:", error);
    return [];
  }
}

async function getDemandas(url) {
  try {
    const resposta = await fetch(url);
    if (resposta.ok) return await resposta.json();
    console.error("Erro na requisição:", resposta.status);
    return [];
  } catch (error) {
    console.error("Erro ao buscar demandas:", error);
    return [];
  }
}


// ==================== Gráficos ====================
function criaGraficoDepositos() {
  getDepositos(urlDepositos).then(depositos => {
    vetorDepositos = depositos;

    if (vetorDepositos.length === 0) {
      alert("Nenhum depósito encontrado.");
      return;
    }

    const quantidades = vetorDepositos.map(obj => Number(obj.quantidade));
    const soma = quantidades.reduce((acc, val) => acc + val, 0);

    const nomes = vetorDepositos.map((obj, i) => {
      const percentual = ((quantidades[i] / soma) * 100).toFixed(1);
      return `${obj.tipoDeposito} (${percentual}%)`;
    });

    new Chart(ctxDepEquip, {
      type: 'bar',
      data: {
        labels: nomes,
        datasets: [{
          label: 'Quantidade',
          data: quantidades,
          backgroundColor: [
            'rgba(229, 235, 54, 0.7)',
            'rgba(114, 235, 54, 0.7)',
            'rgba(235, 54, 54, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(148, 54, 235, 0.7)',
          ],
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  });
}

function plotaGraficoTempoProducao(dados, filtroAtivo) {
  if (chartTempoProducao) chartTempoProducao.destroy();

  chartTempoProducao = new Chart(ctxTempoProducao, {
    type: "line", // <- GRÁFICO DE LINHA
    data: {
      labels: dados.map((_, i) => `Demanda ${i + 1}`),
      datasets: [{
        label: filtroAtivo ? "Tempo Médio (filtrado) em horas" : "Tempo Médio em horas",
        data: dados,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        fill: true,
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
