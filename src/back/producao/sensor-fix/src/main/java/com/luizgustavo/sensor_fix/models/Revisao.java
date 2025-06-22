package com.luizgustavo.sensor_fix.models;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Revisao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String estadoHardware;

    @Column(length = 2000)
    private String observacoes;

    private String trabalhoARealizar;

    @OneToMany(mappedBy = "revisao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FalhaEncontrada> falhas = new ArrayList<>();

    
    private LocalDate dataRevisao;

    // Getters e Setters
    public LocalDate getDataRevisao() {
        return dataRevisao;
    }

    public void setDataRevisao(LocalDate dataRevisao) {
        this.dataRevisao = dataRevisao;
    }
    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getEstadoHardware() {
        return estadoHardware;
    }

    public void setEstadoHardware(String estadoHardware) {
        this.estadoHardware = estadoHardware;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public String getTrabalhoARealizar() {
        return trabalhoARealizar;
    }

    public void setTrabalhoARealizar(String trabalhoARealizar) {
        this.trabalhoARealizar = trabalhoARealizar;
    }

    public List<FalhaEncontrada> getFalhas() {
        return falhas;
    }

    public void setFalhas(List<FalhaEncontrada> falhas) {
        this.falhas = falhas;
    }
}
