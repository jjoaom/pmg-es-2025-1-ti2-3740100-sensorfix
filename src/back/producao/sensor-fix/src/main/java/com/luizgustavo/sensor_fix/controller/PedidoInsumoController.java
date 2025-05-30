// PedidoInsumoController.java
package com.luizgustavo.sensor_fix.controller;

import com.luizgustavo.sensor_fix.models.PedidoInsumo;
import com.luizgustavo.sensor_fix.services.PedidoInsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido-insumos")
public class PedidoInsumoController {

    @Autowired
    private PedidoInsumoService service;

    @GetMapping
    public List<PedidoInsumo> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoInsumo> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/por-pedido/{pedidoId}")
    public List<PedidoInsumo> getByPedido(@PathVariable Long pedidoId) {
        return service.findByPedidoId(pedidoId);
    }

    @PostMapping
    public PedidoInsumo create(@RequestBody PedidoInsumo item) {
        return service.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoInsumo> update(@PathVariable Long id, @RequestBody PedidoInsumo updated) {
        try {
            return ResponseEntity.ok(service.update(id, updated));
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
