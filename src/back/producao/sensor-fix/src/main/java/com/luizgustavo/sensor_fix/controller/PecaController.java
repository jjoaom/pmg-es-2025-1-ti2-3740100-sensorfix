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

import com.luizgustavo.sensor_fix.models.Peca;
import com.luizgustavo.sensor_fix.models.Peca.CreatePeca;
import com.luizgustavo.sensor_fix.models.Peca.UpdatePeca;
import com.luizgustavo.sensor_fix.services.PecaService;

@RestController
@RequestMapping("pecas")
@Validated
public class PecaController {

    @Autowired
    private PecaService pecaService;

    //Buscar Peça por id
    @GetMapping("/{id}")
    public ResponseEntity<Peca> findById(@PathVariable Long id){
        Peca obj = this.pecaService.findById(id);
        return ResponseEntity.ok().body(obj);
    }
    //Criar nova peça
    @PostMapping
    @Validated(CreatePeca.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Peca obj){
        this.pecaService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    // Atualizar uma peça
    @PutMapping("/{id}")
    @Validated(UpdatePeca.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Peca obj, @PathVariable Long id) {
        obj.setId(id);
        this.pecaService.update(obj);
        return ResponseEntity.noContent().build();
    }

     //Deletar uma peça
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.pecaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Listar todas as peças
    @GetMapping
    public ResponseEntity<List<Peca>> listarTodos() {
        List<Peca> pecas = this.pecaService.findAll();
        return ResponseEntity.ok().body(pecas);
    }
}