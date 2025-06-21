import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PageLayout from "../../components/PageLayout";

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

return (
    <PageLayout>
        <div className="container-fluid py-0 position-relative">
            <h3 className="display-5 text-start text-blue mb-4">Movimentações</h3>
            <div className="row g-4 flex-lg-nowrap">
                {/* Sidebar na esquerda */}
                <aside className="col-lg-2 col-md-3 d-none d-md-block">
                    <div
                        className="card glass-div rounded p-3 d-flex align-items-stretch"
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
                                ].map((label) => (
                                    <li className="mb-2" key={label}>
                                        <button
                                            className="btn btn-design btn-light hover-blue w-100"
                                            style={{ minWidth: 100, minHeight: 40 }}
                                        >
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>
                {/* Conteúdo principal na direita */}
                <main className="col-lg-9 col-md-8 d-flex flex-column">
                    {/* Filtros acima da tabela */}
                    <section className="mb-4">
                        <div className="card glass-div rounded p-3">
                            <h5 className="mb-3">Filtros</h5>
                            <form>
                                <div className="row g-3 align-items-end">
                                    <div className="col-md-3">
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
                                    <div className="col-md-3">
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
                                    <div className="col-md-3">
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
                                    <div className="col-md-2">
                                        <button
                                            type="button"
                                            className="btn btn-design btn-primary w-100"
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
                            <table className="table table-striped">
                                <thead>
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
                                                    ? `${item.dataMovimentacao[2]
                                                            .toString()
                                                            .padStart(2, "0")}/${item.dataMovimentacao[1]
                                                            .toString()
                                                            .padStart(2, "0")}/${
                                                            item.dataMovimentacao[0]
                                                        } ${item.dataMovimentacao[3]
                                                            .toString()
                                                            .padStart(2, "0")}:${item.dataMovimentacao[4]
                                                            .toString()
                                                            .padStart(2, "0")}`
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
                    </section>
                </main>
            </div>
        </div>
    </PageLayout>
);
}
