// ==================== URLs das APIs ====================
const urlDepositos = "http://localhost:8080/estoque-depositos/";
const urlDemandas = "http://localhost:8080/api/demandas/";
const urlFalhas = "http://localhost:8080/falhas//todas_falhas"; // Nova URL para falhas

// ==================== Elementos DOM ====================
const ctxDepEquip = document.getElementById("cvsDepEquip");
const ctxTempoProducao = document.getElementById("cvsTempoProducao");
const ctxFalhas = document.getElementById("cvsFalhas"); // Novo canvas para o gráfico de falhas

// Filtros de Tempo de Produção
const inputAno = document.getElementById("ano");
const btnAplicarFiltro = document.getElementById("btnAplicarFiltro");
const btnLimparFiltro = document.getElementById("btnLimparFiltro");
const containerMeses = document.getElementById("meses");

// Filtros de Defeitos Recorrentes
const inputAnoRevisoes = document.getElementById("anoRevisoes"); // Novo input de ano para revisões
const btnAplicarFiltroRevisoes = document.getElementById("btnAplicarFiltroRevisoes"); // Novo botão para aplicar filtro de revisões
const btnLimparFiltroRevisoes = document.getElementById("btnLimparFiltroRevisoes"); // Novo botão para limpar filtro de revisões
const containerMesesRevisoes = document.getElementById("mesesRevisoes"); // Novo container para checkboxes de meses de revisões

// ==================== Variáveis Globais ====================
let vetorDepositos = [];
let vetorDemandas = [];
let vetorFalhas = []; // Novo vetor para armazenar os dados de falhas
let chartTempoProducao = null;
let chartFalhas = null; // Nova variável para a instância do gráfico de falhas

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


// ==================== Eventos de Página ====================
window.addEventListener("pageshow", async () => {
    criaGraficoDepositos();

    vetorDemandas = await getDemandas(urlDemandas);
    populaFiltroAnos(); // Popula filtro de anos para Demandas
    montaCheckboxMeses(); // Monta checkboxes para Demandas

    const tempos = calcularTempos(vetorDemandas);
    plotaGraficoTempoProducao(tempos, false);

    // --- Nova funcionalidade para o gráfico de falhas ---
    vetorFalhas = await getFalhas(urlFalhas);
    populaFiltroAnosRevisoes(); // Popula filtro de anos para Falhas
    montaCheckboxMesesRevisoes(); // Monta checkboxes para Falhas

    const dadosFalhas = processarDadosFalhas(vetorFalhas);
    plotaGraficoFalhas(dadosFalhas, false);
});

// Eventos de filtro para Tempo de Produção (já existentes)
btnAplicarFiltro.addEventListener("click", () => {
    const ano = parseInt(inputAno.value);
    const mesesSelecionados = Array.from(document.querySelectorAll("#meses input:checked"))
        .map(cb => parseInt(cb.value));

    if (isNaN(ano) || mesesSelecionados.length === 0) {
        alert("Para o filtro de Tempo de Produção: Informe um ano e pelo menos um mês.");
        return;
    }

    const vetorFiltrado = filtrarDemandasPorAnoEMes(vetorDemandas, ano, mesesSelecionados);
    const tempos = calcularTempos(vetorFiltrado);
    plotaGraficoTempoProducao(tempos, true);
});

btnLimparFiltro.addEventListener("click", () => {
    const tempos = calcularTempos(vetorDemandas);
    plotaGraficoTempoProducao(tempos, false);
    inputAno.value = ""; // Limpa o input do ano
    document.querySelectorAll("#meses input:checked").forEach(cb => cb.checked = false); // Desmarca todos os checkboxes
});

