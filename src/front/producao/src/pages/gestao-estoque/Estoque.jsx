import { useRef } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";

export default function Estoque() {
  const urlPedidos = "http://localhost:8080/pedidos";

  const handleNovoPedido = async () => {
    const agora = new Date();
    const pedido = {
      idfornecedor: 0,
      data: agora.toISOString().split("T")[0],
    };

    try {
      const resposta = await fetch(urlPedidos, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (resposta.ok) {
        const data = await resposta.json();
        const idNovoPedido = data.id;
        localStorage.setItem("idNovoPedido", idNovoPedido);
        window.location.href = "compras.html";
      } else {
        alert(`Erro ao criar pedido: ${resposta.status}`);
      }
    } catch (erro) {
      console.error("Erro na requisição POST:", erro);
      alert("Erro ao criar pedido. Veja o console para mais detalhes.");
    }
  };

  return (
    <PageLayout>
      <div className="container text-center py-5 w-50">
        <h1 className="display-5 text-blue">Depósito</h1>
        <div className="p-3 card h-100 glass-div rounded">
          <Link to="/entrada" className="mb-2">
            <button className="btn btn-design hover-blue shiny">Entrada de insumos</button>
          </Link>
          <div className="mb-2">
            <button
              className="btn btn-design hover-blue shiny"
              data-bs-toggle="modal"
              data-bs-target="#fastModal"
            >
              Fast In/Out
            </button>
          </div>
          <div className="mb-2">
            <button
              className="btn btn-design hover-blue shiny"
              data-bs-toggle="modal"
              data-bs-target="#editarModal"
            >
              Editar
            </button>
          </div>
          <div className="mb-2">
            <button
              className="btn btn-design hover-blue shiny"
              data-bs-toggle="modal"
              data-bs-target="#comprasModal"
            >
              Compras
            </button>
          </div>
          <Link to="/estoque/buscar" className="mb-2">
            <button className="btn btn-design hover-blue shiny">Pesquisar</button>
          </Link>
        </div>

        {/* Modal Editar */}
        <div
          className="modal fade"
          id="editarModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex flex-column gap-2">
                <Link to="/editInsumo">
                  <button className="btn btn-design shiny">Editar Insumo</button>
                </Link>
                <Link to="/editEquipamento">
                  <button className="btn btn-secondary">
                    Editar Equipamento
                  </button>
                </Link>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Fast In/Out (estrutura simples de exemplo) */}
        <div
          className="modal fade"
          id="fastModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Fast In/Out</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Conteúdo do Fast In/Out aqui...</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Compras */}
        <div
          className="modal fade"
          id="comprasModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Compras</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <button className="btn btn-design shiny" onClick={handleNovoPedido}>
                  Novo Pedido
                </button>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
