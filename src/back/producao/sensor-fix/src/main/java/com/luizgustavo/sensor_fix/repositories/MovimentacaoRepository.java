package com.luizgustavo.sensor_fix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luizgustavo.sensor_fix.models.Movimentacao;
//nesse caso  passamos a tabela movimentação através da model e tambem o tipo da chave pk atrelada a essa model no caso 
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long>{

    
} 