import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";
import { ModalAlert } from "../../components/ModalAlert";


function ModalCadastro({ show, onClose, onCadastrar }) {
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [estoqueMin, setEstoqueMin] = useState("");
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [deposito, setDeposito] = useState("");
  const [loading, setLoading] = useState(false);
  const [localAlert, setLocalAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    if (show) {
      setNome("");
      setPeso("");
      setEstoqueMin("");
      setEndereco("");
      setQuantidade("");
      setDeposito("");
      setLocalAlert({ message: "", type: "" });
    }
  }, [show]);

  const handleSubmit = async () => {
    setLoading(true);
    const novoInsumo = {
      nome,
      peso: parseFloat(peso),
      estoqueMin: parseInt(estoqueMin, 10),
      endereco,
      quantidade: parseInt(quantidade, 10),
      deposito: parseInt(deposito, 10)
    };
    try {
      const response = await onCadastrar(novoInsumo);
      setLocalAlert({
        message: response && response.id
          ? `Insumo de id ${response.id} cadastrado com sucesso.`
          : "Insumo cadastrado com sucesso.",
        type: "success"
      });
    } catch {
      setLocalAlert({ message: "Erro ao cadastrar insumo.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseLocalAlert = () => setLocalAlert({ message: "", type: "" });

  if (!show) return null;

  return (
    <>
      <ModalAlert
        show={!!localAlert.message}
        message={localAlert.message}
        type={localAlert.type}
        onClose={handleCloseLocalAlert}
      />
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
                type="number"
                step="0.01"
              />
              <input
                className="form-control mb-2"
                placeholder="Estoque Mínimo"
                value={estoqueMin}
                onChange={(e) => setEstoqueMin(e.target.value)}
                type="number"
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
                type="number"
              />
              <input
                className="form-control mb-2"
                placeholder="Deposito"
                value={deposito}
                onChange={(e) => setDeposito(e.target.value)}
                type="number"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-design btn-silver" onClick={onClose} disabled={loading}>
                Cancelar
              </button>
              <button className="btn btn-design btn-blue" onClick={handleSubmit} disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
            <div className="d-flex justify-content-center mt-2">
              <button className="btn btn-design btn-blue" onClick={handleBuscar}>
                Buscar
              </button>
              <button
                className="btn btn-silver ms-2"
                onClick={() => setShowCadastro(true)}
              >
                Criar insumo
              </button>
            </div>
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
              <div className="d-flex justify-content-center">
                <button className="btn btn design btn-green-submit" onClick={handleEntrada}>
                  Dar Entrada
                </button>
              </div>
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
