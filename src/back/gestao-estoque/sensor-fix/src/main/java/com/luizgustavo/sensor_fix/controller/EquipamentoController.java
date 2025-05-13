package com.luizgustavo.sensor_fix.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.luizgustavo.sensor_fix.models.Equipamento;
import com.luizgustavo.sensor_fix.models.Equipamento.CreateEquipamento;
import com.luizgustavo.sensor_fix.models.Equipamento.UpdateEquipamento;
import com.luizgustavo.sensor_fix.services.EquipamentoService;

@RestController
@RequestMapping("/equipamentos")
@Validated
public class EquipamentoController {
    
    @Autowired
    private EquipamentoService equipamentoService;

    // Método para buscar equipamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Equipamento> findById(@PathVariable Long id) {
        Equipamento obj = this.equipamentoService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    // Método para criar um novo equipamento
    @PostMapping
    @Validated(CreateEquipamento.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Equipamento obj) {
        this.equipamentoService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    // Método para atualizar um equipamento
    @PutMapping("/{id}")
    @Validated(UpdateEquipamento.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Equipamento obj, @PathVariable Long id) {
        obj.setId(id);
        this.equipamentoService.update(obj);
        return ResponseEntity.noContent().build();
    }

    // Método para excluir um equipamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.equipamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Método para listar todos os equipamentos
    @GetMapping
    public ResponseEntity<List<Equipamento>> listarTodos() {
        List<Equipamento> equipamentos = this.equipamentoService.findAll();
        return ResponseEntity.ok().body(equipamentos);
    }
}
