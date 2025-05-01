// PedidoInsumoService.java
package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.PedidoInsumo;
import com.luizgustavo.sensor_fix.repositories.PedidoInsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoInsumoService {

    @Autowired
    private PedidoInsumoRepository repository;

    public List<PedidoInsumo> findAll() {
        return repository.findAll();
    }

    public Optional<PedidoInsumo> findById(Long id) {
        return repository.findById(id);
    }

    public List<PedidoInsumo> findByPedidoId(Long pedidoId) {
        return repository.findByPedidoCompraId(pedidoId);
    }

    public PedidoInsumo save(PedidoInsumo item) {
        return repository.save(item);
    }

    public PedidoInsumo update(Long id, PedidoInsumo updated) {
        return repository.findById(id).map(existing -> {
            existing.setInsumo(updated.getInsumo());
            existing.setQuantidade(updated.getQuantidade());
            existing.setPedidoCompra(updated.getPedidoCompra());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("PedidoInsumo não encontrado"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
