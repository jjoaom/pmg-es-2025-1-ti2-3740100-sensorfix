import React from "react";
import PageLayout from "../../components/PageLayout";
import { Link } from "react-router-dom";

export default function Buscar() {
  return (
    <PageLayout>
      <div className="container text-center py-3 w-25 ">
        <h1 className="display-5 text-blue">Buscar</h1>
        <div className="p-3 card h-100 glass-div rounded">
  <div className="text-center mb-4">
    <h5>Digite o id</h5>
    <div className="d-flex justify-content-center align-items-center gap-2">
      <input
        type="text"
        className="form-control rounded-pill"
        id="buscarId"
        aria-describedby="buscarId"
        style={{ maxWidth: '200px' }}
      />
      <button className="btn btn-design btn-orange-submit">
        Buscar
      </button>
    </div>
  </div>

  <div className="text-center mb-4">
    <h5>Descrição</h5>
    <input
      type="text"
      className="form-control mx-auto rounded-pill"
      id="descricaoID"
      aria-describedby="descrição"
      style={{ maxWidth: '300px' }}
    />
  </div>

  <div className="d-flex justify-content-center gap-2 px-3">
    <button className="btn btn-design btn-green-submit" >
      Editar Insumo
    </button>
    <button className="btn btn-design btn-green-submit" >
      Editar Equipamento
    </button>
    <button className="btn btn-design btn-red-submit" >
      Excluir
    </button>
  </div>
</div>

      </div>
    </PageLayout>
  );
}
