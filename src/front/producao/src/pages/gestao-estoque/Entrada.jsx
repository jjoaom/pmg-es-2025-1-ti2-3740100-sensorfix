import { useState, useRef, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

// ModalAlert Component
function ModalAlert({ show, message, type, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex="-1" >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`glass-div modal-content border-${type === "danger" ? "danger" : "success"}`}>
          <div className="modal-header">
            <h5 className="modal-title text-center w-100">{type === "danger" ? "Erro" : "Sucesso"} : {message}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Entrada() {
  const [id, setId] = useState("");
  const [insumo, setInsumo] = useState(null);
  const [entrada, setEntrada] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleBuscar = async () => {
    try {
      const data = await api.get(`/insumo/${id}`);
      setInsumo(data);
      setAlert({ message: "", type: "" });
    } catch {
      setAlert({ message: "Insumo não encontrado.", type: "danger" });
    }
  };

  const handleEntrada = async () => {
    if (!insumo) return;
    const novaQtd = parseInt(insumo.quantidade, 10) + parseInt(entrada, 10);
    try {
      await api.put(`/insumo/${insumo.id}`, { ...insumo, quantidade: novaQtd });
      setAlert({ message: "Entrada realizada com sucesso.", type: "success" });
      setInsumo(null);
      setId("");
      setEntrada("");
    } catch {
      setAlert({ message: "Erro ao atualizar insumo.", type: "danger" });
    }
  };

  const handleCloseAlert = () => setAlert({ message: "", type: "" });

  return (
    <PageLayout>
      <ModalAlert
        show={!!alert.message}
        message={alert.message}
        type={alert.type}
        onClose={handleCloseAlert}
      />
      <div className="container text-center py-5 w-50">
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
      </div>
    </PageLayout>
  );
}
