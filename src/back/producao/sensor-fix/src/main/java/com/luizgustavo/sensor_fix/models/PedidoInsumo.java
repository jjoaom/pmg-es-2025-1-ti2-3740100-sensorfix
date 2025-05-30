package com.luizgustavo.sensor_fix.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name= PedidoInsumo.TABLE_NAME)
public class PedidoInsumo {
    public static final String TABLE_NAME ="pedido_insumo";
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private PedidoCompra pedidoCompra;

    @ManyToOne
    @JoinColumn(name = "insumo_id", nullable = false)
    private Insumo insumo;

    @Column(name = "quantidade", nullable = false)
    private int quantidade;

    public PedidoInsumo() {
    }

    public PedidoInsumo(Long id, PedidoCompra pedidoCompra, Insumo insumo, int quantidade) {
        this.id = id;
        this.pedidoCompra = pedidoCompra;
        this.insumo = insumo;
        this.quantidade = quantidade;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PedidoCompra getPedidoCompra() {
        return this.pedidoCompra;
    }

    public void setPedidoCompra(PedidoCompra pedidoCompra) {
        this.pedidoCompra = pedidoCompra;
    }

    public Insumo getInsumo() {
        return this.insumo;
    }

    public void setInsumo(Insumo insumo) {
        this.insumo = insumo;
    }

    public int getQuantidade() {
        return this.quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public PedidoInsumo id(Long id) {
        setId(id);
        return this;
    }

    public PedidoInsumo pedidoCompra(PedidoCompra pedidoCompra) {
        setPedidoCompra(pedidoCompra);
        return this;
    }

    public PedidoInsumo insumo(Insumo insumo) {
        setInsumo(insumo);
        return this;
    }

    public PedidoInsumo quantidade(int quantidade) {
        setQuantidade(quantidade);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof PedidoInsumo)) {
            return false;
        }
        PedidoInsumo pedidoInsumo = (PedidoInsumo) o;
        return Objects.equals(id, pedidoInsumo.id) && Objects.equals(pedidoCompra, pedidoInsumo.pedidoCompra) && Objects.equals(insumo, pedidoInsumo.insumo) && quantidade == pedidoInsumo.quantidade;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, pedidoCompra, insumo, quantidade);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", pedidoCompra='" + getPedidoCompra() + "'" +
            ", insumo='" + getInsumo() + "'" +
            ", quantidade='" + getQuantidade() + "'" +
            "}";
    }



}
