package com.luizgustavo.sensor_fix.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class EstoqueDeposito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo_deposito", nullable = false, length = 50, unique = true)
    private String tipoDeposito;

    @Column(nullable = false)
    private int quantidade;

    public EstoqueDeposito() {}

    public EstoqueDeposito(String tipoDeposito, int quantidade) {
        this.tipoDeposito = tipoDeposito;
        this.quantidade = quantidade;
    }

    public Long getId() {
        return id;
    }

    public String getTipoDeposito() {
        return tipoDeposito;
    }

    public void setTipoDeposito(String tipoDeposito) {
        this.tipoDeposito = tipoDeposito;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
