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
    public ResponseEntity<?> create(@RequestBody PedidoInsumo item) {
        try {
            PedidoInsumo salvo = service.save(item);
            return ResponseEntity.ok(salvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Erro de dados: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // ou log.error(...);
            return ResponseEntity.status(500).body("Erro interno: " + e.getMessage());
        }
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
