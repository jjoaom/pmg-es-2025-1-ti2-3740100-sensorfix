package com.luizgustavo.sensor_fix.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = EquipamentoInsumos.TABLE_NAME)
public class EquipamentoInsumos {
    public static final String TABLE_NAME = "equipamento_insumos";



    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    


    @ManyToOne //fazendo a foreignkey
    @JoinColumn(name = "equipamento_id", nullable = false)
    private Equipamento equipamento;

    @ManyToOne//fazendo a foreignkey
    @JoinColumn(name = "insumo_id", nullable = false)
    private Insumo insumo;

    @Column(nullable = false)
    private int quantidade;


    public EquipamentoInsumos() {
    }

    public EquipamentoInsumos(Equipamento equipamento, Insumo insumo, int quantidade) {
        this.equipamento = equipamento;
        this.insumo = insumo;
        this.quantidade = quantidade;
    }



    public Equipamento getEquipamento() {
        return this.equipamento;
    }

    public void setEquipamento(Equipamento equipamento) {
        this.equipamento = equipamento;
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
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }

}
