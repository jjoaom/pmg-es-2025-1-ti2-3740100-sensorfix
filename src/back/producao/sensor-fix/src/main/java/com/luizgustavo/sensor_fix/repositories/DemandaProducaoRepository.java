package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.DemandaProducao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandaProducaoRepository extends JpaRepository<DemandaProducao, Long> {
    // 
}
