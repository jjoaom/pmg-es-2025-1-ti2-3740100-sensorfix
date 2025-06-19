import React, { useState, useEffect } from "react";
import IndicadoresDemanda from "./IndicadoresDemanda";
import { api } from "../../utils/api";
import PageLayout from "../../components/PageLayout";

export default function Indicadores() {
  const [demanda, setDemanda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarDemanda = async () => {
      try {
        const dados = await api.get("/api/demandas/");
        if (dados && dados.length > 0) {
          setDemanda(dados[0]); // Pode trocar pelo ID ou lógica de filtro
        } else {
          setErro("Nenhuma demanda encontrada.");
        }
      } catch (e) {
        setErro("Erro ao buscar demanda: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    carregarDemanda();
  }, []);

  if (loading) return <p>Carregando indicadores...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  return (
    <>
      <PageLayout>
        <div className="container text-center py-5 ">
          <h1 className="display-2 mb-5 text-blue">Indicadores</h1>
          <div className="d-flex flex-column align-items-center glass-div">
            {demanda && <IndicadoresDemanda demanda={demanda} />}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
