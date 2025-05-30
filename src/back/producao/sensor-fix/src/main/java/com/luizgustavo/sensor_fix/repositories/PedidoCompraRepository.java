// PedidoCompraRepository.java
package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.PedidoCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoCompraRepository extends JpaRepository<PedidoCompra, Long> {
}