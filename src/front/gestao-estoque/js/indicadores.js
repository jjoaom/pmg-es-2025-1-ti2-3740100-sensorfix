// ==================== URLs das APIs ====================
const urlDepositos = "http://localhost:8080/estoque-depositos/";
const urlDemandas = "http://localhost:8080/api/demandas/";
const urlFalhas = "http://localhost:8080/falhas//todas_falhas";

// ==================== Elementos DOM ====================
const ctxDepEquip = document.getElementById("cvsDepEquip");
const mediaTempoProducaoElement = document.getElementById("mediaTempoProducao"); // Elemento para exibir a média
const ctxFalhas = document.getElementById("cvsFalhas");

// Filtros de Tempo de Produção
const inputAno = document.getElementById("ano");
const btnAplicarFiltro = document.getElementById("btnAplicarFiltro");
const btnLimparFiltro = document.getElementById("btnLimparFiltro");
const containerMeses = document.getElementById("meses");

// Filtros de Defeitos Recorrentes
const inputAnoRevisoes = document.getElementById("anoRevisoes");
const btnAplicarFiltroRevisoes = document.getElementById("btnAplicarFiltroRevisoes");
const btnLimparFiltroRevisoes = document.getElementById("btnLimparFiltroRevisoes");
const containerMesesRevisoes = document.getElementById("mesesRevisoes");

// ==================== Variáveis Globais ====================
let vetorDepositos = [];
let vetorDemandas = [];
let vetorFalhas = [];
let chartFalhas = null;

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


// ==================== Eventos de Página ====================
window.addEventListener("pageshow", async () => {
    criaGraficoDepositos();

    vetorDemandas = await getDemandas(urlDemandas);
    // Popula filtro de anos e meses para Demandas baseado em dataHoraCriacao
    populaFiltroAnosDemandas();
    montaCheckboxMeses();

    const mediaTempos = calcularMediaTempoProducao(vetorDemandas);
    exibeMediaTempoProducao(mediaTempos, false);

    vetorFalhas = await getFalhas(urlFalhas);
    populaFiltroAnosRevisoes();
    montaCheckboxMesesRevisoes();

    const dadosFalhas = processarDadosFalhas(vetorFalhas);
    plotaGraficoFalhas(dadosFalhas, false);
});

// Eventos de filtro para Média de Demora de Produção
btnAplicarFiltro.addEventListener("click", () => {
    const ano = parseInt(inputAno.value);
    const mesesSelecionados = Array.from(document.querySelectorAll("#meses input:checked"))
        .map(cb => parseInt(cb.value));

    if (isNaN(ano) || mesesSelecionados.length === 0) {
        alert("Para o filtro de Média de Demora de Produção: Informe um ano e pelo menos um mês.");
        return;
    }

    const vetorFiltrado = filtrarDemandasPorAnoEMes(vetorDemandas, ano, mesesSelecionados);
    const mediaTempos = calcularMediaTempoProducao(vetorFiltrado);
    exibeMediaTempoProducao(mediaTempos, true);
});

btnLimparFiltro.addEventListener("click", () => {
    const mediaTempos = calcularMediaTempoProducao(vetorDemandas);
    exibeMediaTempoProducao(mediaTempos, false);
    inputAno.value = "";
    document.querySelectorAll("#meses input:checked").forEach(cb => cb.checked = false);
});

// Eventos de filtro para Defeitos Recorrentes (mantidos)
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
    inputAnoRevisoes.value = "";
    document.querySelectorAll("#mesesRevisoes input:checked").forEach(cb => cb.checked = false);
});


// ==================== Funções Auxiliares Comuns ====================

// Função auxiliar para parsear arrays de data no formato [ano, mês, dia, hora, minuto, segundo, milissegundo]
function parseDateArray(arr) {
    // Garante que o array tem pelo menos ano, mês, dia
    if (!Array.isArray(arr) || arr.length < 3) return null;

    const year = arr[0];
    const month = arr[1] - 1; // Mês é 0-indexed em JavaScript Date (Janeiro=0, Dezembro=11)
    const day = arr[2];
    const hour = arr[3] || 0; // Se hora não existir, default para 0
    const minute = arr[4] || 0; // Se minuto não existir, default para 0
    const second = arr[5] || 0; // Se segundo não existir, default para 0
    // O último elemento é geralmente nanosegundos do Java, precisamos converter para milissegundos
    const millisecond = arr[6] ? Math.floor(arr[6] / 1000000) : 0;

    return new Date(year, month, day, hour, minute, second, millisecond);
}

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

