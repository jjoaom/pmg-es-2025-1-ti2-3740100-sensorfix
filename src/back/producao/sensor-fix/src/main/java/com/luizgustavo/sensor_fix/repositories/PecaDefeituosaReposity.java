package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.PecaDefeituosa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PecaDefeituosaReposity extends JpaRepository<PecaDefeituosa, Long>{
    
}


