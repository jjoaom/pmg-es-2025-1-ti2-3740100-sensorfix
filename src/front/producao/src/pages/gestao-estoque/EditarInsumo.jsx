import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

export default function EditarInsumo() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    descricao: "",
    peso: "",
    estMin: "",
    total: "",
    endereco: "",
  });

  const handleSearch = async () => {
    try {
      const data = await api.get(`/insumo/${id}`);
      setForm({
        descricao: data.nome,
        peso: data.peso,
        estMin: data.estoqueMin,
        total: data.quantidade,
        endereco: data.endereco,
      });
    } catch (err) {
      alert("Insumo não encontrado.");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    const insumo = {
      nome: form.descricao,
      peso: parseFloat(form.peso),
      estoqueMin: parseInt(form.estMin),
      quantidade: parseInt(form.total),
      endereco: form.endereco,
      deposito: 2,
    };
    try {
      await api.put(`/insumo/${id}`, insumo);
      alert("Insumo atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar insumo.");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/insumo/${id}`);
      alert("Insumo deletado com sucesso!");
      setId("");
      setForm({ descricao: "", peso: "", estMin: "", total: "", endereco: "" });
    } catch (err) {
      alert("Insumo não pode ser deletado.");
    }
  };

  return (
    <PageLayout>
      <div className="container text-center py-5 w-50">
        <div className="card glass-div rounded p-3">
          <h3 className="mb-4">Editar Insumo</h3>
          <div className="mb-3">
            <label htmlFor="idBusca">ID do Insumo</label>
            <input
              type="text"
              id="idBusca"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleSearch}>
              Buscar
            </button>
          </div>
          {form.descricao && (
            <>
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
                    type="number"
                    id="peso"
                    className="form-control"
                    value={form.peso}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="estMin">Estoque Mínimo</label>
                  <input
                    type="number"
                    id="estMin"
                    className="form-control"
                    value={form.estMin}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="total">Quantidade em Estoque</label>
                  <input
                    type="number"
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
                <button className="btn btn-primary" onClick={handleSave}>
                  Salvar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Excluir
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
