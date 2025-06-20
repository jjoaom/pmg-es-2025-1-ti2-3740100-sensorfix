// src/pages/Manutencao/RevisaoEquipamento.jsx
import React, { useState, useRef } from "react";
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

  // 1) Buscar equipamento pelo ID
  const fetchEquipamento = async () => {
    if (!idEquipamento) {
      alert("Informe o ID do equipamento");
      return;
    }
    try {
      const data = await api.get(`/equipamentos/${idEquipamento}`);
      setEquipamentoName(data.nome || "Nome não disponível");
    } catch (err) {
      console.error("Erro ao buscar equipamento:", err);
      setEquipamentoName("Equipamento não encontrado.");
    }
  };

  // 2) Adicionar/remover linhas de falhas
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

  // 3) Toggle dos checkboxes de “Trabalho a Ser Realizado”
  const handleCheckboxChange = (field) => {
    setTrabalhoRealizado((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 4) Envio final dos dados
  const handleSave = async () => {
    const jsonFinal = {
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
      await api.post("/api/demandas", jsonFinal);
      alert("Registro de manutenção salvo com sucesso!");
      // opcional: limpar formulário aqui
    } catch (err) {
      console.error("Erro ao salvar registro:", err);
      alert("Erro ao salvar o registro de manutenção.");
    }
  };

  return (
    <PageLayout>
      <div className="container">
        <h2>Revisão de Equipamento</h2>

        <div className="section">
          <div className="content">
            <div className="form-group">
              <label htmlFor="idEquipamento">ID do Equipamento:</label>
              <br />
              <input
                type="number"
                id="idEquipamento"
                value={idEquipamento}
                onChange={(e) => setIdEquipamento(e.target.value)}
                placeholder="Digite o ID aqui..."
              />
            </div>
            <button className="btn" onClick={fetchEquipamento}>
              Buscar Equipamento
            </button>
            <div style={{ marginTop: 10 }}>
              <strong>Nome do Equipamento:</strong>{" "}
              <span style={{ fontWeight: "bold", color: "#2c3e50" }}>
                {equipamentoName}
              </span>
            </div>
          </div>

          <label>Estado do Hardware:</label>
          <select
            id="estadoHardware"
            value={estadoHardware}
            onChange={(e) => setEstadoHardware(e.target.value)}
          >
            <option value="" disabled>
              Selecione...
            </option>
            <option>Sem danos físicos externos</option>
            <option>Com danos físicos externos</option>
          </select>

          <label>Observações:</label>
          <textarea
            id="observacoes"
            rows={3}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>

        <div className="section">
          <div className="section-title">Trabalho a Ser Realizado</div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={trabalhoRealizado.perdaTotal}
                onChange={() => handleCheckboxChange("perdaTotal")}
              />{" "}
              Perda Total
            </label>
            <label>
              <input
                type="checkbox"
                checked={trabalhoRealizado.revisao}
                onChange={() => handleCheckboxChange("revisao")}
              />{" "}
              Revisão
            </label>
            <label>
              <input
                type="checkbox"
                checked={trabalhoRealizado.refuncionalizacao}
                onChange={() => handleCheckboxChange("refuncionalizacao")}
              />{" "}
              Refuncionalização
            </label>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Registro de Falhas</div>
          <table id="falhas-table" className="table table-striped">
            <thead>
              <tr>
                <th>Sintoma</th>
                <th>Falha Encontrada</th>
                <th>Causa Provável</th>
                <th>Ação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="falhas-body">
              {falhas.map((f) => (
                <tr key={f.id}>
                  <td>
                    <select
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
                      value={f.falhaEncontrada}
                      onChange={(e) =>
                        handleFalhaChange(f.id, "falhaEncontrada", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      <option>Membrana Rompida</option>
                      <option>Solda</option>
                      <option>Fusivel Queimado</option>
                      <option>Fio desconectado</option>
                      <option>Falha No Alimentador</option>
                      <option>Equipamento Quebrado</option>
                      <option>Erro De Calibragem</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={f.causaProvavel}
                      onChange={(e) =>
                        handleFalhaChange(f.id, "causaProvavel", e.target.value)
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
                  <td className="acao-coluna">
                    <button
                      className="btn-remover"
                      onClick={() => handleRemoveFalha(f.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-add" onClick={handleAddFalha}>
            Adicionar
          </button>
        </div>

        <button className="btn" onClick={handleSave}>
          Guardar Dados
        </button>
      </div>
    </PageLayout>
  );
}
