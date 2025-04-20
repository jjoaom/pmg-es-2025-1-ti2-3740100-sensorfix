package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.EquipamentoInsumos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipamentoInsumosRepository extends JpaRepository<EquipamentoInsumos, Long> {
}