// Modificada para usar dataHoraCriacao para popular os anos de filtro de demandas
function populaFiltroAnosDemandas() {
    const anos = vetorDemandas
        .map(obj => {
            const dateObj = parseDateArray(obj.dataHoraCriacao);
            return dateObj ? dateObj.getFullYear() : null;
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
            const dateObj = parseDateArray(obj.dataRevisao);
            return dateObj ? dateObj.getFullYear() : null;
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

// Modificada para usar dataHoraCriacao para filtrar demandas
function filtrarDemandasPorAnoEMes(vetor, ano, mesesSelecionados) {
    return vetor.filter(obj => {
        const dateObj = parseDateArray(obj.dataHoraCriacao);
        if (!dateObj) return false;
        return dateObj.getFullYear() === ano && mesesSelecionados.includes(dateObj.getMonth() + 1);
    });
}

function filtrarFalhasPorAnoEMes(vetor, ano, mesesSelecionados) {
    return vetor.filter(obj => {
        const dateObj = parseDateArray(obj.dataRevisao);
        if (!dateObj) return false;
        return dateObj.getFullYear() === ano && mesesSelecionados.includes(dateObj.getMonth() + 1);
    });
}

// Função para calcular a média do tempo de produção (usa dataHoraCriacao e dataEncerramento)
function calcularMediaTempoProducao(vetor) {
    if (!vetor || vetor.length === 0) {
        return "0.00"; // Retorna string "0.00" se não houver demandas ou vetor vazio
    }

    let somaTempos = 0;
    let demandasValidas = 0;

    vetor.forEach(obj => {
        const dtCriacao = parseDateArray(obj.dataHoraCriacao);
        const dtEncerramento = parseDateArray(obj.dataEncerramento);

        // Apenas calcula o tempo se ambas as datas existirem e forem válidas, e dataEncerramento for posterior a dataCriacao
        if (dtCriacao && dtEncerramento && !isNaN(dtCriacao.getTime()) && !isNaN(dtEncerramento.getTime()) && dtEncerramento > dtCriacao) {
            const diffMs = dtEncerramento.getTime() - dtCriacao.getTime();
            const diffHoras = diffMs / (1000 * 60 * 60);
            somaTempos += diffHoras;
            demandasValidas++;
        }
    });

    if (demandasValidas === 0) {
        return "0.00"; // Nenhuma demanda válida para cálculo
    }

    const media = somaTempos / demandasValidas;
    return media.toFixed(2); // Retorna a média formatada com 2 casas decimais
}

// Função para exibir a média do tempo de produção na tela
function exibeMediaTempoProducao(media, filtroAtivo) {
    const textoFiltro = filtroAtivo ? "(filtrado)" : "(total)";
    if (mediaTempoProducaoElement) {
        mediaTempoProducaoElement.innerHTML = `
            <p>Média de Demora: <strong>${media} horas</strong> ${textoFiltro}</p>
            ${media === "0.00" ? '<p class="aviso-sem-dados">Nenhuma demanda válida encontrada para o período selecionado.</p>' : ''}
        `;
    }
}


function processarDadosFalhas(vetor) {
    const contagemFalhas = {};

    vetor.forEach(falha => {
        const nomeFalha = falha.falhaEncontrada;
        if (nomeFalha) {
            contagemFalhas[nomeFalha] = (contagemFalhas[nomeFalha] || 0) + 1;
        }
    });

    // Ordena por ocorrência decrescente
    const labels = Object.keys(contagemFalhas).sort((a, b) => contagemFalhas[b] - contagemFalhas[a]);
    const data = labels.map(label => contagemFalhas[label]);

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
            return;
        }

        const quantidades = vetorDepositos.map(obj => Number(obj.quantidade));
        const soma = quantidades.reduce((acc, val) => acc + val, 0);

        const nomes = vetorDepositos.map((obj, i) => {
            const percentual = ((quantidades[i] / soma) * 100).toFixed(1);
            return `${obj.tipoDeposito} (${percentual}%)`;
        });

        if (Chart.getChart(ctxDepEquip)) {
            Chart.getChart(ctxDepEquip).destroy();
        }

        new Chart(ctxDepEquip, {
            type: 'pie',
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
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Distribuição dos Tipos de Depósitos'
                    }
                }
            }
        });
    });
}

function plotaGraficoFalhas(dados, filtroAtivo) {
    if (chartFalhas) chartFalhas.destroy();

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
                backgroundColor: 'rgba(99, 193, 255, 0.7)',
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
                    precision: 0,
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
    }
}