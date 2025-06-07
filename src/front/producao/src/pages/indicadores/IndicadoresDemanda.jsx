import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";

const IndicadoresDemanda = ({ demanda }) => {
  // === Extração e cálculo dos indicadores ===

  // Peças defeituosas
  const pecasDefeituosas = demanda.pecasDefeituosas || [];
  const totalDefeituosas = pecasDefeituosas.reduce(
    (sum, item) => sum + (item.quantidade || 0),
    0
  );

  const totalPecas = totalDefeituosas; // se nenhuma foi recuperada
  const pecasRecuperadas = 0; // conforme exemplo
  const percentualRecuperadas =
    totalPecas > 0 ? (pecasRecuperadas / totalPecas) * 100 : 0;

  // Status da demanda
  const status = demanda.statusDemanda || "";
  const statusPercentual = ["ENCERRADA", "DESCARTADA"].includes(status.toUpperCase()) ? 100 : 0;

  // Tempo de ciclo
  const parseData = (arr) =>
    arr && arr.length >= 5
      ? new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4])
      : null;

  const dataCriacao = parseData(demanda.dataHoraCriacao);
  const dataEncerramento = parseData(demanda.dataEncerramento);
  const tempoCicloDias =
    dataCriacao && dataEncerramento
      ? Math.floor((dataEncerramento - dataCriacao) / (1000 * 60 * 60 * 24))
      : 0;

  // Eficiência do processo
  const testeBemSucedido = demanda.testeBemSucedido;
  const eficienciaProcesso = testeBemSucedido ? 100 : 0;

  const data = [
    {
      nome: "Peças Recuperadas",
      valor: percentualRecuperadas
    },
    {
      nome: "Status da Demanda",
      valor: statusPercentual
    },
    {
      nome: "Tempo de Ciclo (dias)",
      valor: tempoCicloDias
    },
    {
      nome: "Eficiência Processo",
      valor: eficienciaProcesso
    }
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" angle={-15} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#2196F3">
            <LabelList dataKey="valor" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndicadoresDemanda;
