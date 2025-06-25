import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";
import { ModalAlert } from "../../components/ModalAlert";

export default function EditarEquipamento() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    descricao: "",
    peso: "",
    estMin: "",
    total: "",
    endereco: "",
  });
  const [modalAlert, setModalAlert] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showModal = (message, type = "success") => {
    setModalAlert({
      show: true,
      message,
      type
    });
  };

  const closeModal = () => {
    setModalAlert({
      show: false,
      message: "",
      type: "success"
    });
  };

  const handleSearch = async () => {
    try {
      const data = await api.get(`/equipamentos/${id}`);
      setForm({
        descricao: data.nome,
        peso: data.peso,
        estMin: data.estoqueMin,
        total: data.quantidade,
        endereco: data.endereco,
      });
    } catch {
      showModal("Equipamento não encontrado.", "danger");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    const equipamento = {
      nome: form.descricao,
      peso: parseFloat(form.peso),
      estoqueMin: parseInt(form.estMin),
      quantidade: parseInt(form.total),
      endereco: form.endereco,
      deposito: 2,
    };
    try {
      await api.put(`/equipamentos/${id}`, equipamento);
      showModal("Equipamento atualizado com sucesso!", "success");
    } catch {
      showModal("Erro ao atualizar equipamento.", "danger");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/equipamentos/${id}`);
      showModal("Equipamento deletado com sucesso!", "success");
      setId("");
      setForm({ descricao: "", peso: "", estMin: "", total: "", endereco: "" });
    } catch {
      showModal("Equipamento não pode ser deletado.", "danger");
    }
  };

  return (
    <PageLayout>
      <div className="container text-center py-5 w-50">
        <div className="card glass-div rounded p-3">
          <h3 className="mb-4">Editar Equipamento</h3>
          <div className="mb-3">
            <label htmlFor="idBusca">ID do Equipamento</label>
            <input
              type="text"
              id="idBusca"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button className="btn btn-design btn-blue mt-2" onClick={handleSearch}>
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
                <button className="btn btn-design btn-blue" onClick={handleSave}>
                  Salvar
                </button>
                <button className="btn btn-design btn-red-submit" onClick={handleDelete}>
                  Excluir
                </button>
              </div>
            </>
          )}
        </div>
        <ModalAlert
          show={modalAlert.show}
          message={modalAlert.message}
          type={modalAlert.type}
          onClose={closeModal}
        />
      </div>
    </PageLayout>
  );
}
