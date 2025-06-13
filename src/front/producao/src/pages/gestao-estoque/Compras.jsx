import React, { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

export default function Compras() {
  const [sugestoes, setSugestoes] = useState([]);
  const [novoPedidoId, setNovoPedidoId] = useState(null);

  useEffect(() => {
    async function loadSugestoes() {
      try {
        const data = await api.get("/insumo/sugestoes-compra");
        setSugestoes(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadSugestoes();
    const storedPedido = localStorage.getItem("idNovoPedido");
    if (storedPedido) setNovoPedidoId(storedPedido);
  }, []);

  const handleNovoPedido = async () => {
    const pedido = {
      idfornecedor: 0,
      data: new Date().toISOString().split("T")[0],
    };
    try {
      const data = await api.post("/pedidos", pedido);
      setNovoPedidoId(data.id);
      localStorage.setItem("idNovoPedido", data.id);
      alert("Novo pedido criado!");
    } catch (err) {
      alert("Erro ao criar pedido.");
    }
  };

  return (
    <PageLayout>
      <div className="container text-center py-5 w-50">
      <div className="card glass-div rounded p-3">
        <h3 className="mb-4">Compras – Sugestões</h3>
        <button className="btn btn-primary mb-3" onClick={handleNovoPedido}>
          Novo Pedido
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Estoque</th>
              <th>Quant. Mín.</th>
            </tr>
          </thead>
          <tbody>
            {sugestoes.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>{item.estoqueMin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </PageLayout>
  );
}
