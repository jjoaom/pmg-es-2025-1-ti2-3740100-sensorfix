import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

export default function CadastroEquipamento() {
  const [form, setForm] = useState({
    descricao: "",
    peso: "",
    estMin: "",
    total: "",
    endereco: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const equipamento = {
      nome: form.descricao,
      peso: parseFloat(form.peso),
      estoqueMin: parseInt(form.estMin),
      quantidade: parseInt(form.total),
      endereco: form.endereco,
      deposito: 2,
    };
    try {
      await api.post("/equipamentos", equipamento);
      alert("Equipamento cadastrado com sucesso!");
      setForm({ descricao: "", peso: "", estMin: "", total: "", endereco: "" });
    } catch {
      alert("Erro ao cadastrar equipamento.");
    }
  };

  return (
    <PageLayout>
      <div className="card glass-div rounded p-3">
        <h3 className="mb-4">Cadastro de Equipamento</h3>
        <div className="mb-3">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            className="form-control"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="peso">Peso (g)</label>
            <input
              type="text"
              id="peso"
              className="form-control"
              value={form.peso}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="estMin">Estoque Mínimo</label>
            <input
              type="text"
              id="estMin"
              className="form-control"
              value={form.estMin}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="total">Quantidade em Estoque</label>
            <input
              type="text"
              id="total"
              className="form-control"
              value={form.total}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="end">Endereço</label>
            <input
              type="text"
              id="end"
              className="form-control"
              value={form.endereco}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-design btn-blue" onClick={handleSubmit}>
            Cadastrar
          </button>
          <button className="btn btn-design btn-silver">Nova Entrada</button>
        </div>
      </div>
    </PageLayout>
  );
}
