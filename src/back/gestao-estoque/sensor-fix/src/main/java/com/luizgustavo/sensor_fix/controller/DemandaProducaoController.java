package com.luizgustavo.sensor_fix.controller;

import com.luizgustavo.sensor_fix.models.DemandaProducao;
import com.luizgustavo.sensor_fix.services.DemandaProducaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/demandas")
public class DemandaProducaoController {

    @Autowired
    private DemandaProducaoService service;

    @GetMapping
    public ResponseEntity<List<DemandaProducao>> listarTodas() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandaProducao> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DemandaProducao> criar(@Valid @RequestBody DemandaProducao demanda) {
        return ResponseEntity.ok(service.salvar(demanda));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DemandaProducao> atualizar(@PathVariable Long id, @Valid @RequestBody DemandaProducao novaDemanda) {
        try {
            return ResponseEntity.ok(service.atualizar(id, novaDemanda));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
