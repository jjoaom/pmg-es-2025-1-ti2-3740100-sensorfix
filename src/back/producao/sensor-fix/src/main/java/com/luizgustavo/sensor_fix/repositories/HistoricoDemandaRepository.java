package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.HistoricoDemanda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoDemandaRepository extends JpaRepository<HistoricoDemanda, Long> {
}
