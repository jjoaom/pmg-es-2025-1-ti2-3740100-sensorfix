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

import com.luizgustavo.sensor_fix.models.Insumo;
import com.luizgustavo.sensor_fix.models.Insumo.CreateInsumo;
import com.luizgustavo.sensor_fix.models.Insumo.UpdateInsumo;
import com.luizgustavo.sensor_fix.services.InsumoService;

@RestController
@RequestMapping("/insumo")
@Validated
public class InsumoController {

    @Autowired
    private InsumoService insumoService;

    @GetMapping
    public ResponseEntity<List<Insumo>> findAll() {
        List<Insumo> lista = insumoService.findAll();
        return ResponseEntity.ok().body(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insumo> findById(@PathVariable Long id) {
        Insumo obj = this.insumoService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    @Validated(CreateInsumo.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Insumo obj) {
        this.insumoService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    @Validated(UpdateInsumo.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Insumo obj, @PathVariable Long id) {
        obj.setId(id);
        this.insumoService.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.insumoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/sugestoes-compra")
    public ResponseEntity<List<Insumo>> listarSugestoesDeCompra() {
    List<Insumo> sugestoes = this.insumoService.listarSugestoesDeCompra();
    return ResponseEntity.ok().body(sugestoes);
}
}
