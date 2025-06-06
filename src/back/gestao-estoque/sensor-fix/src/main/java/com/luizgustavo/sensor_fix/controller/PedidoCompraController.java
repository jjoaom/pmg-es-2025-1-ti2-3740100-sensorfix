// PedidoCompraController.java
package com.luizgustavo.sensor_fix.controller;

import com.luizgustavo.sensor_fix.models.PedidoCompra;
import com.luizgustavo.sensor_fix.services.PedidoCompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoCompraController {

    @Autowired
    private PedidoCompraService service;

    @GetMapping
    public List<PedidoCompra> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoCompra> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PedidoCompra create(@RequestBody PedidoCompra pedido) {
        return service.save(pedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoCompra> update(@PathVariable Long id, @RequestBody PedidoCompra pedidoAtualizado) {
        try {
            return ResponseEntity.ok(service.update(id, pedidoAtualizado));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
