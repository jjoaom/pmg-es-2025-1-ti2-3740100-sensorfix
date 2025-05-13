package com.luizgustavo.sensor_fix.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = tabelateste2.TABLE_NAME)
public class tabelateste2 {
    public static final String TABLE_NAME ="tabelateste2";


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "idteste", unique = true)
    private Long id;

     
    @Column(name = "nome", unique = true, nullable = false)
    private String nome;

}
