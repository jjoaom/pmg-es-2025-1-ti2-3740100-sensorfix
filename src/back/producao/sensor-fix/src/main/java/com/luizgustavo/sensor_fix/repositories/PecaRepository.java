package com.luizgustavo.sensor_fix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.luizgustavo.sensor_fix.models.Peca;

@Repository
public interface PecaRepository extends JpaRepository<Peca, Long>{
    
}
