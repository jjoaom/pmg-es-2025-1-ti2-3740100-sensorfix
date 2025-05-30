import React, { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { GoPlus } from "react-icons/go";
import { FaSave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import Select from "react-select";



const ItemDemanda = ({ demanda, onClick }) => {
  return (
    <div className="card mb-2 glass-div rounded shiny" onClick={() => onClick(demanda)} style={{ cursor: "pointer" }}>
      <div className="card-body text-start">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" role="switch" id={`switch-${demanda.id}`} />
          <h5 className="card-title">
            ID: <span>{demanda.id}</span>
          </h5>
        </div>
        <p className="card-subtitle fs-6 mb-1 text-body-secondary">
          Descrição: <span className="fw-bold fs-6">{demanda.descricaoItem}</span>
        </p>
        <p>Status: {demanda.statusDemanda}</p>
      </div>
    </div>
  );
};


const DemandaAberta = ({ demanda, onClose }) => {
  const [pecas, setPecas] = useState([]);
  const [pecaSelecionada, setPecaSelecionada] = useState(null);

  useEffect(() => {
        fetch('http://localhost:8080/api/pecas') 
            .then(response => response.json())
            .then(data => setPecas(data))
            .catch(error => console.error('Erro ao buscar itens:', error));
    }, []);

  if (!demanda) return <p className="text-muted">Nenhuma demanda selecionada.</p>;

  return (
    <div className="container-fluid">
      <div className="row align-items-center mb-2">
        <div className="col-10">
          <h4 className="fs-4 text-start mb-1">
            Demanda - Nº <span>{demanda.id}</span>
          </h4>
        </div>
        <div className="col-2 text-end">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12 text-start">
          <p className="fs-6 mb-1">
            Gerado em:{" "}
            <span>
              {demanda.dataHoraCriacao[3]}:{demanda.dataHoraCriacao[4]} -{" "}
              {demanda.dataHoraCriacao[2]}/{demanda.dataHoraCriacao[1]}/
              {demanda.dataHoraCriacao[0]}
            </span>
          </p>
        </div>
      </div>
      <div className="row g-2 mb-2">
        <div className="col-12 col-md-8 d-flex align-items-center border border-primary-subtle rounded-3 mb-2 mb-md-0 py-2 px-3">
          <label
            className="form-check-label fs-6 me-3"
            htmlFor="switchLimpezaCheck"
          >
            Limpeza realizada?
          </label>
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchLimpezaCheck"
            />
          </div>
        </div>
        <div className="col-12 col-md-4 text-md-end">
          <div className="dropdown w-100 w-md-auto" onClick={e => e.stopPropagation()}>
            <button
              id="addPecaDefeituosa"
              className="btn border shadow-sm border-primary-subtle dropdown-toggle rounded text-blue w-100"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <GoPlus /> Adicionar Peça Defeituosa
            </button>
            <ul className="dropdown-menu glass-div rounded border border-primary-subtle w-100 p-2">
              <li className="mb-2">
                <Select
                  id="idPeca"
                  options={pecas.map((peca) => ({
                    value: peca.nome,
                    label: peca.nome,
                  }))}
                  value={pecaSelecionada}
                  onChange={(selectedOption) =>
                    setPecaSelecionada(selectedOption)
                  }
                  placeholder="Selecionar Peça"
                  isSearchable
                  noOptionsMessage={() => "Não encontrado"}
                />
              </li>
              <li className="mb-2">
                <textarea
                  className="form-control btn-design"
                  placeholder="Observações"
                  id="observacoesDropdown"
                  style={{ resize: "none" }}
                  rows="2"
                ></textarea>
              </li>
              <li className="mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="substituiPeca"
                  />
                  <label className="form-check-label" htmlFor="substituiPeca">
                    Substituir Peça Original
                  </label>
                </div>
              </li>
              <li>
                <button className="btn btn-design hover-blue lh-sm shiny w-100">
                  Adicionar Peça defeituosa
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12 text-start">
          <span className="fw-semibold">Descrição do problema: </span>
          <span id="descricaoProblema">{demanda.descricaoItem}</span>
        </div>
      </div>
      <hr className="my-3 border-top border-secondary" />
      <div className="row mb-2">
        <div className="col-12 text-start">
          <h5 className="fw-bold mb-3">
            Peças defeituosas: {demanda.qtdPecasDefeituosas}
          </h5>
        </div>
      </div>
      <hr className="my-3 border-top border-secondary" />
      <div className="row mb-2 align-items-center">
        <div className="col-12 col-md-6 d-flex align-items-center mb-2 mb-md-0">
          <label
            className="form-check-label fs-6 me-2"
            htmlFor="switchTesteRealizado"
          >
            Teste realizado?
          </label>
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchTesteRealizado"
            />
          </div>
        </div>
      </div>
      <div className="row mb-2 align-items-center">
        <div className="col-12 col-md-6 d-flex align-items-center mb-2 mb-md-0">
          <label
            className="form-check-label fs-6 me-2"
            htmlFor="encaminharPara"
          >
            Encaminhar para:
          </label>
          <div className="form-check form-check-inline me-2">
            <input
              className="form-check-input"
              type="radio"
              name="encaminharPara"
              id="estoque"
              value="entrada"
            />
            <label className="form-check-label" htmlFor="estoque">
              Estoque
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="encaminharPara"
              id="reciclagem"
              value="reciclagem"
            />
            <label className="form-check-label" htmlFor="reciclagem">
              Reciclagem
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-4 mx-auto">
          <button className="w-100 btn btn-green-submit text-white fw-bold">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

const AddPecasDefeituosas = () => {
  const [pecas, setPecas] = useState([]);
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pecas")
      .then((response) => response.json())
      .then((data) => setPecas(data))
      .catch((error) => console.error("Erro ao buscar itens:", error));
  }, []);

  const handleAddSelect = () => {
    setSelects([...selects, ""]);
  };

  const handleChange = (index, value) => {
    const novosSelects = [...selects];
    novosSelects[index] = value;
    setSelects(novosSelects);
  };

  return (
    <div className="container-fluid mb-3">
      <p className="fs-5 text-start">Selecione suas opções:</p>
      {selects.map((valor, index) => (
        <div key={index} className="row align-items-center mb-2">
          <div className="col-12 col-sm-11 mb-2 mb-sm-0">
            <Select
              id="selectPeca"
              options={pecas.map((peca) => ({ value: peca.nome, label: peca.nome }))}
              className="w-100"
              placeholder="Selecionar Peça Defeituosa"
              isSearchable
              noOptionsMessage={() => "Peça não encontrada"}
              value={valor ? { value: valor, label: valor } : null}
              onChange={(selectedOption) =>
                handleChange(index, selectedOption ? selectedOption.value : "")
              }
            />
          </div>
          <div className="col-12 col-sm-1 text-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                const novosSelects = selects.filter((_, i) => i !== index);
                setSelects(novosSelects);
              }}
            >
              <HiMiniXMark />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn color-blue btn-design mt-2"
        onClick={handleAddSelect}
      >
        <GoPlus /> Adicionar opção
      </button>
    </div>
  );
};

const FormCriarDemanda = () => {
   const [insumos, setInsumos] = useState([]);
  const [insumoSelecionado, setInsumoSelecionado] = useState(null);

  useEffect(() => {
        fetch('http://localhost:8080/insumo') 
            .then(response => response.json())
            .then(data => setInsumos(data))
            .catch(error => console.error('Erro ao buscar itens:', error));
    }, []);

  return (
    <div className="container-fluid px-0">
      <div className="row mb-3">
        <div className="col-12">
          <Select
            id="idInsumo"
            options={insumos.map((insumo) => ({
              value: insumo.nome,
              label: insumo.nome,
            }))}
            value={insumoSelecionado}
            onChange={(selectedOption) =>
              setInsumoSelecionado(selectedOption)
            }
            placeholder="Selecionar Insumo"
            isSearchable
            noOptionsMessage={() => "Não encontrado"}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <textarea
            className="form-control"
            id="problemDescription"
            style={{ resize: "none" }}
            rows="3"
            placeholder="Descrição do problema"
          ></textarea>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <AddPecasDefeituosas />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <textarea
            className="form-control"
            id="observacoes"
            style={{ resize: "none" }}
            rows="2"
            placeholder="Observações:"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default function Producao() {
  const [demandas, setDemandas] = useState([]);
  const [demandaSelecionada, setDemandaSelecionada] = useState(null);
  
  const [showCriarDemanda, setShowCriarDemanda] = useState(false);

  useEffect(() => {
        fetch('http://localhost:8080/api/demandas') 
            .then(response => response.json())
            .then(data => setDemandas(data))
            .catch(error => console.error('Erro ao buscar itens:', error));
    }, []);

  return (
    <PageLayout>
      <div className="container-fluid py-3">
        <h3 className="display-5 text-start text-blue mb-4">Produção</h3>
        <div className="row g-4 flex-lg-nowrap">
          {/* Coluna da esquerda */}
          <div className="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-6 text-start">
                    <p className="fs-4 mb-0">Demandas</p>
                  </div>
                  <div className="col-6 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-primary-subtle btn-sm" title="Filtrar">
                      <FaFilter />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setShowCriarDemanda(true)}
                    >
                      <GoPlus size={20} />
                    </button>
                  </div>
                  <hr className="my-2 border-top border-primary" />
                </div>
              </div>
              <div className="card-body p-2 overflow-auto" style={{ maxHeight: "60vh" }}>
                <div className="d-flex flex-column gap-2">
                  {demandas.map((d) => (
                    <ItemDemanda
                      key={d.id}
                      demanda={d}
                      onClick={setDemandaSelecionada}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Coluna da direita */}
          <div className="col-lg-8 col-md-6 col-12 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="card-body p-3">
                {showCriarDemanda ? (
                  <div className="p-0 p-md-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <h1 className="fs-4 text-start mb-0">Criar nova Demanda</h1>
                      <button
                        type="button"
                        className="btn btn-close"
                        onClick={() => setShowCriarDemanda(false)}
                      ></button>
                    </div>
                    <div className="mt-3">
                      <FormCriarDemanda />
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button type="button" className="btn color-blue">
                        <FaSave /> <small>Salvar</small>
                      </button>
                    </div>
                  </div>
                ) : (
                  <DemandaAberta
                    demanda={demandaSelecionada}
                    onClose={() => setDemandaSelecionada(null)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
