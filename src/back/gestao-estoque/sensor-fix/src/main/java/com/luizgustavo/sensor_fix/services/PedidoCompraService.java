// PedidoCompraService.java
package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.PedidoCompra;
import com.luizgustavo.sensor_fix.repositories.PedidoCompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoCompraService {

    @Autowired
    private PedidoCompraRepository repository;

    public List<PedidoCompra> findAll() {
        return repository.findAll();
    }

    public Optional<PedidoCompra> findById(Long id) {
        return repository.findById(id);
    }

    public PedidoCompra save(PedidoCompra pedido) {
        return repository.save(pedido);
    }

    public PedidoCompra update(Long id, PedidoCompra pedidoAtualizado) {
        return repository.findById(id).map(existing -> {
            existing.setIdfornecedor(pedidoAtualizado.getIdfornecedor());
            existing.setData(pedidoAtualizado.getData());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("PedidoCompra não encontrado"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
