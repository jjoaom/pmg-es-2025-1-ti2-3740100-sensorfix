import { useState } from "react";
import PageLayout from "../../components/PageLayout";

export default function RevisaoEquipamento() {
  const [idEquipamento, setIdEquipamento] = useState("");
  const [falhas, setFalhas] = useState([]);

  const adicionarLinha = () => {
    setFalhas([
      ...falhas,
      {
        sintoma: "",
        falha: "",
        causa: "",
        acao: "",
      },
    ]);
  };

  const removerLinha = (index) => {
    setFalhas(falhas.filter((_, i) => i !== index));
  };

  return (
    <PageLayout>
      <div className="container-fluid py-0 position-relative">
        <h3 className="display-5 text-start text-blue mb-4">Revisão de Equipamento</h3>

        <div className="row g-4 flex-lg-nowrap">
          {/* Coluna da esquerda */}
          <div className="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="container-fluid">
                <div className="row align-items-center border-bottom shadow-sm">
                  <div className="col-6 text-start">
                    <p className="fs-4 mb-1">Dados do Equipamento</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="form-group">
                  <label htmlFor="idEquipamento">ID do Equipamento:</label>
                  <input
                    type="text"
                    id="idEquipamento"
                    className="form-control"
                    placeholder="Digite o ID aqui..."
                    value={idEquipamento}
                    onChange={(e) => setIdEquipamento(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary w-100 mt-2">Buscar Equipamento</button>
              </div>
            </div>
          </div>

          {/* Coluna da direita */}
          <div className="col-lg-8 col-md-6 col-12 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="card-body p-3 position-relative">
                <div className="section">
                  <div className="section-title">Registro de Falhas</div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Sintoma</th>
                        <th>Falha Encontrada</th>
                        <th>Causa Provável</th>
                        <th>Ação</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {falhas.map((falha, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              className="form-select"
                              value={falha.sintoma}
                              onChange={(e) => {
                                const newFalhas = [...falhas];
                                newFalhas[index].sintoma = e.target.value;
                                setFalhas(newFalhas);
                              }}
                            >
                              <option value="" disabled>
                                Selecione
                              </option>
                              <option>Não Liga</option>
                              <option>Sem Sinal</option>
                              <option>Leds Piscando</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={falha.falha}
                              onChange={(e) => {
                                const newFalhas = [...falhas];
                                newFalhas[index].falha = e.target.value;
                                setFalhas(newFalhas);
                              }}
                            >
                              <option value="" disabled>
                                Selecione
                              </option>
                              <option>Membrana</option>
                              <option>Solda</option>
                              <option>Fusível Queimado</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={falha.causa}
                              onChange={(e) => {
                                const newFalhas = [...falhas];
                                newFalhas[index].causa = e.target.value;
                                setFalhas(newFalhas);
                              }}
                            >
                              <option value="" disabled>
                                Selecione
                              </option>
                              <option>Outras</option>
                              <option>Cabo</option>
                              <option>Fio Desconectado</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={falha.acao}
                              onChange={(e) => {
                                const newFalhas = [...falhas];
                                newFalhas[index].acao = e.target.value;
                                setFalhas(newFalhas);
                              }}
                            >
                              <option value="" disabled>
                                Selecione
                              </option>
                              <option>Encaminhar para Descarte</option>
                              <option>Encaminhar para Manutenção</option>
                              <option>Encaminhar para Aproveitamento de Componentes</option>
                            </select>
                          </td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => removerLinha(index)}>
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="btn btn-success mt-2" onClick={adicionarLinha}>
                    Adicionar
                  </button>
                </div>
                <button className="btn btn-primary mt-3">Guardar Dados</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
