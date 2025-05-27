import { useRef } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";

export default function Estoque() {
  const dialogEditar = useRef(null);
  const dialogFast = useRef(null);
  const dialogCompras = useRef(null);
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
      <div className="container text-center py-5 ">
        <h1 className="display-5 text-blue">Depósito</h1>
        <div className="p-3 card h-100 glass-div rounded">
          <Link to="/entrada">
            <button className="btn btn-design">Entrada de insumos</button>
          </Link>

          <button className="btn btn-design" onClick={() => dialogFast.current?.showModal()}>
            Fast In/Out
          </button>

          <button className="btn btn-design" onClick={() => dialogEditar.current?.showModal()}>
            Editar
          </button>
          <dialog ref={dialogEditar}>
            <Link to="/editInsumo">
              <button className="btn btn-design">Editar Insumo</button>
            </Link>
            <Link to="/editEquipamento">
              <button>Editar Equipamento</button>
            </Link>
            <p>Press ESC para sair</p>
          </dialog>

          <dialog className="glass-div" ref={dialogFast}>
            <Link to="fastInsumo">
              <button className="btn btn-design">Saída Insumo</button>
            </Link>
            <Link to="fastEqui">
              <button className="btn btn-design">Saída Equipamento</button>
            </Link>
            <p>Press ESC para sair</p>
          </dialog>

          <button className="btn btn-design" onClick={() => dialogCompras.current?.showModal()}>
            Compras
          </button>

          <Link to="/pesquisa">
            <button className="btn btn-design">Pesquisar</button>
          </Link>
        </div>

        <dialog ref={dialogCompras}>
          <button className="btn btn-design" onClick={handleNovoPedido}>Novo Pedido</button>
        </dialog>
      </div>
    </PageLayout>
  );
}
