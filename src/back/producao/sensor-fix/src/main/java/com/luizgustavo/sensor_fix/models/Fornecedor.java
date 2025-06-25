package com.luizgustavo.sensor_fix.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = Fornecedor.TABLE_NAME)
public class Fornecedor {
    public static final String TABLE_NAME = "fornecedor";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private Long id;

    @Column(name = "nome",unique = true,nullable = true)
    private String nome;

    @Column(name = "tel",unique = true,nullable = true)
    private String tel;


    public Fornecedor() {
    }

    public Fornecedor(Long id, String nome, String tel) {
        this.id = id;
        this.nome = nome;
        this.tel = tel;
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

    public String getTel() {
        return this.tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Fornecedor id(Long id) {
        setId(id);
        return this;
    }

    public Fornecedor nome(String nome) {
        setNome(nome);
        return this;
    }

    public Fornecedor tel(String tel) {
        setTel(tel);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Fornecedor)) {
            return false;
        }
        Fornecedor fornecedor = (Fornecedor) o;
        return id == fornecedor.id && Objects.equals(nome, fornecedor.nome) && Objects.equals(tel, fornecedor.tel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, tel);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", nome='" + getNome() + "'" +
            ", tel='" + getTel() + "'" +
            "}";
    }

}
