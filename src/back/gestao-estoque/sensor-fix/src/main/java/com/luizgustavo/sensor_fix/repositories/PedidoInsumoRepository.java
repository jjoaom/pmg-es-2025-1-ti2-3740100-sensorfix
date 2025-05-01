// PedidoInsumoRepository.java
package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.PedidoInsumo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoInsumoRepository extends JpaRepository<PedidoInsumo, Long> {
    List<PedidoInsumo> findByPedidoCompraId(Long pedidoId);
}