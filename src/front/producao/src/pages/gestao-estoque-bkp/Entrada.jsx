import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

export default function Entrada() {
  const [id, setId] = useState("");
  const [insumo, setInsumo] = useState(null);
  const [entrada, setEntrada] = useState("");

  const handleBuscar = async () => {
    try {
      const data = await api.get(`/insumo/${id}`);
      setInsumo(data);
    } catch (err) {
      alert("Insumo não encontrado.");
    }
  };

  const handleEntrada = async () => {
    if (!insumo) return;
    const novaQtd = parseInt(insumo.quantidade, 10) + parseInt(entrada, 10);
    try {
      await api.put(`/insumo/${insumo.id}`, { ...insumo, quantidade: novaQtd });
      alert("Entrada realizada com sucesso.");
      setInsumo(null);
      setId("");
      setEntrada("");
    } catch (err) {
      alert("Erro ao atualizar insumo.");
    }
  };

  return (
    <PageLayout>
      <div className="card glass-div rounded p-3">
        <h3 className="mb-4">Entrada de Insumo</h3>
        <div className="mb-3">
          <label htmlFor="idBusca">ID do Insumo</label>
          <input
            type="text"
            id="idBusca"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleBuscar}>
            Buscar
          </button>
        </div>
        {insumo && (
          <>
            <p>Descrição: {insumo.nome}</p>
            <p>Estoque atual: {insumo.quantidade}</p>
            <div className="mb-3">
              <label htmlFor="entrada">Quantidade de Entrada</label>
              <input
                type="number"
                id="entrada"
                className="form-control"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={handleEntrada}>
              Dar Entrada
            </button>
          </>
        )}
      </div>
    </PageLayout>
  );
}
