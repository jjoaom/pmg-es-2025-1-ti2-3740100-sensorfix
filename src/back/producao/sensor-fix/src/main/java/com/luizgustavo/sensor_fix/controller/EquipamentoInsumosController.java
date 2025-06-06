package com.luizgustavo.sensor_fix.controller;


import com.luizgustavo.sensor_fix.models.EquipamentoInsumos;
import com.luizgustavo.sensor_fix.services.EquipamentoInsumosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipamento-insumos")
public class EquipamentoInsumosController {

    @Autowired
    private EquipamentoInsumosService service;

    @GetMapping
    public List<EquipamentoInsumos> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipamentoInsumos> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EquipamentoInsumos create(@RequestBody EquipamentoInsumos equipamentoInsumos) {
        return service.save(equipamentoInsumos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipamentoInsumos> update(@PathVariable Long id, @RequestBody EquipamentoInsumos updated) {
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

    @GetMapping("/por-equipamento/{equipamentoId}")
    public List<EquipamentoInsumos> getByEquipamentoId(@PathVariable Long equipamentoId) {
        return service.findByEquipamentoId(equipamentoId);
    }
}
