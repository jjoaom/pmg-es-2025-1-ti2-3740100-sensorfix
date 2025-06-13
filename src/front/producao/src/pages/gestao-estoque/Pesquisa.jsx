import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

export default function Pesquisa() {
  const [modoAtual, setModoAtual] = useState("insumos");
  const [dataInsumos, setDataInsumos] = useState([]);
  const [dataEquipamentos, setDataEquipamentos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (modoAtual === "insumos" && dataInsumos.length === 0) {
      getInsumos();
    } else if (modoAtual === "equipamentos" && dataEquipamentos.length === 0) {
      getEquipamentos();
    }
    // eslint-disable-next-line
  }, [modoAtual]);

  async function getInsumos() {
    try {
      const resposta = await api.get("/insumo");
      setDataInsumos(resposta);
    } catch (erro) {
      console.error("Erro ao buscar insumos:", erro);
    }
  }

  async function getEquipamentos() {
    try {
      const resposta = await api.get("/equipamentos");
      setDataEquipamentos(resposta);
    } catch (erro) {
      console.error("Erro ao buscar equipamentos:", erro);
    }
  }

  function renderTabela() {
    const dados = modoAtual === "insumos" ? dataInsumos : dataEquipamentos;
    const dadosFiltrados = dados.filter((item) =>
      item.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    return dadosFiltrados.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.nome}</td>
        <td>{item.quantidade}</td>
        <td>{item.estoqueMin}</td>
        <td>{item.endereco}</td>
      </tr>
    ));
  }

  return (
    <PageLayout>
      <div className="container-fluid py-0 position-relative">
        <h3 className="display-5 text-start text-blue mb-4">Buscar Insumos e Equipamentos</h3>

        <div className="row g-4 flex-lg-nowrap">
        
          <div className="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="card-body p-3">
                <div className="form-group">
                  <label htmlFor="descricao">Digite a descrição:</label>
                  <input
                    type="text"
                    id="descricao"
                    className="form-control"
                    placeholder="Digite aqui..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-3 mt-3">
                  <button
                    className={`btn ${modoAtual === "insumos" ? "btn-success" : "btn-outline-success"} w-50`}
                    onClick={() => setModoAtual("insumos")}
                  >
                    Insumos
                  </button>
                  <button
                    className={`btn ${modoAtual === "equipamentos" ? "btn-success" : "btn-outline-success"} w-50`}
                    onClick={() => setModoAtual("equipamentos")}
                  >
                    Equipamentos
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div className="col-lg-8 col-md-6 col-12 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="card-body p-3">
                <div className="section-title">{modoAtual === "insumos" ? "Lista de Insumos" : "Lista de Equipamentos"}</div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Estoque</th>
                      <th>Estoque Mínimo</th>
                      <th>Endereço</th>
                    </tr>
                  </thead>
                  <tbody>{renderTabela()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
