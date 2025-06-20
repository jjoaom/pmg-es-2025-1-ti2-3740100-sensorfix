import React, { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { api } from "../../utils/api";

export default function Deposito() {
  const [depositos, setDepositos] = useState([]);

  useEffect(() => {
    async function loadDepositos() {
      try {
        const data = await api.get("/estoque-depositos");
        setDepositos(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadDepositos();
  }, []);

  return (
    <PageLayout>
      <div className="card glass-div rounded p-3">
        <h3 className="mb-4">Depósito</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Tipo de Depósito</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {depositos.map((dep) => (
              <tr key={dep.id}>
                <td>{dep.tipoDeposito}</td>
                <td>{dep.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
