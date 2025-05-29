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
    <div className="container-fluid ">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="display-6 text-start mb-1">
          Demanda - Nº <span>{demanda.id}</span>
        </h4>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <p className= "fs-5 text-start">
        Gerado em: 
<span> {demanda.dataHoraCriacao[3]}</span>:<span>{demanda.dataHoraCriacao[4]}</span> -  
<span> {demanda.dataHoraCriacao[2]}</span>/<span>{demanda.dataHoraCriacao[1]}</span>/<span>{demanda.dataHoraCriacao[0]}</span>

      </p>
      <div className="mb-1 text-center row justify-content-center p-1">
        <div className="col-8 d-flex align-items-center border border-primary-subtle rounded-3 rounded-end-0">
          <label
            className="form-check-label fs-5 me-3"
            htmlFor="switchLimpezaCheck"
          >
            Limpeza realizada?
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchLimpezaCheck"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              id="addPecaDefeituosa"
              className="btn border shadow-sm border-primary-subtle dropdown-toggle rounded text-blue"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <GoPlus /> Adicionar Peça Defeituosa
            </button>
            <ul className="dropdown-menu glass-div rounded border border-primary-subtle">
              <li className="p-2">
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
                  placeholder="Valor"
                  isSearchable
                  noOptionsMessage={() => "Não encontrado"}
                />
              </li>
              <li className="p-2">
                <textarea
                  className="form-control btn-design"
                  placeholder="Observações"
                  id="observacoesDropdown"
                  style={{ resize: "none" }}
                  rows="2"
                ></textarea>
              </li>
              <li className="p-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="substituiPeca"
                  ></input>
                  <label className="form-check-label" htmlFor="substituiPeca">
                    Substituir Peça Original
                  </label>
                </div>
              </li>
              <li className="p-2">
                <button className="btn btn-design hover-blue lh-sm shiny">
                  Adicionar Peça defeituosa
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-1 text-center row justify-content-center p-1">
        <div className="text-start">
          Descrição do problema:{" "}
          <span id="descricaoProblema">
            {demanda.descricaoItem}
          </span>
        </div>
        <hr className="my-4 border-top border-secondary" />
        <div className="text-start">
          <h5 className="fw-bold mb-5">Peças defeituosas: {demanda.qtdPecasDefeituosas}</h5>
        </div>
        <hr className="my-4 border-top border-secondary" />
        <div className="d-flex align-items-start">
          <label
            className="form-check-label fs-5 me-2 "
            htmlFor="switchTesteRealizado"
          >
            Teste realizado?
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchTesteRealizado"
            />
          </div>
        </div>
        <div className="d-flex align-items-start">
          <label
            className="form-check-label fs-5 me-2 "
            htmlFor="encaminharPara"
          >
            Encaminhar para:
          </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="encaminharPara"
              id="estoque"
              value="entrada"
            />
            <label className="form-check-label" htmlFor="encaminharPara">
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
        <button className="w-25 mt-2 mb-1 p-1 btn btn-green-submit text-white fw-bold">
          Enviar
        </button>
      </div>
    </div>
  );
};

const AddPecasDefeituosas = () => {
  const [selects, setSelects] = useState([""]); // começa com 1 select vazio

  const opcoes = ["Peça 1", "Peça 2", "Peça 3"];

  const handleAddSelect = () => {
    setSelects([...selects, ""]); // adiciona mais um select vazio
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
        <div key={`${valor}-${index}`} className="row align-items-center mb-2">
          <div className="col-11">
            <Select
              id="selectPeca"
              options={opcoes.map((op) => ({ value: op, label: op }))}
              className="w-100"
              placeholder="Selecionar Peça Defeituosa"
              isSearchable
              noOptionsMessage={() => "Peça não encontrada"}
              value={valor}
              onChange={(selectedOption) =>
                handleChange(index, selectedOption ? selectedOption.value : "")
              }
            />
          </div>
          <div className="col-1 text-end">
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
        className="btn color-blue mt-2"
        onClick={handleAddSelect}
      >
        <GoPlus /> Adicionar opção
      </button>
    </div>
  );
};

const FormCriarDemanda = () => {
  const options = [
    { value: "pc-X", label: "Computador X" },
    { value: "tablet-y", label: "Tablet Y" },
    { value: "tv-z", label: "TV Z" },
  ];

  return (
    <div>
      <div className="mb-3 ">
        <Select
          id="selectInsumo"
          options={options}
          className="w-100"
          placeholder="Selecionar Insumo"
          isSearchable
          noOptionsMessage={() => "Nada encontrado 😕"}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="problemDescription"
          style={{ resize: "none" }}
          rows="3"
          placeholder="Descrição do problema"
        ></textarea>
      </div>
      <AddPecasDefeituosas />
      <div className="mb-3">
        <textarea
          className="form-control"
          id="problemDescription"
          style={{ resize: "none" }}
          rows="2"
          placeholder="Observações:"
        ></textarea>
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
      <div className="container-fluid">
        <h3 className="display-5 text-start text-blue">Produção</h3>

        <div className="row g-4">
          {/* Coluna da esquerda */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="p-3 card h-100 glass-div rounded">
              <div className="container-fluid ">
                <div className="row align-items-center">
                  <div className="col-6 text-start">
                    <p className="fs-4 mb-0">Demandas</p>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <button type="button" className="btn btn-primary-subtle btn-sm" title="Filtrar">
                      <FaFilter/>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm ms-2"
                      onClick={() => setShowCriarDemanda(true)}
                    >
                      <GoPlus size={20} />
                    </button>
                  </div>
                  <hr className="my-1 border-top border-primary" />
                </div>
              </div>

              <div className="card-body ">
                {/* items de demandas inseridos aqui */}
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

          {/* Coluna da direita */}
          <div className="col-lg-8 col-md-6 col-12">
            <div className="p-3 card h-100 glass-div rounded-start-2">
              <div className="card-body">
                {showCriarDemanda ? (
                  <div className="p-3" >
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="fs-4 text-start">Criar nova Demanda</h1>
                      <button
                        type="button"
                        className="btn btn-close"
                        onClick={() => setShowCriarDemanda(false)}
                      ></button>
                    </div>
                    <div className="text-start m-1">
                      <p>
                        Criado por: <small id="createdBy">João Marcos</small> -{" "}
                        <small id="createdTime">00:00</small> -{" "}
                        <small id="createdDate">01/01/2025</small>
                      </p>
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
                  <DemandaAberta demanda={demandaSelecionada} onClose={() => setDemandaSelecionada(null)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
