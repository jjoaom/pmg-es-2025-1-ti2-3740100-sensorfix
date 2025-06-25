import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";
import { ModalAlert } from "../../components/ModalAlert";

export default function FastEquip() {
  const [id, setId] = useState("");
  const [equip, setEquip] = useState(null);
  const [quant, setQuant] = useState("");
  const [operation, setOperation] = useState("saida");
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

  const handleBuscar = async () => {
    try {
      const data = await api.get(`/equipamentos/${id}`);
      setEquip(data);
    } catch {
      showModal("Equipamento não encontrado.", "danger");
    }
  };

  const handleUpdate = async () => {
    if (!equip) return;
    const current = parseInt(equip.quantidade, 10);
    const change = parseInt(quant, 10);
    let newQty = current;
    if (operation === "entrada") {
      newQty = current + change;
    } else if (operation === "saida") {
      if (change > current) {
        showModal("Quantidade de saída superior ao estoque.", "danger");
        return;
      }
      newQty = current - change;
    }
    try {
      await api.put(`/equipamentos/${equip.id}`, {
        ...equip,
        quantidade: newQty,
      });
      showModal("Estoque atualizado com sucesso!", "success");
      setEquip(null);
      setId("");
      setQuant("");
    } catch {
      showModal("Erro ao atualizar estoque.", "danger");
    }
  };

  return (
    <PageLayout>
      <div className="container text-center py-5 w-50">
        <div className="card glass-div rounded p-3">
          <h3 className="mb-4">Fast In/Out – Equipamento</h3>
          <div className="mb-3">
            <label htmlFor="idBusca">ID do Equipamento</label>
            <input
              type="text"
              id="idBusca"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button className="btn btn-design btn-blue mt-2" onClick={handleBuscar}>
              Buscar
            </button>
          </div>
          {equip && (
            <>
              <p>Nome: {equip.nome}</p>
              <p>Estoque atual: {equip.quantidade}</p>
              <div className="mb-3">
                <label htmlFor="quant">Quantidade</label>
                <input
                  type="number"
                  id="quant"
                  className="form-control"
                  value={quant}
                  onChange={(e) => setQuant(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>
                  <input
                    type="radio"
                    name="operation"
                    value="entrada"
                    checked={operation === "entrada"}
                    onChange={() => setOperation("entrada")}
                  />
                  Entrada
                </label>
                <label className="ms-3">
                  <input
                    type="radio"
                    name="operation"
                    value="saida"
                    checked={operation === "saida"}
                    onChange={() => setOperation("saida")}
                  />
                  Saída
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-design btn-green-submit"
                  onClick={handleUpdate}
                >
                  Atualizar Estoque
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
