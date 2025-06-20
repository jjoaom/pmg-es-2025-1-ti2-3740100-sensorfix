import { useState, useRef } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

export default function RevisaoEquipamento() {
  const [idEquipamento, setIdEquipamento] = useState("");
  const [equipamentoName, setEquipamentoName] = useState("");
  const [estadoHardware, setEstadoHardware] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [trabalhoRealizado, setTrabalhoRealizado] = useState({
    perdaTotal: false,
    revisao: false,
    refuncionalizacao: false,
  });
  const [falhas, setFalhas] = useState([]);
  const nextRowId = useRef(0);

  // 1) busca equipamento
  const fetchEquipamento = async () => {
    if (!idEquipamento) {
      alert("Informe o ID do equipamento");
      return;
    }
    try {
      const data = await api.get(`/equipamentos/${idEquipamento}`);
      setEquipamentoName(data.nome || "Nome não disponível");
    } catch {
      setEquipamentoName("Equipamento não encontrado.");
    }
  };

  // 2) adiciona/remova falhas
  const handleAddFalha = () => {
    const newId = ++nextRowId.current;
    setFalhas((prev) => [
      ...prev,
      { id: newId, sintoma: "", falhaEncontrada: "", causaProvavel: "", acao: "" },
    ]);
  };
  const handleRemoveFalha = (id) => {
    setFalhas((prev) => prev.filter((f) => f.id !== id));
  };
  const handleFalhaChange = (id, field, value) => {
    setFalhas((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  // 3) checkboxes
  const handleCheckboxChange = (field) => {
    setTrabalhoRealizado((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 4) salva tudo
  const handleSave = async () => {
    const payload = {
      idEquipamento,
      estadoHardware,
      observacoes,
      trabalhoRealizado,
      detalhesFalhas: falhas.map(({ sintoma, falhaEncontrada, causaProvavel, acao }) => ({
        sintoma,
        falhaEncontrada,
        causaProvavel,
        acao,
      })),
    };
    try {
      await api.post("/api/demandas", payload);
      alert("Registro de manutenção salvo com sucesso!");
      // aqui você pode limpar o formulário, se quiser
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar o registro de manutenção.");
    }
  };

return (
    <PageLayout>
        <div className="container py-4">
            <h1 className=" display-5 text-blue mb-2">
                Revisão de Equipamento
            </h1>

            <div className="row g-4">
                {/* ===== Coluna da esquerda ===== */}
                <div className="col-lg-4 col-md-6 mb-4 ">
                    <div className="card shadow-sm h-100 glass-div">
                        <div className="card-header bg-light border-bottom">
                            <h5 className="mb-0">Dados do Equipamento</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="idEquipamento" className="form-label">ID do Equipamento</label>
                                <input
                                    type="text"
                                    id="idEquipamento"
                                    className="form-control"
                                    placeholder="Digite o ID aqui..."
                                    value={idEquipamento}
                                    onChange={(e) => setIdEquipamento(e.target.value)}
                                />
                            </div>
                            <div className="d-grid mb-3">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={fetchEquipamento}
                                >
                                    Buscar Equipamento
                                </button>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Nome do Equipamento:</label>
                                <div className="text-secondary">{equipamentoName}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Estado do Hardware</label>
                                <select
                                    className="form-select"
                                    value={estadoHardware}
                                    onChange={(e) => setEstadoHardware(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Selecione...
                                    </option>
                                    <option>Sem danos físicos externos</option>
                                    <option>Com danos físicos externos</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Observações</label>
                                <textarea
                                    rows={3}
                                    className="form-control"
                                    value={observacoes}
                                    onChange={(e) => setObservacoes(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label mb-1">Trabalho a Ser Realizado</label>
                                {["perdaTotal", "revisao", "refuncionalizacao"].map((field) => (
                                    <div className="form-check" key={field}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={field}
                                            checked={trabalhoRealizado[field]}
                                            onChange={() => handleCheckboxChange(field)}
                                        />
                                        <label className="form-check-label" htmlFor={field}>
                                            {field === "perdaTotal"
                                                ? "Perda Total"
                                                : field === "revisao"
                                                ? "Revisão"
                                                : "Refuncionalização"}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Coluna da direita ===== */}
                <div className="col-lg-8 col-md-6 mb-4">
                    <div className="card h-100 glass-div">
                        <div className="card-header border-bottom ">
                            <h5 className="mb-0">Registro de Falhas</h5>
                        </div>
                        <div className="card-body ">
                            <div className="table-responsive mb-3">
                                <table className="table table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Sintoma</th>
                                            <th>Falha Encontrada</th>
                                            <th>Causa Provável</th>
                                            <th>Ação</th>
                                            <th style={{ width: 50 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {falhas.map((f) => (
                                            <tr key={f.id}>
                                                <td>
                                                    <select
                                                        className="form-select"
                                                        value={f.sintoma}
                                                        onChange={(e) =>
                                                            handleFalhaChange(f.id, "sintoma", e.target.value)
                                                        }
                                                    >
                                                        <option value="" disabled>
                                                            Selecione...
                                                        </option>
                                                        <option>Equipamento Não Liga</option>
                                                        <option>Equipamento Sem Sinal</option>
                                                        <option>LED constante</option>
                                                        <option>Sensor Não Carrega</option>
                                                        <option>Equipamento Descalibrado</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-select"
                                                        value={f.falhaEncontrada}
                                                        onChange={(e) =>
                                                            handleFalhaChange(
                                                                f.id,
                                                                "falhaEncontrada",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="" disabled>
                                                            Selecione...
                                                        </option>
                                                        <option>Membrana Rompida</option>
                                                        <option>Solda</option>
                                                        <option>Fusível Queimado</option>
                                                        <option>Fio desconectado</option>
                                                        <option>Falha No Alimentador</option>
                                                        <option>Equipamento Quebrado</option>
                                                        <option>Erro De Calibragem</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-select"
                                                        value={f.causaProvavel}
                                                        onChange={(e) =>
                                                            handleFalhaChange(
                                                                f.id,
                                                                "causaProvavel",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="" disabled>
                                                            Selecione...
                                                        </option>
                                                        <option>Mal Uso Do Equipamento</option>
                                                        <option>Falha De Fabricação</option>
                                                        <option>Armazenamento Inadequado</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-select"
                                                        value={f.acao}
                                                        onChange={(e) =>
                                                            handleFalhaChange(f.id, "acao", e.target.value)
                                                        }
                                                    >
                                                        <option value="" disabled>
                                                            Selecione...
                                                        </option>
                                                        <option>Encaminhar para Descarte</option>
                                                        <option>Encaminhar para Manutenção</option>
                                                        <option>Encaminhar para Aproveitamento de Componentes</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        title="Remover"
                                                        onClick={() => handleRemoveFalha(f.id)}
                                                    >
                                                        <span aria-hidden="true">🗑️</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-success"
                                    onClick={handleAddFalha}
                                >
                                    Adicionar Falha
                                </button>
                                <button className="btn btn-primary ms-auto" onClick={handleSave}>
                                    Guardar Dados
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
);
}
