package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.EquipamentoInsumos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipamentoInsumosRepository extends JpaRepository<EquipamentoInsumos, Long> {
    List<EquipamentoInsumos> findByEquipamentoId(Long equipamentoId);
}
