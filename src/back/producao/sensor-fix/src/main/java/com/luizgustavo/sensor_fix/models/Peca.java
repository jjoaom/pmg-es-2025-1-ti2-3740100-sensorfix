package com.luizgustavo.sensor_fix.models;

import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = Peca.TABLE_NAME)
public class Peca {
    public static final String TABLE_NAME = "peca";

    public interface CreatePeca{

    }
    public interface UpdatePeca{

    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "id", unique = true)
    private Long id;
    
    @Column(name = "nome", nullable = false, length = 100, unique = true)
    @NotNull
    @NotEmpty
    private String nome;
    
    @Column(name = "descricao", nullable = false, length = 255)
    @NotNull
    @NotEmpty
    private String descricao;
    
    @Column(name = "quantidade", nullable = false)
    private int qtd;
    
    public Peca(){

    }
    public Peca(Long id, String nome, String descricao, int qtd){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.qtd = qtd;
    }
    
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getNome(){
        return this.nome;
    }
    public void setNome(String nome){
        this.nome = nome;
    }
    public String getDescricao(){
        return this.descricao;
    }
    public void setDescricao(String descricao){
        this.descricao = descricao;
    }
    public int getQtd(){
        return this.qtd;
    }
    public void setQtd(int qtd){
        this.qtd = qtd;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Peca)) return false;
        Peca that = (Peca) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Peça{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", Descrição=" + descricao + '\'' +
                ", quantidade=" + qtd + 
                '}';
    }
}