// --- Novos Eventos de filtro para Defeitos Recorrentes ---
btnAplicarFiltroRevisoes.addEventListener("click", () => {
    const ano = parseInt(inputAnoRevisoes.value);
    const mesesSelecionados = Array.from(document.querySelectorAll("#mesesRevisoes input:checked"))
        .map(cb => parseInt(cb.value));

    if (isNaN(ano) || mesesSelecionados.length === 0) {
        alert("Para o filtro de Defeitos Recorrentes: Informe um ano e pelo menos um mês.");
        return;
    }

    const vetorFiltrado = filtrarFalhasPorAnoEMes(vetorFalhas, ano, mesesSelecionados);
    const dadosFalhas = processarDadosFalhas(vetorFiltrado);
    plotaGraficoFalhas(dadosFalhas, true);
});

btnLimparFiltroRevisoes.addEventListener("click", () => {
    const dadosFalhas = processarDadosFalhas(vetorFalhas);
    plotaGraficoFalhas(dadosFalhas, false);
    inputAnoRevisoes.value = ""; // Limpa o input do ano
    document.querySelectorAll("#mesesRevisoes input:checked").forEach(cb => cb.checked = false); // Desmarca todos os checkboxes
});


// ==================== Funções Auxiliares Comuns ====================
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

// --- Novas Funções Auxiliares para Falhas ---
function montaCheckboxMesesRevisoes() {
    containerMesesRevisoes.innerHTML = "";
    meses.forEach((mes, i) => {
        const div = document.createElement("div");
        div.classList.add("elementoFiltro");
        div.innerHTML = `
            <label for="mes_rev_${i + 1}">${mes}</label>
            <input type="checkbox" id="mes_rev_${i + 1}" value="${i + 1}" />
        `;
        containerMesesRevisoes.appendChild(div);
    });
}

