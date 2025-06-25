import { useState, useEffect, useRef } from "react";
import PageLayout from "../../components/PageLayout";
import html2pdf from "html2pdf.js";
import { api } from "../../utils/api";
import { ModalAlert } from "../../components/ModalAlert";

export default function Compras() {
  const [sugestoes, setSugestoes] = useState([]);
  const [novoPedidoId, setNovoPedidoId] = useState(null);
  const [idBusca, setIdBusca] = useState("");
  const [insumoPesq, setInsumoPesq] = useState(null);
  const [quant, setQuant] = useState("");
  const [vetor, setVetor] = useState([]);
  const [erro, setErro] = useState("");
  const pdfRef = useRef();
  const [modalAlert, setModalAlert] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showModal = (message, type = "success") => {
    setModalAlert({
      show: true,
      message,
      type
    });
  };

  const closeModal = () => {
    setModalAlert({
      show: false,
      message: "",
      type: "success"
    });
  };

  useEffect(() => {
    async function loadData() {
      try {
        const sugestoesFromAPI = await api.get("/insumo/sugestoes-compra");
        console.log("Sugestões recebidas:", sugestoesFromAPI);
        setSugestoes(Array.isArray(sugestoesFromAPI) ? sugestoesFromAPI : []);
      } catch (err) {
        console.error("Erro ao buscar sugestões", err);
        setSugestoes([]);
      }
    }
    loadData();
  }, []);

  const handleNovoPedido = async () => {
    try {
      const pedido = {
        idfornecedor: 0,
        data: new Date().toISOString().split("T")[0],
      };
      const response = await api.post("/pedidos", pedido);
      console.log("Resposta da API ao criar pedido:", response);

      const pedidoSalvo = response.data;

      if (!pedidoSalvo.id) {
        throw new Error("ID do pedido criado não retornado pela API.");
      }

      setNovoPedidoId(pedidoSalvo.id);
      localStorage.setItem("idNovoPedido", pedidoSalvo.id);
      showModal(`Novo pedido criado (#${pedidoSalvo.id})!`, "success");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      showModal("Erro ao criar pedido.", "danger");
    }
  };

  const buscarInsumo = async () => {
    if (!idBusca.trim()) return setErro("Digite um ID válido");

    try {
      const insumo = await api.get(`/insumo/${idBusca}`);
      setInsumoPesq(insumo);
      setErro("");
    } catch {
      setErro("Insumo não encontrado.");
    }
  };

  const adicionarInsumo = async () => {
    const quantidade = parseInt(quant);
    if (!insumoPesq || isNaN(quantidade) || quantidade <= 0)
      return setErro("Quantidade inválida");

    try {
      const body = {
        quantidade,
        insumo: { id: insumoPesq.id },
        pedidoCompra: { id: parseInt(novoPedidoId) },
      };
      console.log("Enviando para /pedido-insumos:", body);

      const res = await api.post("/pedido-insumos", body);
      const novoItem = {
        ...insumoPesq,
        quantidade,
        idRelacao: res.data.id,
      };

      const atualizados = [...vetor, novoItem];
      setVetor(atualizados);
      localStorage.setItem("vetorInsumos", JSON.stringify(atualizados));
      setInsumoPesq(null);
      setQuant("");
      setIdBusca("");
      setErro("");
    } catch {
      setErro("Erro ao adicionar item.");
    }
  };

  const excluirItem = async (idRelacao) => {
    try {
      await api.delete(`/pedido-insumos/${idRelacao}`);
      const atualizados = vetor.filter((i) => i.idRelacao !== idRelacao);
      setVetor(atualizados);
      localStorage.setItem("vetorInsumos", JSON.stringify(atualizados));
    } catch {
      showModal("Erro ao excluir item", "danger");
    }
  };

  const gerarPDF = () => {
    // Cria o container principal do PDF com classes Bootstrap
    const conteudo = document.createElement("div");
    conteudo.className = "container p-4";
    conteudo.style.fontFamily = "Arial, sans-serif";
    conteudo.style.background = "#fff";

    // Cabeçalho com logo e título
    conteudo.innerHTML = `
      <div class="d-flex align-items-center border-bottom pb-3 mb-4">
        <img src="${
          import.meta.env.VITE_PUBLIC_URL
            ? import.meta.env.VITE_PUBLIC_URL + "/logo1.png"
            : "/logo1.png"
        }" alt="Logo" style="height: 60px; margin-right: 20px;">
        <div>
          <h2 class="mb-0">Pedido de Compra</h2>
          <small class="text-muted">#${novoPedidoId || "N/A"}</small>
        </div>
      </div>
      <h4 class="mb-3">Itens do Pedido</h4>
    `;

    // Cria a tabela com classes Bootstrap
    const tabela = document.createElement("table");
    tabela.className = "table table-bordered table-striped";
    tabela.style.marginTop = "10px";
    tabela.innerHTML = `
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Peso (kg)</th>
          <th>Quantidade</th>
        </tr>
      </thead>
    `;

    // Corpo da tabela
    const corpo = document.createElement("tbody");
    vetor.forEach((item) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${item.id || item.insumo?.id || ""}</td>
        <td>${item.nome || item.insumo?.nome || ""}</td>
        <td>${(item.peso || item.insumo?.peso || 0).toFixed(2)}</td>
        <td>${item.quantidade}</td>
      `;
      corpo.appendChild(linha);
    });
    tabela.appendChild(corpo);

    // Adiciona a tabela ao conteúdo
    conteudo.appendChild(tabela);

    // Rodapé estilizado
    const rodape = document.createElement("div");
    rodape.className = "border-top pt-3 mt-4 text-center text-secondary";
    rodape.innerHTML = `
      <p class="mb-1">Solicito ao setor financeiro que aprove e envie para faturamento.</p>
      <small>Documento gerado em: ${new Date().toLocaleString()}</small>
    `;
    conteudo.appendChild(rodape);

    // Gera o nome do PDF dinamicamente
    const nomePDF = `pedido_compra_${novoPedidoId || "N/A"}.pdf`;

    // Gera o PDF
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: nomePDF,
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(conteudo)
      .save()
      .then(() => {
        localStorage.removeItem("vetorInsumos");
        window.location.href = "/estoque";
      });
  };

  return (
    <PageLayout>
      <div className="container text-center py-5 w-100">
        <div className="card glass-div rounded p-3">
          <h3 className="mb-4">Compras – Sugestões</h3>
          <div className="d-flex justify-content-center my-3">
            <button
              className="btn btn-design btn-blue mb-3"
              onClick={handleNovoPedido}
              disabled={!!novoPedidoId}
            >
              {novoPedidoId
                ? `Pedido Criado (#${novoPedidoId})`
                : "Novo Pedido"}
            </button>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Estoque</th>
                <th>Quant. Mín.</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(sugestoes) && sugestoes.length > 0 ? (
                sugestoes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.estoqueMin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>Nenhuma sugestão disponível</td>
                </tr>
              )}
            </tbody>
          </table>
          <hr />
          <h4>Adicionar Insumo</h4>
          <div className="row g-2 d-flex justify-content-center my-3">
            <div className="col-md-3">
              <input
                className="form-control"
                value={idBusca}
                onChange={(e) => setIdBusca(e.target.value)}
                placeholder="ID do insumo"
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-silver w-100" onClick={buscarInsumo}>
                Buscar
              </button>
            </div>
            {insumoPesq && (
              <>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    value={insumoPesq.nome}
                    readOnly
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    value={quant}
                    onChange={(e) => setQuant(e.target.value)}
                    placeholder="Quantidade"
                    type="number"
                  />
                </div>
                <div className="col-md-1">
                  <button
                    className="btn btn-design btn-green-submit w-100"
                    onClick={adicionarInsumo}
                  >
                    Agregar
                  </button>
                </div>
              </>
            )}
          </div>
          {erro && <div className="text-danger mt-2">{erro}</div>}

          <hr />
          <h4>Itens do Pedido</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Peso</th>
                <th>Quantidade</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {vetor.map((i) => (
                <tr key={i.idRelacao}>
                  <td>{i.id || i.insumo?.id}</td>
                  <td>{i.nome}</td>
                  <td>{(i.peso || i.insumo?.peso)?.toFixed(2)} kg</td>
                  <td>{i.quantidade}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => excluirItem(i.idRelacao)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Geração de PDF */}
          <div className="d-flex justify-content-center my-3">
            <button
              className="btn btn-design btn-orange-submit"
              onClick={gerarPDF}
            >
              Concluir e Gerar PDF
            </button>
          </div>

          {/* Conteúdo oculto para PDF */}
          <div ref={pdfRef} style={{ display: "none" }}>
            <h1 style={{ textAlign: "center" }}>Pedido de Compra</h1>
            <table
              style={{ width: "100%", borderCollapse: "collapse" }}
              border="1"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Peso</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {vetor.map((i) => (
                  <tr key={i.idRelacao}>
                    <td>{i.id}</td>
                    <td>{i.nome}</td>
                    <td>{i.peso}</td>
                    <td>{i.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Gerado em: {new Date().toLocaleString()}</p>
          </div>
        </div>
        <ModalAlert
          show={modalAlert.show}
          message={modalAlert.message}
          type={modalAlert.type}
          onClose={closeModal}
        />
      </div>
    </PageLayout>
  );
}
