import React, { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

const nomesDepositos = {
  1: "Ativação",
  2: "Ativo",
  3: "Danificado",
  4: "Estoque",
  5: "Manutenção",
};

export default function Movimentacao() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [form, setForm] = useState({
    idEquipamento: "",
    selectOrigem: "1",
    selectDestino: "2",
    quantidade: "",
  });

  useEffect(() => {
    loadMovimentacoes();
  }, []);

  const loadMovimentacoes = async () => {
    try {
      const data = await api.get("/movimentacoes");
      setMovimentacoes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaMov = {
      origem: parseInt(form.selectOrigem),
      destino: parseInt(form.selectDestino),
      dataMovimentacao: new Date().toISOString().slice(0, 19),
      quantidade: parseInt(form.quantidade),
      equipamento: { id: parseInt(form.idEquipamento) },
    };
    try {
      await api.post("/movimentacoes", novaMov);
      alert("Movimentação criada!");
      loadMovimentacoes();
    } catch (err) {
      alert("Erro ao criar movimentação.");
    }
  };

  return (
    <PageLayout>
      <div className="card glass-div rounded p-3 mb-4">
        <h3 className="mb-4">Nova Movimentação</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="idEquipamento">ID do Equipamento</label>
            <input
              type="number"
              id="idEquipamento"
              className="form-control"
              value={form.idEquipamento}
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label>Depósito Inicial</label>
              <select
                id="selectOrigem"
                className="form-select"
                value={form.selectOrigem}
                onChange={handleChange}
              >
                <option value="1">Ativação</option>
                <option value="2">Ativo</option>
                <option value="3">Danificado</option>
                <option value="4">Estoque</option>
                <option value="5">Manutenção</option>
              </select>
            </div>
            <div className="col">
              <label>Depósito de Destino</label>
              <select
                id="selectDestino"
                className="form-select"
                value={form.selectDestino}
                onChange={handleChange}
              >
                <option value="1">Ativação</option>
                <option value="2">Ativo</option>
                <option value="3">Danificado</option>
                <option value="4">Estoque</option>
                <option value="5">Manutenção</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="quantidade">Quantidade</label>
            <input
              type="number"
              id="quantidade"
              className="form-control"
              value={form.quantidade}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-blue" type="submit">
            Salvar
          </button>
        </form>
      </div>

      <div className="card glass-div rounded p-3">
        <h4>Movimentações</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Data</th>
              <th>Equipamento</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((mov, i) => (
              <tr key={i}>
                <td>{new Date(mov.dataMovimentacao).toLocaleString()}</td>
                <td>{mov.equipamento.nome}</td>
                <td>{nomesDepositos[mov.origem]}</td>
                <td>{nomesDepositos[mov.destino]}</td>
                <td>{mov.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
