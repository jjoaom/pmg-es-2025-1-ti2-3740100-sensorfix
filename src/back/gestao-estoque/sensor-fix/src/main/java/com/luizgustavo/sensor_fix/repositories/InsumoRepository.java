package com.luizgustavo.sensor_fix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.luizgustavo.sensor_fix.models.Insumo;

//para criar um repository preci passar o meu modelo e o tipo de identificador dele no caso 
//o que identifica o Insumo é o seu id que é do tipo Long//
//anotação para repositorio
@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long> {
    
}
