import React from "react";
import PageLayout from "../../components/PageLayout";
import { Link } from "react-router-dom";

export default function CadastroEquipamento() {
  return (
    <PageLayout>
      <div className="container text-center py-3 w-50">
        <h1 className="display-5 text-blue">Cadastro de Equipamento</h1>
        <div className="p-3 card h-100 glass-div rounded">
          <div className="text-center mb-4">
            <h5>Descrição</h5>
            <input
              type="text"
              className="form-control mx-auto rounded-pill"
              id="descricaoID"
              aria-describedby="descrição"
              style={{ maxWidth: "300px" }}
            />
          </div>

          <div className="row row-cols-2">
            <div className="col">
              <label for="formPeso" className="form-label">
                Peso(g)
              </label>
              <input
                type="text"
                className="form-control mx-auto rounded-pill"
                id="formPeso"
                aria-describedby="Formulario Peso"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="col">
              <label for="estoqueMinimo" className="form-label">
                Estoque mínimo
              </label>
              <input
                type="text"
                className="form-control mx-auto rounded-pill"
                id="estoqueMinimo"
                aria-describedby="Estoque Mínimo"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="col">
              <label for="formEndereco" className="form-label">
                Endereço
              </label>
              <input
                type="text"
                className="form-control mx-auto rounded-pill"
                id="formEndereco"
                aria-describedby="Endereço"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="col">
              <label for="qtdEmEstoque" className="form-label">
                Quantidade em estoque
              </label>
              <input
                type="text"
                className="form-control mx-auto rounded-pill"
                id="qtdEmEstoque"
                aria-describedby="Quantidade em Estoque"
                style={{ maxWidth: "300px" }}
              />
            </div>
          </div>

          <div className="container mt-4">
            <button className="btn btn-design btn-silver shiny">Cadastrar</button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
