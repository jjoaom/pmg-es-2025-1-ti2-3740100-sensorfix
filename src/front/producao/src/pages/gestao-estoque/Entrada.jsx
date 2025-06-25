import { useState, useRef, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

function ModalCadastro({ show, onClose, onCadastrar, id }) {
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [estoqueMin, setEstoqueMin] = useState("");
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = () => {
    const novoInsumo = {
      nome,
      peso: parseFloat(peso),
      estoqueMin: parseInt(estoqueMin, 10),
      endereco,
      quantidade: parseInt(quantidade, 10),
    };
    onCadastrar(novoInsumo);
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="glass-div modal-content border-primary">
          <div className="modal-header">
            <h5 className="modal-title w-100 text-center">
              Cadastrar Novo Insumo
            </h5>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Descrição"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Peso"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Estoque Mínimo"
              value={estoqueMin}
              onChange={(e) => setEstoqueMin(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Quantidade Inicial"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div
          className={`glass-div modal-content border-${
            type === "danger" ? "danger" : "success"
          }`}
        >
          <div className="modal-header">
            <h5 className="modal-title text-center w-100">
              {type === "danger" ? "Erro" : "Sucesso"} : {message}
            </h5>
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
      setShowCadastro(false);
    } catch {
      setAlert({ message: "Insumo não encontrado.", type: "danger" });
      setShowCadastro(true); // abre o modal de cadastro
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

  const [showCadastro, setShowCadastro] = useState(false);

  const handleCadastrarInsumo = async (novoInsumo) => {
    try {
      const response = await api.post("/insumo", novoInsumo);
      setInsumo(response);
      setAlert({ message: "Insumo cadastrado com sucesso.", type: "success" });
      setShowCadastro(false);
    } catch {
      setAlert({ message: "Erro ao cadastrar insumo.", type: "danger" });
    }
  };

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
        <ModalCadastro
          show={showCadastro}
          onClose={() => setShowCadastro(false)}
          onCadastrar={handleCadastrarInsumo}
        />
      </div>
    </PageLayout>
  );
}
