package com.luizgustavo.sensor_fix.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = PedidoCompra.TABLE_NOME)
public class PedidoCompra {
    public static final String TABLE_NOME = "pedido_compra";

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id",unique = true)
    private Long id;

    @Column(name = "id_fornecedor")
    private int idfornecedor;

    @Column(name = "data",columnDefinition = "DATE")
    private LocalDate data;

    public PedidoCompra() {
    }

    public PedidoCompra(long id, int idfornecedor, LocalDate data) {
        this.id = id;
        this.idfornecedor = idfornecedor;
        this.data = data;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getIdfornecedor() {
        return this.idfornecedor;
    }

    public void setIdfornecedor(int idfornecedor) {
        this.idfornecedor = idfornecedor;
    }

    public LocalDate getData() {
        return this.data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public PedidoCompra id(long id) {
        setId(id);
        return this;
    }

    public PedidoCompra idfornecedor(int idfornecedor) {
        setIdfornecedor(idfornecedor);
        return this;
    }

    public PedidoCompra data(LocalDate data) {
        setData(data);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof PedidoCompra)) {
            return false;
        }
        PedidoCompra pedidoCompra = (PedidoCompra) o;
        return id == pedidoCompra.id && idfornecedor == pedidoCompra.idfornecedor && Objects.equals(data, pedidoCompra.data);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, idfornecedor, data);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", idfornecedor='" + getIdfornecedor() + "'" +
            ", data='" + getData() + "'" +
            "}";
    }

    
}
