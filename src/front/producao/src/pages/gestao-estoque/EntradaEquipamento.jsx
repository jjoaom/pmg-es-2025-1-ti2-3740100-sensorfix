import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";
import { ModalAlert } from "../../components/ModalAlert";

// Modal para cadastro de equipamento
function ModalCadastro({ show, onClose, onCadastrar }) {
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [estoqueMin, setEstoqueMin] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [deposito, setDeposito] = useState("");
  const [loading, setLoading] = useState(false);
  const [localAlert, setLocalAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    if (show) {
      setNome("");
      setPeso("");
      setEstoqueMin("");
      setQuantidade("");
      setEndereco("");
      setDeposito("");
      setLocalAlert({ message: "", type: "" });
    }
  }, [show]);

  const handleSubmit = async () => {
    setLoading(true);
    const novoEquipamento = {
      nome,
      peso: parseFloat(peso),
      estoqueMin: parseInt(estoqueMin, 10),
      quantidade: parseInt(quantidade, 10),
      endereco,
      deposito: parseInt(deposito, 10),
    };
    try {
      const response = await onCadastrar(novoEquipamento);
      setLocalAlert({
        message:
          response && response.id
            ? `Equipamento de id ${response.id} cadastrado com sucesso.`
            : "Equipamento cadastrado com sucesso.",
        type: "success",
      });
    } catch {
      setLocalAlert({ message: "Erro ao cadastrar equipamento.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="glass-div modal-content border-primary">
          <div className="modal-header">
            <h5 className="modal-title w-100 text-center">
              Cadastrar Novo Equipamento
            </h5>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Peso (kg)"
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
              placeholder="Quantidade Inicial"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
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
              placeholder="Depósito"
              value={deposito}
              onChange={(e) => setDeposito(e.target.value)}
              type="number"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-design btn-silver" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-design btn-blue" onClick={handleSubmit}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EntradaEquipamento() {
  const [id, setId] = useState("");
  const [equipamento, setEquipamento] = useState(null);
  const [entrada, setEntrada] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [showCadastro, setShowCadastro] = useState(false);

  const handleBuscar = async () => {
    try {
      const data = await api.get(`/equipamentos/${id}`);
      setEquipamento(data);
      setAlert({ message: "", type: "" });
      setShowCadastro(false);
    } catch {
      setAlert({ message: "Equipamento não encontrado.", type: "danger" });
    }
  };

  const handleEntrada = async () => {
    if (!equipamento) return;
    const novaQtd =
      parseInt(equipamento.quantidade, 10) + parseInt(entrada, 10);
    try {
      await api.put(`/equipamentos/${equipamento.id}`, {
        ...equipamento,
        quantidade: novaQtd,
      });
      setAlert({ message: "Entrada realizada com sucesso.", type: "success" });
      setEquipamento(null);
      setId("");
      setEntrada("");
    } catch {
      setAlert({ message: "Erro ao atualizar equipamento.", type: "danger" });
    }
  };

  const handleCloseAlert = () => setAlert({ message: "", type: "" });

  const handleCadastrarEquipamento = async (novoEquipamento) => {
    try {
      const response = await api.post("/equipamentos", novoEquipamento);
      setEquipamento(response);
      setAlert({
        message: "Equipamento cadastrado com sucesso.",
        type: "success",
      });
      setShowCadastro(false);
    } catch {
      setAlert({ message: "Erro ao cadastrar equipamento.", type: "danger" });
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
          <h3 className="mb-4">Entrada de Equipamento</h3>
          <div className="mb-3">
            <label htmlFor="idBusca">ID do Equipamento</label>
            <input
              type="text"
              id="idBusca"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <div className="d-flex justify-content-center mt-2">
              <button
                className="btn btn-design btn-blue"
                onClick={handleBuscar}
              >
                Buscar
              </button>
              <button
                className="btn btn-silver ms-2"
                onClick={() => setShowCadastro(true)}
              >
                Criar equipamento
              </button>
            </div>
          </div>
          {equipamento && (
            <>
              <p>Nome: {equipamento.nome}</p>
              <p>Peso: {equipamento.peso} kg</p>
              <p>Estoque Mínimo: {equipamento.estoqueMin}</p>
              <p>Quantidade atual: {equipamento.quantidade}</p>
              <p>Endereço: {equipamento.endereco}</p>
              <p>Depósito: {equipamento.deposito}</p>
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
                <button
                  className="btn btn design btn-green-submit"
                  onClick={handleEntrada}
                >
                  Dar Entrada
                </button>
              </div>
            </>
          )}
        </div>
        <ModalCadastro
          show={showCadastro}
          onClose={() => setShowCadastro(false)}
          onCadastrar={handleCadastrarEquipamento}
        />
      </div>
    </PageLayout>
  );
}
