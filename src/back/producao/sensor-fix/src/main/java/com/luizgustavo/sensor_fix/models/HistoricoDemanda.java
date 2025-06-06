package com.luizgustavo.sensor_fix.models;

import javax.persistence.*;

import java.time.LocalDateTime;

@Entity
public class HistoricoDemanda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "demanda_id", nullable = false)
    private DemandaProducao demanda;

    public enum AcaoDemanda {
        CRIACAO,
        ABERTURA,
        INICIO_LIMPEZA,
        FIM_LIMPEZA,
        INICIO_RECUPERACAO,
        FIM_RECUPERACAO,
        INICIO_TESTES,
        FIM_TESTES,
        CONCLUSAO,
        ENCERRAMENTO,
        FALHA_TESTE,
        DESCARTE
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "acao", nullable = false)
    private AcaoDemanda acao;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_hora", columnDefinition = "DATETIME2")
    private LocalDateTime dataHora;

    /*@Column(name = "usuario")
    private String usuario;*/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DemandaProducao getDemanda() {
        return demanda;
    }

    public void setDemanda(DemandaProducao demanda) {
        this.demanda = demanda;
    }

    public AcaoDemanda getAcao() {
        return acao;
    }

    public void setAcao(AcaoDemanda acao) {
        this.acao = acao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    /* public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    } */

}
