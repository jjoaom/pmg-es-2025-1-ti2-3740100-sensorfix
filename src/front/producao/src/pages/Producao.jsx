import React, { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { GoPlus } from "react-icons/go";
import { FaSave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import Select from "react-select";

//URL Padrão do arquivo .env
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Helper: fetch with error handling
const fetchJson = (url, opts = {}) =>
  fetch(url, opts).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });

// ItemDemanda: shows demanda summary in list
const ItemDemanda = ({ demanda, onClick, selected }) => (
  <div
    className={`card glass-div rounded shiny ${selected ? "border-primary border-2" : ""}`}
    onClick={() => onClick(demanda.id)}
    style={{ cursor: "pointer" }}
  >
    <div className="card-body text-start">
      <h5 className="card-title mb-1">
        ID: <span>{demanda.id}</span>
      </h5>
      <p className="card-subtitle text-body-secondary mb-1">
        Descrição: <span className="fw-bold">{demanda.descricaoItem}</span>
      </p>
      <p className="mb-0">Status: {demanda.statusDemanda}</p>
    </div>
  </div>
);

// Modal component (simple)
function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-div">
          <div className="modal-header">
            <h5 className="modal-title">{title || "Confirmação"}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button className="btn btn-primary" onClick={onConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// DemandaAberta: main detail view for a demanda
function DemandaAberta({
  demanda,
  onClose,
  onDemandaUpdated,
}) {
  const [pecas, setPecas] = useState([]);
  const [pecaSelecionada, setPecaSelecionada] = useState(null);
  const [qtdSelecionada, setQtdSelecionada] = useState(1);
  const [pecasDefeituosasLocal, setPecasDefeituosasLocal] = useState([]);
  const [showConfirmLimpeza, setShowConfirmLimpeza] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ show: false, type: null });

  // Load peças and historico when demanda changes
  useEffect(() => {
    if (!demanda) return;
    setLoading(true);
    fetchJson(`${baseUrl}/api/pecas`)
      .then(setPecas)
      .catch(() => setPecas([]));
    fetchJson(`${baseUrl}/api/demandas/${demanda.id}/historico`)
      .then(setHistorico)
      .catch(() => setHistorico([]));
    setPecasDefeituosasLocal(demanda.pecasDefeituosas || []);
    setLoading(false);
  }, [demanda]);

  if (!demanda) return <p className="text-muted">Nenhuma demanda selecionada.</p>;

  // Add peça defeituosa to local state
  const handleAddPecaDefeituosa = () => {
    if (!pecaSelecionada || !qtdSelecionada) return;
    setPecasDefeituosasLocal((prev) => [
      ...prev,
      { peca: { id: pecaSelecionada.value }, quantidade: Number(qtdSelecionada) },
    ]);
    setPecaSelecionada(null);
    setQtdSelecionada(1);
  };

  // Remove peça defeituosa
  const handleRemovePecaDefeituosa = (idx) => {
    setPecasDefeituosasLocal((prev) => prev.filter((_, i) => i !== idx));
  };

  // Limpeza toggle logic
  const handleLimpezaToggle = () => {
    if (!demanda.limpezaRealizada) setShowConfirmLimpeza(true);
  };

  // Confirm Limpeza
  const confirmLimpeza = () => {
    setLoading(true);
    const payload = {
      ...demanda,
      dataLimpeza: new Date().toISOString(),
      statusDemanda: "EM_RECUPERACAO",
      limpezaRealizada: true,
      pecasDefeituosas: pecasDefeituosasLocal,
    };
    fetch(`${baseUrl}/api/demandas/${demanda.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao atualizar demanda");
        return r.json();
      })
      .then((updated) => {
        setShowConfirmLimpeza(false);
        onDemandaUpdated(updated);
      })
      .catch((e) => alert("Erro: " + e.message))
      .finally(() => setLoading(false));
  };

  // Confirm modal for other events (testes, finalização, etc)
  const handleConfirmEvent = (type) => {
    setConfirmModal({ show: true, type });
  };

  const handleEventConfirmed = () => {
    setLoading(true);
    let payload = { ...demanda };
    const now = new Date().toISOString();
    if (confirmModal.type === "inicioTestes") {
      payload = { ...payload, dataInicioTestes: now, statusDemanda: "EM_TESTES" };
    } else if (confirmModal.type === "fimTestes") {
      payload = { ...payload, dataFimTestes: now, statusDemanda: "AGUARDANDO_FINALIZACAO" };
    } else if (confirmModal.type === "finalizar") {
      payload = { ...payload, dataConclusao: now, statusDemanda: "FINALIZADA" };
    } else if (confirmModal.type === "descartar") {
      payload = { ...payload, dataEncerramento: now, statusDemanda: "DESCARTADA" };
    }
    fetch(`${baseUrl}/api/demandas/${demanda.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao atualizar demanda");
        return r.json();
      })
      .then((updated) => {
        setConfirmModal({ show: false, type: null });
        onDemandaUpdated(updated);
      })
      .catch((e) => alert("Erro: " + e.message))
      .finally(() => setLoading(false));
  };

  // Render
  return (
    <div className="container-fluid">
      <ConfirmModal
        show={showConfirmLimpeza}
        title="Confirmar Limpeza"
        message="Você tem certeza que deseja confirmar a limpeza? Após isso não será possível reverter."
        onConfirm={confirmLimpeza}
        onCancel={() => setShowConfirmLimpeza(false)}
      />
      <ConfirmModal
        show={confirmModal.show}
        title="Confirmação"
        message={
          confirmModal.type === "inicioTestes"
            ? "Iniciar testes nesta demanda?"
            : confirmModal.type === "fimTestes"
            ? "Finalizar testes nesta demanda?"
            : confirmModal.type === "finalizar"
            ? "Finalizar esta demanda? Esta ação é irreversível."
            : confirmModal.type === "descartar"
            ? "Descartar esta demanda? Esta ação é irreversível."
            : ""
        }
        onConfirm={handleEventConfirmed}
        onCancel={() => setConfirmModal({ show: false, type: null })}
      />
      <div className="row align-items-center mb-2">
        <div className="col-10">
          <h4 className="fs-4 text-start mb-1">
            Demanda - Nº <span>{demanda.id}</span>
          </h4>
        </div>
        <div className="col-2 text-end">
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12 text-start">
          <p className="fs-6 mb-1">
            Gerado em:{" "}
            <span>
              {demanda.dataHoraCriacao?.[3]}:{demanda.dataHoraCriacao?.[4]} -{" "}
              {demanda.dataHoraCriacao?.[2]}/{demanda.dataHoraCriacao?.[1]}/
              {demanda.dataHoraCriacao?.[0]}
            </span>
          </p>
        </div>
      </div>
      {/* Limpeza realizada */}
      <div className="row g-2 mb-2">
        <div className="col-12 col-md-8 d-flex align-items-center border border-primary-subtle rounded-3 mb-2 mb-md-0 px-3">
          <label className="form-check-label fs-6 me-3" htmlFor="switchLimpezaCheck">
            Limpeza realizada?
          </label>
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchLimpezaCheck"
              checked={!!demanda.limpezaRealizada}
              disabled={!!demanda.limpezaRealizada}
              onChange={handleLimpezaToggle}
            />
          </div>
        </div>
        {/* Adicionar peça defeituosa */}
        <div className="col-12 col-md-4 text-md-end">
          <div className="d-flex gap-2 align-items-center">
            <Select
              id="idPeca"
              options={pecas.map((peca) => ({
                value: peca.id,
                label: peca.nome,
              }))}
              value={pecaSelecionada}
              onChange={setPecaSelecionada}
              placeholder="Selecionar Peça"
              isSearchable
              noOptionsMessage={() => "Não encontrado"}
              className="flex-grow-1"
              isDisabled={!!demanda.limpezaRealizada}
            />
            <input
              type="number"
              min={1}
              className="form-control"
              style={{ width: 70 }}
              value={qtdSelecionada}
              onChange={(e) => setQtdSelecionada(e.target.value)}
              disabled={!!demanda.limpezaRealizada}
            />
            <button
              className="btn btn-outline-primary"
              onClick={handleAddPecaDefeituosa}
              disabled={!pecaSelecionada || !qtdSelecionada || !!demanda.limpezaRealizada}
            >
              <GoPlus /> Adicionar
            </button>
          </div>
        </div>
      </div>
      {/* Lista de peças defeituosas */}
      <div className="row mb-2">
        <div className="col-12">
          <ul className="list-group mb-2">
            {pecasDefeituosasLocal.length === 0 && (
              <li className="list-group-item text-muted">Nenhuma peça defeituosa adicionada.</li>
            )}
            {pecasDefeituosasLocal.map((pd, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {pecas.find((p) => p.id === pd.peca.id)?.nome || pd.peca.id} — Quantidade: {pd.quantidade}
                </span>
                {!demanda.limpezaRealizada && (
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemovePecaDefeituosa(idx)}>
                    <HiMiniXMark />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Descrição do problema */}
      <div className="row mb-2">
        <div className="col-12 text-start">
          <span className="fw-semibold">Descrição do problema: </span>
          <span id="descricaoProblema">{demanda.descricaoItem}</span>
        </div>
      </div>
      {/* Testes */}
      <div className="row mb-2 align-items-center">
        <div className="col-12 col-md-6 d-flex align-items-center mb-2 mb-md-0">
          <label className="form-check-label fs-6 me-2" htmlFor="switchTesteRealizado">
            Teste realizado?
          </label>
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchTesteRealizado"
              checked={!!demanda.dataFimTestes}
              disabled={!!demanda.limpezaRealizada === false}
              onChange={() =>
                handleConfirmEvent(
                  demanda.dataInicioTestes
                    ? "fimTestes"
                    : "inicioTestes"
                )
              }
            />
          </div>
        </div>
      </div>
      {/* Finalização */}
      <div className="row mb-2 align-items-center">
        <div className="col-12 col-md-6 d-flex align-items-center mb-2 mb-md-0">
          <label className="form-check-label fs-6 me-2" htmlFor="finalizarDemanda">
            Finalizar Demanda:
          </label>
          <button
            className="btn btn-green-submit btn-sm me-2"
            disabled={!demanda.dataFimTestes || demanda.statusDemanda === "FINALIZADA"}
            onClick={() => handleConfirmEvent("finalizar")}
          >
            Finalizar
          </button>
          <button
            className="btn btn-red-submit btn-sm"
            disabled={demanda.statusDemanda === "DESCARTADA"}
            onClick={() => handleConfirmEvent("descartar")}
          >
            Descartar
          </button>
        </div>
      </div>
      {/* Histórico */}
      <div className="row mt-3">
        <div className="col-12">
          <h6>Histórico</h6>
          <ul className="list-group">
            {historico.length === 0 && (
              <li className="list-group-item text-muted">Sem histórico.</li>
            )}
            {historico.map((h) => (
              <li key={h.id} className="list-group-item">
                [{new Date(h.dataHora).toLocaleString()}] {h.acao} — {h.descricao}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "rgba(255,255,255,0.6)" }}>
          <div className="spinner-border text-primary" />
        </div>
      )}
    </div>
  );
}

// FormCriarDemanda: simplified, can be expanded as needed
function FormCriarDemanda({ onCreated }) {
  const [insumos, setInsumos] = useState([]);
  const [insumoSelecionado, setInsumoSelecionado] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [pecas, setPecas] = useState([]);
  const [pecasDefeituosas, setPecasDefeituosas] = useState([]);
  const [pecaSelecionada, setPecaSelecionada] = useState(null);
  const [qtdSelecionada, setQtdSelecionada] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJson(`${baseUrl}/insumo`).then(setInsumos).catch(() => setInsumos([]));
    fetchJson(`${baseUrl}/api/pecas`).then(setPecas).catch(() => setPecas([]));
  }, []);

  const handleAddPeca = () => {
    if (!pecaSelecionada || !qtdSelecionada) return;
    setPecasDefeituosas((prev) => [
      ...prev,
      { peca: { id: pecaSelecionada.value }, quantidade: Number(qtdSelecionada) },
    ]);
    setPecaSelecionada(null);
    setQtdSelecionada(1);
  };

  const handleRemovePeca = (idx) => {
    setPecasDefeituosas((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      insumo: insumoSelecionado ? { nome: insumoSelecionado.value } : null,
      descricaoItem: descricao,
      pecasDefeituosas,
    };
    fetch(`${baseUrl}/api/demandas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao criar demanda");
        return r.json();
      })
      .then((created) => {
        onCreated(created);
      })
      .catch((e) => alert("Erro: " + e.message))
      .finally(() => setLoading(false));
  };

  return (
    <form className="container-fluid px-0" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-12">
          <Select
            id="idInsumo"
            options={insumos.map((insumo) => ({
              value: insumo.nome,
              label: insumo.nome,
            }))}
            value={insumoSelecionado}
            onChange={setInsumoSelecionado}
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
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* Peças defeituosas */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex gap-2 align-items-center mb-2">
            <Select
              id="idPeca"
              options={pecas.map((peca) => ({
                value: peca.id,
                label: peca.nome,
              }))}
              value={pecaSelecionada}
              onChange={setPecaSelecionada}
              placeholder="Selecionar Peça"
              isSearchable
              noOptionsMessage={() => "Não encontrado"}
              className="flex-grow-1"
            />
            <input
              type="number"
              min={1}
              className="form-control"
              style={{ width: 70 }}
              value={qtdSelecionada}
              onChange={(e) => setQtdSelecionada(e.target.value)}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleAddPeca}
              disabled={!pecaSelecionada || !qtdSelecionada}
            >
              <GoPlus /> Adicionar
            </button>
          </div>
          <ul className="list-group">
            {pecasDefeituosas.length === 0 && (
              <li className="list-group-item text-muted">Nenhuma peça defeituosa adicionada.</li>
            )}
            {pecasDefeituosas.map((pd, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {pecas.find((p) => p.id === pd.peca.id)?.nome || pd.peca.id} — Quantidade: {pd.quantidade}
                </span>
                <button className="btn btn-sm btn-danger" type="button" onClick={() => handleRemovePeca(idx)}>
                  <HiMiniXMark />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <button type="submit" className="btn color-blue" disabled={loading}>
            <FaSave /> <small>Salvar</small>
          </button>
        </div>
      </div>
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "rgba(255,255,255,0.6)" }}>
          <div className="spinner-border text-primary" />
        </div>
      )}
    </form>
  );
}

// Main page
export default function Producao() {
  const [demandas, setDemandas] = useState([]);
  const [demandaSelecionada, setDemandaSelecionada] = useState(null);
  const [showCriarDemanda, setShowCriarDemanda] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load demandas list
  const loadDemandas = () => {
    setLoading(true);
    fetchJson(`${baseUrl}/api/demandas`)
      .then(setDemandas)
      .catch(() => setDemandas([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDemandas();
  }, []);

  // Select demanda and fetch full data
  const handleSelectDemanda = (id) => {
    setLoading(true);
    fetchJson(`${baseUrl}/api/demandas/${id}`)
      .then((d) => setDemandaSelecionada(d))
      .catch(() => setDemandaSelecionada(null))
      .finally(() => setLoading(false));
  };

  // After update, reload demanda and list
  const handleDemandaUpdated = (updated) => {
    setDemandaSelecionada(updated);
    loadDemandas();
  };

  // After create, reload list and select new
  const handleDemandaCreated = (created) => {
    setShowCriarDemanda(false);
    loadDemandas();
    handleSelectDemanda(created.id);
  };

  return (
    <PageLayout>
      <div className="container-fluid py-0">
        <h3 className="display-5 text-start text-blue mb-4">Produção</h3>
        <div className="row g-4 flex-lg-nowrap">
          {/* Coluna da esquerda */}
          <div className="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="container-fluid">
                <div className="row align-items-center border-bottom shadow-sm">
                  <div className="col-6 text-start ">
                    <p className="fs-4 mb-1 ">Demandas</p>
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
                </div>
              </div>
              <div className="card-body p-3 overflow-auto" style={{ maxHeight: "60vh" }}>
                <div className="d-flex flex-column gap-2">
                  {demandas.map((d) => (
                    <ItemDemanda
                      key={d.id}
                      demanda={d}
                      onClick={handleSelectDemanda}
                      selected={demandaSelecionada?.id === d.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Coluna da direita */}
          <div className="col-lg-8 col-md-6 col-12 d-flex flex-column">
            <div className="card glass-div rounded flex-grow-1 d-flex flex-column h-100">
              <div className="card-body p-3 position-relative">
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
                      <FormCriarDemanda onCreated={handleDemandaCreated} />
                    </div>
                  </div>
                ) : (
                  <DemandaAberta
                    demanda={demandaSelecionada}
                    onClose={() => setDemandaSelecionada(null)}
                    onDemandaUpdated={handleDemandaUpdated}
                  />
                )}
                {loading && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "rgba(255,255,255,0.6)" }}>
                    <div className="spinner-border text-primary" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
