/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.luizgustavo.sensor_fix.models;

import javax.persistence.*;
import javax.validation.Valid;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.time.Duration;

@Entity
public class DemandaProducao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name = "data_hora_criacao", columnDefinition = "DATETIME2")
    private LocalDateTime dataHoraCriacao;

    @Column(name = "data_abertura", columnDefinition = "DATETIME2")
    private LocalDateTime dataAbertura;

    @Column(name = "data_limpeza", columnDefinition = "DATETIME2")
    private LocalDateTime dataLimpeza;

    @Column(name = "data_recuperacao", columnDefinition = "DATETIME2")
    private LocalDateTime dataRecuperacao;

    @Column(name = "data_inicio_testes", columnDefinition = "DATETIME2")
    private LocalDateTime dataInicioTestes;

    @Column(name = "data_fim_testes", columnDefinition = "DATETIME2")
    private LocalDateTime dataFimTestes;

    @Column(name = "data_conclusao", columnDefinition = "DATETIME2")
    private LocalDateTime dataConclusao;

    @Column(name = "data_encerramento", columnDefinition = "DATETIME2")
    private LocalDateTime dataEncerramento;

    @Column(name = "setor_responsavel")
    private String setorResponsavel;;

    @Column(name = "responsavel")
    private String responsavel;

    @NotNull(message = "O insumo é obrigatório")
    @ManyToOne
    @JoinColumn(name = "id_equipamento", nullable = false)
    private Equipamento equipamento;

    @Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres")
    @Column(name = "descricao_item", length = 255)
    private String descricaoItem;

    @Column(name = "limpeza_realizada")
    private boolean limpezaRealizada;

    @Valid
    @OneToMany(mappedBy = "demanda", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PecaDefeituosa> pecasDefeituosas = new ArrayList<>();

    @Column(name = "produto_recuperado")
    private boolean produtoRecuperado;

    @Column(name = "observacoes", columnDefinition = "TEXT")
    private String observacoes;

    @Column(name = "relatorio_testes", columnDefinition = "TEXT")
    private String relatorioTestes;

    @Column(name = "teste_bem_sucedido")
    private boolean testeBemSucedido;

    public enum StatusDemanda {
        CRIADA, ABERTA, EM_ANALISE, EM_RECUPERACAO, EM_TESTE, FALHA_TESTE, FINALIZADA, DESCARTADA
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "status_demanda")
    private StatusDemanda statusDemanda;

    public long getId() {
        return id;
    }

    public LocalDateTime getDataHoraCriacao() {
        return dataHoraCriacao;
    }

    public String getSetorResponsavel() {
        return setorResponsavel;
    }

    public String getDescricaoItem() {
        return descricaoItem;
    }

    public boolean isLimpezaRealizada() {
        return limpezaRealizada;
    }

    public boolean isProdutoRecuperado() {
        return produtoRecuperado;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public String getRelatorioTestes() {
        return relatorioTestes;
    }

    public boolean isTesteBemSucedido() {
        return testeBemSucedido;
    }

    public StatusDemanda getStatusDemanda() {
        return statusDemanda;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setDataHoraCriacao(LocalDateTime dataHoraCriacao) {
        this.dataHoraCriacao = dataHoraCriacao;
    }

    public void setSetorResponsavel(String setorResponsavel) {
        this.setorResponsavel = setorResponsavel;
    }

    public void setDescricaoItem(String descricaoItem) {
        this.descricaoItem = descricaoItem;
    }

    public void setLimpezaRealizada(boolean limpezaRealizada) {
        this.limpezaRealizada = limpezaRealizada;
    }

    public void setProdutoRecuperado(boolean produtoRecuperado) {
        this.produtoRecuperado = produtoRecuperado;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public void setRelatorioTestes(String relatorioTestes) {
        this.relatorioTestes = relatorioTestes;
    }

    public void setTesteBemSucedido(boolean testeBemSucedido) {
        this.testeBemSucedido = testeBemSucedido;
    }

    public void setStatusDemanda(StatusDemanda statusDemanda) {
        this.statusDemanda = statusDemanda;
    }

    public LocalDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public LocalDateTime getDataLimpeza() {
        return dataLimpeza;
    }

    public void setDataLimpeza(LocalDateTime dataLimpeza) {
        this.dataLimpeza = dataLimpeza;
    }

    public LocalDateTime getDataRecuperacao() {
        return dataRecuperacao;
    }

    public void setDataRecuperacao(LocalDateTime dataRecuperacao) {
        this.dataRecuperacao = dataRecuperacao;
    }

    public LocalDateTime getDataInicioTestes() {
        return dataInicioTestes;
    }

    public void setDataInicioTestes(LocalDateTime dataInicioTestes) {
        this.dataInicioTestes = dataInicioTestes;
    }

    public LocalDateTime getDataFimTestes() {
        return dataFimTestes;
    }

    public void setDataFimTestes(LocalDateTime dataFimTestes) {
        this.dataFimTestes = dataFimTestes;
    }

    public LocalDateTime getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDateTime dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public LocalDateTime getDataEncerramento() {
        return dataEncerramento;
    }

    public void setDataEncerramento(LocalDateTime dataEncerramento) {
        this.dataEncerramento = dataEncerramento;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public Equipamento geEquipamento() {
        return equipamento;
    }

    public void setEquipamento(Equipamento equipamento) {
        this.equipamento = equipamento;
    }

    public List<PecaDefeituosa> getPecasDefeituosas() {
        return pecasDefeituosas;
    }

    public void setPecasDefeituosas(List<PecaDefeituosa> pecasDefeituosas) {
        this.pecasDefeituosas = pecasDefeituosas;
    }

    public Duration tempoTotal() {
        if (dataHoraCriacao != null && dataConclusao != null) {
            return Duration.between(dataHoraCriacao, dataConclusao);
        }
        return null;
    }

    public Duration tempoLimpeza() {
        if (dataAbertura != null && dataLimpeza != null) {
            return Duration.between(dataAbertura, dataLimpeza);
        }
        return null;
    }

    public Duration tempoRecuperacao() {
        if (dataLimpeza != null && dataRecuperacao != null) {
            return Duration.between(dataLimpeza, dataRecuperacao);
        }
        return null;
    }

    public Duration tempoTestes() {
        if (dataInicioTestes != null && dataFimTestes != null) {
            return Duration.between(dataInicioTestes, dataFimTestes);
        }
        return null;
    }

    public boolean podeAvancarParaTestes() {
        return statusDemanda == StatusDemanda.EM_RECUPERACAO && produtoRecuperado;
    }
}
