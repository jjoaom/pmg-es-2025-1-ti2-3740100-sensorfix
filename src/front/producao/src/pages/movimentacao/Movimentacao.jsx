import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PageLayout from "../../components/PageLayout";
import dayjs from "dayjs";

export default function Movimentacao() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    async function fetchMovimentacoes() {
      try {
        const data = await api.get("/movimentacoes");
        setMovimentacoes(data);
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    }
    fetchMovimentacoes();
  }, []);

  const movimentacoesFiltradas = movimentacoes.filter((item) => {
    const correspondeData = !filterDate || item.data === filterDate;
    const correspondeTipo = !filterType || item.tipo === filterType;
    return correspondeData && correspondeTipo;
  });

  // Função para filtrar pelo tipo ao clicar na sidebar
  function handleSidebarFilter(tipo) {
    setFilterType(tipo.toLowerCase());
  }

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
                          className={`btn btn-design btn-light hover-blue w-100${isActive ? " active btn-silver" : ""}`}
                          style={{ minWidth: 100, minHeight: 40 }}
                          onClick={() =>
                            setFilterType(isActive ? "" : value)
                          }
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
                        className="btn btn-design btn-primary w-100 mt-2 mt-md-0"
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
      </div>
    </PageLayout>
  );
}