function populaFiltroAnos() {
    const anos = vetorDemandas
        .map(obj => {
            const arrayData = obj.dataAbertura;
            if (!Array.isArray(arrayData)) return null;
            const data = new Date(arrayData[0], arrayData[1] - 1, arrayData[2]); // Ajusta mês (0-11)
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

function populaFiltroAnosRevisoes() {
    const anos = vetorFalhas
        .map(obj => {
            const arrayData = obj.dataRevisao;
            if (!Array.isArray(arrayData)) return null;
            const data = new Date(arrayData[0], arrayData[1] - 1, arrayData[2]); // Ajusta mês (0-11)
            const ano = data.getFullYear();
            return isNaN(ano) ? null : ano;
        })
        .filter(ano => ano !== null);

    const anosUnicos = [...new Set(anos)].sort((a, b) => a - b);

    const datalist = document.getElementById("anosRevisoes");
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
        const data = new Date(obj.dataAbertura[0], obj.dataAbertura[1] - 1, obj.dataAbertura[2]); // Ajusta mês
        return data.getFullYear() === ano && mesesSelecionados.includes(data.getMonth() + 1);
    });
}

// --- Nova Função de Filtro para Falhas ---
function filtrarFalhasPorAnoEMes(vetor, ano, mesesSelecionados) {
    return vetor.filter(obj => {
        if (!obj.dataRevisao || !Array.isArray(obj.dataRevisao)) return false;
        const data = new Date(obj.dataRevisao[0], obj.dataRevisao[1] - 1, obj.dataRevisao[2]); // Ajusta mês
        return data.getFullYear() === ano && mesesSelecionados.includes(data.getMonth() + 1);
    });
}

function calcularTempos(vetor) {
    return vetor.map(obj => {
        // As datas no seu JSON estão como [ano, mês, dia]. O construtor de Date espera (ano, mês-1, dia)
        const dtAbertura = obj.dataAbertura ? new Date(obj.dataAbertura[0], obj.dataAbertura[1] - 1, obj.dataAbertura[2]) : new Date(2024, 0, 1);
        const dtConclusao = obj.dataConclusao ? new Date(obj.dataConclusao[0], obj.dataConclusao[1] - 1, obj.dataConclusao[2]) : new Date(2024, 0, 2);
        const diffMs = dtConclusao - dtAbertura;
        const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHoras;
    });
}

// --- Nova Função de Processamento de Dados para o Gráfico de Falhas ---
function processarDadosFalhas(vetor) {
    const contagemFalhas = {}; // Objeto para armazenar a contagem de cada falha

    vetor.forEach(falha => {
        const nomeFalha = falha.falhaEncontrada;
        if (nomeFalha) {
            contagemFalhas[nomeFalha] = (contagemFalhas[nomeFalha] || 0) + 1;
        }
    });

    // Converter o objeto para um formato que o Chart.js entenda (labels e data)
    const labels = Object.keys(contagemFalhas);
    const data = Object.values(contagemFalhas);

    return { labels, data };
}


// ==================== Funções de Requisição ====================
async function getDepositos(url) {
    try {
        const resposta = await fetch(url);
        if (resposta.ok) return await resposta.json();
        console.error("Erro na requisição de depósitos:", resposta.status);
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
        console.error("Erro na requisição de demandas:", resposta.status);
        return [];
    } catch (error) {
        console.error("Erro ao buscar demandas:", error);
        return [];
    }
}

// --- Nova Função de Requisição para Falhas ---
async function getFalhas(url) {
    try {
        const resposta = await fetch(url);
        if (resposta.ok) return await resposta.json();
        console.error("Erro na requisição de falhas:", resposta.status);
        return [];
    } catch (error) {
        console.error("Erro ao buscar falhas:", error);
        return [];
    }
}


// ==================== Gráficos ====================
function criaGraficoDepositos() {
    getDepositos(urlDepositos).then(depositos => {
        vetorDepositos = depositos;

        if (vetorDepositos.length === 0) {
            // alert("Nenhum depósito encontrado."); // Comentado para não poluir com muitos alertas
            return;
        }

        const quantidades = vetorDepositos.map(obj => Number(obj.quantidade));
        const soma = quantidades.reduce((acc, val) => acc + val, 0);

        const nomes = vetorDepositos.map((obj, i) => {
            const percentual = ((quantidades[i] / soma) * 100).toFixed(1);
            return `${obj.tipoDeposito} (${percentual}%)`;
        });

        // Verifica se já existe um gráfico e o destrói para evitar sobreposição
        if (Chart.getChart(ctxDepEquip)) {
            Chart.getChart(ctxDepEquip).destroy();
        }

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

    // Verifique se 'dados' está vazio ou é nulo para evitar erros no Chart.js
    const labels = dados.length > 0 ? dados.map((_, i) => `Demanda ${i + 1}`) : [];
    const chartData = dados.length > 0 ? dados : [];

    chartTempoProducao = new Chart(ctxTempoProducao, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: filtroAtivo ? "Tempo Médio (filtrado) em horas" : "Tempo Médio em horas",
                data: chartData,
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

// --- Nova Função para Plotar o Gráfico de Falhas ---
function plotaGraficoFalhas(dados, filtroAtivo) {
    if (chartFalhas) chartFalhas.destroy();

    // Verifique se 'dados.labels' ou 'dados.data' estão vazios/nulos
    const labels = dados.labels && dados.labels.length > 0 ? dados.labels : [];
    const chartData = dados.data && dados.data.length > 0 ? dados.data : [];
    const totalFalhas = chartData.reduce((sum, count) => sum + count, 0);

    chartFalhas = new Chart(ctxFalhas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: filtroAtivo ? `Ocorrências de Falhas (filtrado) - Total: ${totalFalhas}` : `Ocorrências de Falhas - Total: ${totalFalhas}`,
                data: chartData,
                backgroundColor: 'rgba(99, 193, 255, 0.7)', // Cor vermelha para falhas
                borderColor: 'rgb(99, 195, 255)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Falha Encontrada'
                    }
                },
                y: {
                    beginAtZero: true,
                    precision: 0, // Garante que o eixo Y não mostre casas decimais para contagens
                    title: {
                        display: true,
                        text: 'Número de Ocorrências'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    if (totalFalhas === 0 && filtroAtivo) {
        // Você pode adicionar uma mensagem aqui ou estilizar para indicar que não há dados
        // console.log("Nenhuma falha encontrada para o período filtrado.");
    }
}