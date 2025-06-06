package com.luizgustavo.sensor_fix.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import com.luizgustavo.sensor_fix.services.EstoqueDepositoService;
import com.luizgustavo.sensor_fix.models.EstoqueDeposito;
@RestController
@RequestMapping("/estoque-depositos")
public class EstoqueDepositoController {

    @Autowired
    private EstoqueDepositoService service;

    @GetMapping
    public List<EstoqueDeposito> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstoqueDeposito> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EstoqueDeposito criar(@RequestBody EstoqueDeposito estoqueDeposito) {
        return service.criar(estoqueDeposito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstoqueDeposito> atualizar(@PathVariable Long id, @RequestBody EstoqueDeposito estoqueDeposito) {
        try {
            EstoqueDeposito atualizado = service.atualizar(id, estoqueDeposito);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }


    @PatchMapping("/{id}/quantidade")
    public ResponseEntity<EstoqueDeposito> atualizarQuantidade(@PathVariable Long id, @RequestBody Map<String, Integer> payload) {
    int novaQuantidade = payload.get("quantidade");
    return service.atualizarQuantidade(id, novaQuantidade)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}
}
