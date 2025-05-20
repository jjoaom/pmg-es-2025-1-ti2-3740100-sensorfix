package com.luizgustavo.sensor_fix.models;

import jakarta.persistence.*;
/**
 *
 * @author joaom
 */
@Entity
public class Peca {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "id", unique = true)
    private long id;
    
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
    
}
