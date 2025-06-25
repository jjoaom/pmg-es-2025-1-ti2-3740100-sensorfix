import { useState, useEffect, useRef } from "react";
import PageLayout from "../../components/PageLayout";
import { Chart, registerables } from "chart.js";
import { api } from "../../utils/api"; // ajuste o caminho se necessário

// Registra todos os módulos necessários do Chart.js
Chart.register(...registerables);

export default function IndicadoresDesempenho() {
  const [demandas, setDemandas] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [mesesSelecionados, setMesesSelecionados] = useState([]);
  const chartTempoProducaoRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  useEffect(() => {
    console.log("Demandas após atualização:", demandas);
  }, [demandas]);

  async function getDemandas() {
    try {
      const response = await api.get("/api/demandas/");
      console.log("Resposta completa da API:", response);

      if (Array.isArray(response.data)) {
        setDemandas(response.data);
      } else {
        console.error("A resposta da API não é um array:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar demandas:", error);
    }
  }

  function calcularTempos(vetor) {
    return vetor.map((obj) => {
      if (!obj.dataAbertura || !obj.dataConclusao) return 0;
      const dtAbertura = new Date(...obj.dataAbertura);
      const dtConclusao = new Date(...obj.dataConclusao);
      return Math.floor((dtConclusao - dtAbertura) / (1000 * 60 * 60));
    });
  }

  function aplicarFiltro() {
    if (!anoSelecionado || mesesSelecionados.length === 0) {
      alert("Informe um ano e pelo menos um mês.");
      return;
    }
    const demandasFiltradas = demandas.filter((obj) => {
      if (!obj.dataAbertura) return false;
      const data = new Date(...obj.dataAbertura);
      return (
        data.getFullYear() === parseInt(anoSelecionado) &&
        mesesSelecionados.includes(data.getMonth() + 1)
      );
    });

    plotaGraficoTempoProducao(calcularTempos(demandasFiltradas));
  }

  function plotaGraficoTempoProducao(dados) {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const ctx = chartTempoProducaoRef.current;
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dados.map((_, i) => `Demanda ${i + 1}`),
        datasets: [
          {
            label: "Tempo Médio em horas",
            data: dados,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.3)",
            fill: true,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  return (
    <PageLayout>
      <div className="container-fluid py-0 position-relative">
        <h3 className="display-5 text-start text-blue mb-4">
          Indicadores de Desempenho
        </h3>

        {/* Filtro de Tempo Médio de Produção */}
        <div className="card glass-div rounded mb-4">
          <div className="card-body p-3">
            <h4 className="mb-3">Tempo médio de Produção</h4>

            <div className="form-group mb-3">
              <label htmlFor="ano">Escolha o ano:</label>
              <input
                type="number"
                id="ano"
                className="form-control"
                placeholder="Ano"
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(e.target.value)}
              />
            </div>

            <div className="d-flex flex-wrap gap-3 mb-3">
              {meses.map((mes, i) => (
                <label key={i} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={i + 1}
                    checked={mesesSelecionados.includes(i + 1)}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setMesesSelecionados((prev) =>
                        prev.includes(value)
                          ? prev.filter((m) => m !== value)
                          : [...prev, value]
                      );
                    }}
                  />
                  {mes}
                </label>
              ))}
            </div>
            <button className="btn btn-design btn-blue" onClick={aplicarFiltro}>
              Aplicar Filtro
            </button>
          </div>
        </div>

        {/* Gráfico de Tempo Médio de Produção */}
        <div className="card glass-div rounded">
          <div className="card-body p-3">
            <h4 className="mb-3">Gráfico de Tempo Médio</h4>
            <canvas id="cvsTempoProducao" ref={chartTempoProducaoRef}></canvas>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
