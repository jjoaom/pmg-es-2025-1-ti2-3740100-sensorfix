/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.luizgustavo.sensor_fix.models;

import javax.persistence.*;
import java.time.LocalDateTime;
/**
 *
 * @author joaom
 */
@Entity
public class DemandaProducao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name = "data_hora_criacao", columnDefinition = "TIMESTAMP")
    private LocalDateTime dataHoraCriacao;

    @Column(name = "setor_responsavel", nullable = false)
    private String setorResponsavel;

    @Column(name = "id_insumo", nullable = false)
    private long idInsumo;

    @Column(name = "descricao_item")
    private String descricaoItem;

    @Column(name = "limpeza_realizada")
    private boolean limpezaRealizada;

    @Column(name = "qtd_pecas_defeituosas")
    private int qtdPecasDefeituosas;

    @Column(name = "produto_recuperado")
    private boolean produtoRecuperado;

    @Column(name = "observacoes", columnDefinition = "TEXT")
    private String observacoes;

    @Column(name = "relatorio_testes", columnDefinition = "TEXT")
    private String relatorioTestes;

    @Column(name = "teste_bem_sucedido")
    private boolean testeBemSucedido;

    @Column(name = "status_demanda")
    private String statusDemanda;

    public long getId() {
        return id;
    }

    public LocalDateTime getDataHoraCriacao() {
        return dataHoraCriacao;
    }

    public String getSetorResponsavel() {
        return setorResponsavel;
    }

    public long getIdInsumo() {
        return idInsumo;
    }

    public String getDescricaoItem() {
        return descricaoItem;
    }

    public boolean isLimpezaRealizada() {
        return limpezaRealizada;
    }

    public int getQtdPecasDefeituosas() {
        return qtdPecasDefeituosas;
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

    public String getStatusDemanda() {
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

    public void setIdInsumo(long idInsumo) {
        this.idInsumo = idInsumo;
    }

    public void setDescricaoItem(String descricaoItem) {
        this.descricaoItem = descricaoItem;
    }

    public void setLimpezaRealizada(boolean limpezaRealizada) {
        this.limpezaRealizada = limpezaRealizada;
    }

    public void setQtdPecasDefeituosas(int qtdPecasDefeituosas) {
        this.qtdPecasDefeituosas = qtdPecasDefeituosas;
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

    public void setStatusDemanda(String statusDemanda) {
        this.statusDemanda = statusDemanda;
    }
    
    
    
}
