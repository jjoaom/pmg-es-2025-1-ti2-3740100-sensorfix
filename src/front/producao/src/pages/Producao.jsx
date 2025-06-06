import React, { useState, useEffect, useCallback } from "react";
import PageLayout from "../components/PageLayout";
import { GoPlus } from "react-icons/go";
import { FaSave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import Select from "react-select";
import { api } from "../utils/api";

// Hook para loading global
function useLoading() {
  const [loading, setLoading] = useState(false);
  const withLoading = useCallback(
    async (fn) => {
      setLoading(true);
      try {
        return await fn();
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return [loading, withLoading];
}

// Componente reutilizável para lista de peças defeituosas
function ListaPecasDefeituosas({ pecas, pecasDefeituosas, onRemove, disabled }) {
  const lista = Array.isArray(pecasDefeituosas) ? pecasDefeituosas : [];
  return (
    <ul className="list-group mb-2">
      {lista.length === 0 && (
        <li className="list-group-item text-muted">Nenhuma peça defeituosa adicionada.</li>
      )}
      {lista.map((pd, idx) => (
        <li key={pd.peca.id + "-" + idx} className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            {pecas.find((p) => p.id === pd.peca.id)?.nome || pd.peca.id} — Quantidade: {pd.quantidade}
          </span>
          {!disabled && (
            <button
              className="btn btn-sm btn-danger"
              aria-label="Remover peça defeituosa"
              onClick={() => onRemove(idx)}
              type="button"
            >
              <HiMiniXMark />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

// Modal component (melhor acessibilidade)
function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.3)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content btn-design">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">{title || "Confirmação"}</h5>
            <button type="button" className="btn-close" aria-label="Fechar" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-design btn-danger" onClick={onCancel}>Cancelar</button>
            <button className="btn btn-design btn-primary" onClick={onConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ItemDemanda: mostra resumo da demanda na lista
const ItemDemanda = React.memo(({ demanda, onClick, selected }) => (
  <div
    className={`card glass-div rounded shiny ${selected ? "border-primary border-2" : ""}`}
    onClick={() => onClick(demanda.id)}
    style={{ cursor: "pointer" }}
    tabIndex={0}
    aria-pressed={selected}
    aria-label={`Selecionar demanda ${demanda.id}`}
    onKeyDown={e => { if (e.key === "Enter") onClick(demanda.id); }}
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
));

// DemandaAberta: detalhe da demanda
function DemandaAberta({ demanda, onClose, onDemandaUpdated }) {
  const [pecas, setPecas] = useState([]);
  const [pecaSelecionada, setPecaSelecionada] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [pecasDefeituosasLocal, setPecasDefeituosasLocal] = useState([]);
  const [showConfirmLimpeza, setShowConfirmLimpeza] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [loading, withLoading] = useLoading();
  const [confirmModal, setConfirmModal] = useState({ show: false, type: null });
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!demanda) return;
    setErro("");
    withLoading(async () => {
      try {
        const [pecasData, historicoData] = await Promise.all([
          api.get(`/api/pecas`),
          api.get(`/api/demandas/${demanda.id}/historico`)
        ]);
        setPecas(pecasData);
        setHistorico(historicoData);
      } catch (err) {
        setPecas([]);
        setHistorico([]);
        setErro("Erro ao carregar dados da demanda.");
        console.error(err);
      } finally {
        setPecasDefeituosasLocal(demanda.pecasDefeituosas || []);
      }
    });
  }, [demanda, withLoading]);

  if (!demanda) return <p className="text-muted">Nenhuma demanda selecionada.</p>;

  // Adicionar peça defeituosa
  const handleAddPecaDefeituosa = () => {
    setErro("");
    if (!pecaSelecionada || !quantidadeSelecionada || quantidadeSelecionada < 1) {
      setErro("Selecione uma peça e uma quantidade válida.");
      return;
    }
    setPecasDefeituosasLocal((prev) => [
      ...prev,
      { peca: { id: pecaSelecionada.value }, quantidade: Number(quantidadeSelecionada) },
    ]);
    setPecaSelecionada(null);
    setQuantidadeSelecionada(1);
  };

  // Remover peça defeituosa
  const handleRemovePecaDefeituosa = (idx) => {
    setPecasDefeituosasLocal((prev) => prev.filter((_, i) => i !== idx));
  };

  // Limpeza toggle logic
  const handleLimpezaToggle = () => {
    if (!demanda.limpezaRealizada) setShowConfirmLimpeza(true);
  };

  // Confirma Limpeza
  const confirmLimpeza = async () => {
    setErro("");
    await withLoading(async () => {
      const payload = {
        ...demanda,
        dataLimpeza: new Date().toISOString(),
        statusDemanda: "EM_RECUPERACAO",
        limpezaRealizada: true,
        pecasDefeituosas: pecasDefeituosasLocal,
      };
      try {
        const updated = await api.put(`/api/demandas/${demanda.id}`, payload);
        setShowConfirmLimpeza(false);
        onDemandaUpdated(updated);
      } catch (e) {
        setErro("Erro ao confirmar limpeza: " + e.message);
      }
    });
  };

  // Confirm modal para outros eventos
  const handleConfirmEvent = (type) => {
    setConfirmModal({ show: true, type });
  };

  const atualizarDemanda = async (payload, callback) => {
    setErro("");
    await withLoading(async () => {
      try {
        const updated = await api.put(`/api/demandas/${payload.id}`, payload);
        callback(updated);
      } catch (e) {
        setErro("Erro ao atualizar demanda: " + e.message);
      }
    });
  };

  const handleEventConfirmed = () => {
    const now = new Date().toISOString();
    let payload = { ...demanda };

    switch (confirmModal.type) {
      case "inicioTestes":
        payload = { ...payload, dataInicioTestes: now, statusDemanda: "EM_TESTES" };
        break;
      case "fimTestes":
        payload = { ...payload, dataFimTestes: now, statusDemanda: "AGUARDANDO_FINALIZACAO" };
        break;
      case "finalizar":
        payload = { ...payload, dataConclusao: now, statusDemanda: "FINALIZADA" };
        break;
      case "descartar":
        payload = { ...payload, dataEncerramento: now, statusDemanda: "DESCARTADA" };
        break;
      default:
        return;
    }

    atualizarDemanda(payload, (updated) => {
      setConfirmModal({ show: false, type: null });
      onDemandaUpdated(updated);
    });
  };

  return (
    <div className="container-fluid position-relative">
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
          <button type="button" className="btn-close" aria-label="Fechar" onClick={onClose}></button>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12 text-start">
          <p className="fs-6 mb-1">
            Gerado em:{" "}
            <span>
              {(() => {
                if (demanda.dataHoraCriacao && demanda.dataHoraCriacao.length >= 5) {
                  const [ano, mes, dia, hora, minuto] = demanda.dataHoraCriacao;
                  const dt = new Date(ano, mes - 1, dia, hora, minuto);
                  return dt.toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }
                return "-";
              })()}
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
              aria-checked={!!demanda.limpezaRealizada}
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
              aria-label="Selecionar peça defeituosa"
            />
            <input
              type="number"
              min={1}
              className="form-control"
              style={{ width: 70 }}
              value={quantidadeSelecionada}
              onChange={(e) => setQuantidadeSelecionada(Number(e.target.value))}
              disabled={!!demanda.limpezaRealizada}
              aria-label="Quantidade"
            />
            <button
              className="btn btn-outline-primary"
              onClick={handleAddPecaDefeituosa}
              disabled={!pecaSelecionada || !quantidadeSelecionada || !!demanda.limpezaRealizada}
              type="button"
            >
              <GoPlus /> Adicionar
            </button>
          </div>
        </div>
      </div>
      {/* Lista de peças defeituosas */}
      <div className="row mb-2">
        <div className="col-12">
          <ListaPecasDefeituosas
            pecas={pecas}
            pecasDefeituosas={pecasDefeituosasLocal}
            onRemove={handleRemovePecaDefeituosa}
            disabled={!!demanda.limpezaRealizada}
          />
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
              aria-checked={!!demanda.dataFimTestes}
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
            id="finalizarDemanda"
            type="button"
          >
            Finalizar
          </button>
          <button
            className="btn btn-red-submit btn-sm"
            disabled={demanda.statusDemanda === "DESCARTADA"}
            onClick={() => handleConfirmEvent("descartar")}
            type="button"
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
                [{new Date(h.dataHora).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}] {h.acao} — {h.descricao}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {erro && (
        <div className="alert alert-danger mt-2" role="alert">
          {erro}
        </div>
      )}
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "rgba(255,255,255,0.6)", zIndex: 10 }}>
          <div className="spinner-border text-primary" />
        </div>
      )}
    </div>
  );
}

// Formulário para criar demanda
function FormCriarDemanda({ onCreated }) {
  const [insumos, setInsumos] = useState([]);
  const [insumoSelecionado, setInsumoSelecionado] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [pecas, setPecas] = useState([]);
  const [pecasDefeituosas, setPecasDefeituosas] = useState([]);
  const [pecaSelecionada, setPecaSelecionada] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [loading, withLoading] = useLoading();
  const [erro, setErro] = useState("");

  useEffect(() => {
    setErro("");
    withLoading(async () => {
      try {
        const [insumosData, pecasData] = await Promise.all([
          api.get("/insumo"),
          api.get("/api/pecas"),
        ]);
        setInsumos(insumosData);
        setPecas(pecasData);
      } catch (err) {
        setInsumos([]);
        setPecas([]);
        setErro("Erro ao carregar insumos ou peças.");
        console.error(err);
      }
    });
  }, [withLoading]);

  const handleAddPeca = () => {
    setErro("");
    if (!pecaSelecionada || !quantidadeSelecionada || quantidadeSelecionada < 1) {
      setErro("Selecione uma peça e uma quantidade válida.");
      return;
    }
    setPecasDefeituosas((prev) => [
      ...prev,
      { peca: { id: pecaSelecionada.value }, quantidade: Number(quantidadeSelecionada) },
    ]);
    setPecaSelecionada(null);
    setQuantidadeSelecionada(1);
  };

  const handleRemovePeca = (idx) => {
    setPecasDefeituosas((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    if (!insumoSelecionado || !descricao.trim()) {
      setErro("Selecione um insumo e preencha a descrição.");
      return;
    }
    await withLoading(async () => {
      const payload = {
        insumo: { id: insumoSelecionado.value },
        descricaoItem: descricao,
        pecasDefeituosas,
      };
      try {
        const created = await api.post("/api/demandas", payload);
        onCreated(created);
      } catch (e) {
        setErro("Erro ao criar demanda: " + e.message);
      }
    });
  };

  return (
    <form className="container-fluid px-0 position-relative" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-12">
          <Select
            id="idInsumo"
            options={insumos.map((insumo) => ({
              value: insumo.id,
              label: insumo.nome,
            }))}
            value={insumoSelecionado}
            onChange={setInsumoSelecionado}
            placeholder="Selecionar Insumo"
            isSearchable
            noOptionsMessage={() => "Não encontrado"}
            aria-label="Selecionar insumo"
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
            aria-label="Descrição do problema"
            required
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
              isDisabled={loading}
              aria-label="Selecionar peça defeituosa"
            />
            <input
              type="number"
              min={1}
              className="form-control"
              style={{ width: 70 }}
              value={quantidadeSelecionada}
              onChange={(e) => setQuantidadeSelecionada(Number(e.target.value))}
              aria-label="Quantidade"
              disabled={loading}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleAddPeca}
              disabled={!pecaSelecionada || !quantidadeSelecionada || loading}
            >
              <GoPlus /> Adicionar
            </button>
          </div>
          <ListaPecasDefeituosas
            pecas={pecas}
            pecasDefeituosas={pecasDefeituosas}
            onRemove={handleRemovePeca}
            disabled={loading}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <button type="submit" className="btn color-blue" disabled={loading}>
            <FaSave /> <small>Salvar</small>
          </button>
        </div>
      </div>
      {erro && (
        <div className="alert alert-danger mt-2" role="alert">
          {erro}
        </div>
      )}
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "rgba(255,255,255,0.6)", zIndex: 10 }}>
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
  const [loading, withLoading] = useLoading();
  const [erro, setErro] = useState("");

  // Carregar lista de demandas
  const loadDemandas = useCallback(async () => {
    setErro("");
    await withLoading(async () => {
      try {
        const data = await api.get("/api/demandas");
        setDemandas(data);
      } catch (e) {
        setDemandas([]);
        setErro("Erro ao carregar demandas.");
        console.error(e);
      }
    });
  }, [withLoading]);

  useEffect(() => {
    loadDemandas();
  }, [loadDemandas]);

  // Selecionar demanda específica
  const handleSelectDemanda = async (id) => {
    setErro("");
    await withLoading(async () => {
      try {
        const d = await api.get(`/api/demandas/${id}`);
        setDemandaSelecionada(d);
      } catch (e) {
        setDemandaSelecionada(null);
        setErro("Erro ao carregar a demanda.");
        console.error(e);
      }
    });
  };

  // Após update, recarrega demanda e lista
  const handleDemandaUpdated = (updated) => {
    setDemandaSelecionada(updated);
    loadDemandas();
  };

  // Após criar, recarrega lista e seleciona nova
  const handleDemandaCreated = (created) => {
    setShowCriarDemanda(false);
    loadDemandas();
    handleSelectDemanda(created.id);
  };

  return (
    <PageLayout>
      <div className="container-fluid py-0 position-relative">
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
                    <button
                      type="button"
                      className="btn btn-primary-subtle btn-sm"
                      title="Filtrar"
                      aria-label="Filtrar demandas"
                      disabled
                    >
                      <FaFilter />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setShowCriarDemanda(true)}
                      aria-label="Criar nova demanda"
                    >
                      <GoPlus size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="card-body p-3 overflow-auto"
                style={{ maxHeight: "60vh" }}
              >
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
                      <h1 className="fs-4 text-start mb-0">
                        Criar nova Demanda
                      </h1>
                      <button
                        type="button"
                        className="btn btn-close"
                        aria-label="Fechar"
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
                {erro && (
                  <div className="alert alert-danger mt-2" role="alert">
                    {erro}
                  </div>
                )}
                {loading && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ background: "rgba(255,255,255,0.6)", zIndex: 10 }}
                  >
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