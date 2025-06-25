import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { IoCloseSharp } from "react-icons/io5";

export default function Estoque() {
  return (
    <PageLayout>
      <div className="container text-center py-5 w-50">
        <h1 className="display-5 text-blue">Depósito</h1>
        <div className="p-3 card h-100 glass-div rounded">
          <Link to="/estoque/entrada" className="mb-2">
            <button className="btn btn-design hover-blue shiny">
              Entrada de insumos
            </button>
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
          <Link to="/estoque/compras" className="mb-2">
            <button className="btn btn-design hover-blue shiny">Compras</button>
          </Link>
          <Link to="/estoque/buscar" className="mb-2">
            <button className="btn btn-design hover-blue shiny">
              Pesquisar
            </button>
          </Link>
        </div>

        {/* Modal Editar */}
        <div
          className="modal fade"
          id="editarModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered w-25">
            <div className="modal-content ">
              <div className="modal-header text-center shadow">
                <h5 className="modal-title w-100 text-blue">Editar</h5>
                <IoCloseSharp
                  size={30}
                  className="btn-fechar"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body d-flex flex-column gap-2">
                <Link to="/estoque/editarInsumo">
                  <button
                    className="btn btn-silver mb-3"
                    data-bs-dismiss="modal"
                  >
                    Editar Insumo
                  </button>
                </Link>
                <Link to="/estoque/editarEquipamento">
                  <button
                    className="btn btn-silver mb-3"
                    data-bs-dismiss="modal"
                  >
                    Editar Equipamento
                  </button>
                </Link>
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
              <div className="modal-header text-center shadow ">
                <h5 className="modal-title w-100 text-blue">Fast In/Out</h5>
                <IoCloseSharp
                  size={30}
                  className="btn-fechar"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body d-flex flex-column gap-2">
                <Link to="/estoque/fastInsumo">
                  <button
                    className="btn btn-silver mb-3"
                    data-bs-dismiss="modal"
                  >
                    Fast Insumo
                  </button>
                </Link>
                <Link to="/estoque/fastEquipamento">
                  <button
                    className="btn btn-silver mb-3"
                    data-bs-dismiss="modal"
                  >
                    Fast Equipamento
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
