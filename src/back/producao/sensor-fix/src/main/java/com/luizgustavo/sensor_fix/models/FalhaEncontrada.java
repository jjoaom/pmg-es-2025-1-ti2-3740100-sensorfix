package com.luizgustavo.sensor_fix.models;

import java.time.LocalDate;

import javax.persistence.*;






@Entity
public class FalhaEncontrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sintomaAcusado;
    private String falhaEncontrada;
    private String causaProvavel;
    private String acaoASerTomada;
    private LocalDate dataRevisao;

    

    @ManyToOne
    @JoinColumn(name = "revisao_id")
    private Revisao revisao;


    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getSintomaAcusado() {
        return sintomaAcusado;
    }

    public void setSintomaAcusado(String sintomaAcusado) {
        this.sintomaAcusado = sintomaAcusado;
    }

    public String getFalhaEncontrada() {
        return falhaEncontrada;
    }

    public void setFalhaEncontrada(String falhaEncontrada) {
        this.falhaEncontrada = falhaEncontrada;
    }

    public String getCausaProvavel() {
        return causaProvavel;
    }

    public void setCausaProvavel(String causaProvavel) {
        this.causaProvavel = causaProvavel;
    }

    public String getAcaoASerTomada() {
        return acaoASerTomada;
    }

    public void setAcaoASerTomada(String acaoASerTomada) {
        this.acaoASerTomada = acaoASerTomada;
    }

    public Revisao getRevisao() {
        return revisao;
    }

    public void setRevisao(Revisao revisao) {
        this.revisao = revisao;
    }

    // Getters e Setters
    public LocalDate getDataRevisao() {
        return dataRevisao;
    }

    public void setDataRevisao(LocalDate dataRevisao) {
        this.dataRevisao = dataRevisao;
    }
}