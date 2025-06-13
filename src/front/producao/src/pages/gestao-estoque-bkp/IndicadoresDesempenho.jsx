import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import {Chart} from "chart.js";

export default function IndicadoresDesempenho() {
  const [depositos, setDepositos] = useState([]);
  const [demandas, setDemandas] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [mesesSelecionados, setMesesSelecionados] = useState([]);
  const [chartTempoProducao, setChartTempoProducao] = useState(null);

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  useEffect(() => {
    getDepositos();
    getDemandas();
  }, []);

  async function getDepositos() {
    try {
      const response = await fetch("http://localhost:8080/estoque-depositos/");
      if (response.ok) setDepositos(await response.json());
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  }

  async function getDemandas() {
    try {
      const response = await fetch("http://localhost:8080/api/demandas/");
      if (response.ok) setDemandas(await response.json());
    } catch (error) {
      console.error("Erro ao buscar demandas:", error);
    }
  }

  function calcularTempos(vetor) {
    return vetor.map(obj => {
      const dtAbertura = new Date(...obj.dataAbertura || [2024, 0, 1]);
      const dtConclusao = new Date(...obj.dataConclusao || [2024, 0, 2]);
      return Math.floor((dtConclusao - dtAbertura) / (1000 * 60 * 60));
    });
  }

  function aplicarFiltro() {
    if (!anoSelecionado || mesesSelecionados.length === 0) {
      alert("Informe um ano e pelo menos um mês.");
      return;
    }
    const demandasFiltradas = demandas.filter(obj => {
      const data = new Date(...obj.dataAbertura);
      return data.getFullYear() === parseInt(anoSelecionado) && mesesSelecionados.includes(data.getMonth() + 1);
    });
    plotaGraficoTempoProducao(calcularTempos(demandasFiltradas));
  }

  function limparFiltro() {
    plotaGraficoTempoProducao(calcularTempos(demandas));
  }

  function plotaGraficoTempoProducao(dados) {
    if (chartTempoProducao) chartTempoProducao.destroy();
    const ctx = document.getElementById("cvsTempoProducao");
    setChartTempoProducao(new Chart(ctx, {
      type: "line",
      data: {
        labels: dados.map((_, i) => `Demanda ${i + 1}`),
        datasets: [{
          label: "Tempo Médio em horas",
          data: dados,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    }));
  }

  return (
    <PageLayout>
      <div className="container-fluid py-0 position-relative">
        <h3 className="display-5 text-start text-blue mb-4">Indicadores de Desempenho</h3>

        {/* Gráfico de Depósitos */}
        <div className="card glass-div rounded mb-4">
          <div className="card-body p-3">
            <h4 className="mb-3">Estado Atual dos Depósitos</h4>
            <canvas id="cvsDepEquip"></canvas>
          </div>
        </div>

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
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setMesesSelecionados(prev => prev.includes(value)
                        ? prev.filter(m => m !== value)
                        : [...prev, value]
                      );
                    }}
                  />
                  {mes}
                </label>
              ))}
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-success w-50" onClick={aplicarFiltro}>Aplicar Filtro</button>
              <button className="btn btn-outline-danger w-50" onClick={limparFiltro}>Limpar Filtro</button>
            </div>
          </div>
        </div>

        {/* Gráfico de Tempo Médio de Produção */}
        <div className="card glass-div rounded">
          <div className="card-body p-3">
            <h4 className="mb-3">Gráfico de Tempo Médio</h4>
            <canvas id="cvsTempoProducao"></canvas>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
