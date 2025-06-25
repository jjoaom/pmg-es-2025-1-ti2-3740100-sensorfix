import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PageLayout from "../../components/PageLayout";
import dayjs from "dayjs";

export default function Movimentacao() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [equipId, setEquipId] = useState("");
  const [equipamento, setEquipamento] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const urlEquipamento = "/equipamentos/";
  const urlMovimentacao = "/movimentacoes/";
  const urlEstoqueDeposito = "/estoque-depositos";

  async function fetchDataFromApi(url, label = "") {
    try {
      return await api.get(url);
    } catch (error) {
      console.error(`Erro ao buscar ${label}:`, error);
      return [];
    }
  }

  async function getQuantidadeDeposito(id) {
    try {
      const response = await api.get(`${urlEstoqueDeposito}/${id}`);
      return response.data.quantidade ?? 0;
    } catch (error) {
      console.error("Erro ao buscar estoque depósito:", error);
      return 0;
    }
  }

  async function atualizarQuantidadeDeposito(idDeposito, novaQuantidade) {
    try {
      await api.patch(`${urlEstoqueDeposito}/${idDeposito}/quantidade`, {
        quantidade: novaQuantidade,
      });
    } catch (error) {
      console.error("Erro ao atualizar depósito:", error);
    }
  }

  async function criarMovimentacao() {
    const novaMov = {
      origem: parseInt(origem),
      destino: parseInt(destino),
      dataMovimentacao: new Date().toISOString(),
      quantidade: parseInt(quantidade),
      equipamento: { id: parseInt(equipId) },
    };

    try {
      const response = await api.post(urlMovimentacao, novaMov);

      if (response.status === 201 || response.status === 200) {
        alert("Movimentação criada com sucesso!");
        return true;
      } else {
        console.error("Erro ao criar movimentação:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  }

  useEffect(() => {
    async function fetchAll() {
      setMovimentacoes(await fetchDataFromApi(urlMovimentacao, "demandas"));
      setEquipamentos(await fetchDataFromApi(urlEquipamento, "equipamentos"));
    }
    fetchAll();
  }, []);

  const movimentacoesFiltradas = movimentacoes.filter((item) => {
    const correspondeData =
      !filterDate ||
      (item.dataMovimentacao &&
        dayjs(item.dataMovimentacao).format("YYYY-MM-DD") === filterDate);
    const correspondeTipo =
      !filterType || item.origem === filterType || item.destino === filterType;
    return correspondeData && correspondeTipo;
  });

  // Atualiza o equipamento selecionado ao trocar o select
  useEffect(() => {
    if (equipId) {
      const eq = equipamentos.find((e) => String(e.id) === String(equipId));
      setEquipamento(eq || null);
    } else {
      setEquipamento(null);
    }
  }, [equipId, equipamentos]);

  return (
    <PageLayout>
      <div className="container-fluid py-0 position-relative">
        <h3 className="display-5 text-start text-blue mb-4">Movimentações</h3>
        <div className="row g-4 flex-lg-nowrap">
          {/* Sidebar na esquerda */}
          <aside className="col-lg-2 col-md-3 mb-4 mb-md-0">
            <div
              className="card glass-div rounded p-3 d-flex align-items-stretch h-100"
              style={{ minWidth: 180 }}
            >
              <nav>
                <ul className="list-unstyled">
                  {[
                    "Ativação",
                    "Ativo",
                    "Danificado",
                    "Estoque",
                    "Manutenção",
                  ].map((label) => {
                    const value = label.toLowerCase();
                    const isActive = filterType === value;
                    return (
                      <li className="mb-2" key={label}>
                        <button
                          className={`btn btn-design btn-light shiny hover-blue w-100${
                            isActive ? " active btn-silver" : ""
                          }`}
                          style={{ minWidth: 100, minHeight: 40 }}
                          onClick={() => setFilterType(isActive ? "" : value)}
                        >
                          {label || "Todos"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
          {/* Conteúdo principal na direita */}
          <main className="col-lg-10 col-md-9">
            {/* Filtros acima da tabela */}
            <section className="mb-4">
              <div className="card glass-div rounded p-3">
                <h5 className="mb-3">Filtros</h5>
                <form>
                  <div className="row g-3 align-items-end">
                    <div className="col-12 col-sm-6 col-md-3">
                      <label className="form-label" htmlFor="filtro-item">
                        Item
                      </label>
                      <input
                        id="filtro-item"
                        type="text"
                        className="form-control"
                        placeholder="Digite aqui..."
                        // Adicione value/onChange se quiser filtrar por item futuramente
                      />
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                      <label className="form-label" htmlFor="filtro-deposito">
                        Depósito
                      </label>
                      <select
                        id="filtro-deposito"
                        className="form-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="">Todos</option>
                        <option value="ativacao">Ativação</option>
                        <option value="ativo">Ativo</option>
                        <option value="danificado">Danificado</option>
                        <option value="estoque">Estoque</option>
                        <option value="manutencao">Manutenção</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                      <label className="form-label" htmlFor="filtro-periodo">
                        Período
                      </label>
                      <input
                        id="filtro-periodo"
                        type="date"
                        className="form-control"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                      <button
                        type="button"
                        className="btn btn-design btn-blue w-100 mt-2 mt-md-0"
                        onClick={() => setShowModal(true)}
                      >
                        Nova movimentação
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <section>
              <div className="card glass-div rounded p-3">
                <h5 className="mb-3">Lista de Movimentações</h5>
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Equipamento</th>
                        <th>Peso (kg)</th>
                        <th>Estoque Min</th>
                        <th>Qtd. Equipamento</th>
                        <th>Armazenado em</th>
                        <th>Qtd. Movimentada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movimentacoesFiltradas.map((item, index) => (
                        <tr key={item.id || index}>
                          <td>{item.id}</td>
                          <td>
                            {item.dataMovimentacao
                              ? dayjs(item.dataMovimentacao).format(
                                  "DD/MM/YYYY HH:mm"
                                )
                              : ""}
                          </td>
                          <td>{item.origem}</td>
                          <td>{item.destino}</td>
                          <td>{item.equipamento?.nome || ""}</td>
                          <td>{item.equipamento?.peso ?? ""}</td>
                          <td>{item.equipamento?.estoqueMin ?? ""}</td>
                          <td>{item.equipamento?.quantidade ?? ""}</td>
                          <td>{item.equipamento?.endereco ?? ""}</td>
                          <td>{item.quantidade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
        {showModal && (
          <div
            className="modal d-flex justify-content-center align-items-center"
            style={{
              display: "flex",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1050,
            }}
          >
            <div
              className="modal-content p-0 bg-white rounded shadow"
              style={{
                width: "100%",
                maxWidth: 480,
                border: "none",
                position: "relative",
                animation: "fadeIn .2s",
              }}
            >
              <div
                className="modal-header border-0 pb-0"
                style={{ padding: "1.5rem 2rem 0.5rem 2rem" }}
              >
                <h4 className="modal-title mb-0">Nova Movimentação</h4>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-close"
                  aria-label="Fechar"
                  style={{ marginLeft: "auto" }}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ padding: "1rem 2rem 2rem 2rem" }}
              >
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const quantidadeOrigem = await getQuantidadeDeposito(
                      origem
                    );
                    if (parseInt(quantidade) > quantidadeOrigem) {
                      alert(
                        `Estoque insuficiente! Disponível: ${quantidadeOrigem}`
                      );
                      return;
                    }
                    const sucesso = await criarMovimentacao();
                    if (sucesso) {
                      const destinoQtd = await getQuantidadeDeposito(destino);
                      await atualizarQuantidadeDeposito(
                        origem,
                        quantidadeOrigem - quantidade
                      );
                      await atualizarQuantidadeDeposito(
                        destino,
                        destinoQtd + parseInt(quantidade)
                      );
                      setShowModal(false);
                      window.location.reload();
                    }
                  }}
                >
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Equipamento
                      </label>
                      <select
                        className="form-select"
                        value={equipId}
                        onChange={(e) => setEquipId(e.target.value)}
                        required
                      >
                        <option value="">Selecione o equipamento</option>
                        {equipamentos.map((eq) => (
                          <option key={eq.id} value={eq.id}>
                            {eq.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Depósito de Origem
                      </label>
                      <select
                        className="form-select"
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="1">Ativação</option>
                        <option value="2">Ativo</option>
                        <option value="3">Danificado</option>
                        <option value="4">Estoque</option>
                        <option value="5">Manutenção</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Depósito de Destino
                      </label>
                      <select
                        className="form-select"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="1">Ativação</option>
                        <option value="2">Ativo</option>
                        <option value="3">Danificado</option>
                        <option value="4">Estoque</option>
                        <option value="5">Manutenção</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold">
                        Quantidade
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                        min={1}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-design btn-silver"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-design btn-green-submit px-4"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
