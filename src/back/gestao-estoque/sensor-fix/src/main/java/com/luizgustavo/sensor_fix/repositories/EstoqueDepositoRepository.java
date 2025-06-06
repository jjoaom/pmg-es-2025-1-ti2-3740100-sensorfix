package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.EstoqueDeposito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstoqueDepositoRepository extends JpaRepository<EstoqueDeposito, Long> {
    Optional<EstoqueDeposito> findByTipoDeposito(String tipoDeposito);
}
