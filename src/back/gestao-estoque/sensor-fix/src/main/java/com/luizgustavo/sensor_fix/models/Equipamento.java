package com.luizgustavo.sensor_fix.models;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = Equipamento.TABLE_NAME)
public class Equipamento {
    public static final String TABLE_NAME = "equipamento";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 100, nullable = false, unique = true)
    private String nome;

    @Column(name = "peso", precision = 6, scale = 2)
    private float peso;

    @Column(name = "estoqueMin", nullable = false)
    private int estoqueMin;

    @Column(name = "quantidade", nullable = false)
    private int quantidade;

    @Column(name = "endereco", nullable = false, length = 255)
    @NotNull
    @NotEmpty
    private String endereco;

    @Column(name = "deposito", nullable = false)
    private int deposito;

    //private List<Insumo> insumos = new ArrayList<Insumo>();

    public Equipamento() {
    }

    public Equipamento(Long id, String nome, float peso, int estoqueMin, int quantidade, String endereco, int deposito) {
        this.id = id;
        this.nome = nome;
        this.peso = peso;
        this.estoqueMin = estoqueMin;
        this.quantidade = quantidade;
        this.endereco = endereco;
        this.deposito = deposito;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public float getPeso() {
        return this.peso;
    }

    public void setPeso(float peso) {
        this.peso = peso;
    }

    public int getEstoqueMin() {
        return this.estoqueMin;
    }

    public void setEstoqueMin(int estoqueMin) {
        this.estoqueMin = estoqueMin;
    }

    public int getQuantidade() {
        return this.quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getEndereco() {
        return this.endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public int getDeposito() {
        return this.deposito;
    }

    public void setDeposito(int deposito) {
        this.deposito = deposito;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Equipamento)) return false;
        Equipamento that = (Equipamento) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Equipamento{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", peso=" + peso +
                ", estoqueMin=" + estoqueMin +
                ", quantidade=" + quantidade +
                ", endereco='" + endereco + '\'' +
                ", deposito=" + deposito +
                '}';
    }
}
