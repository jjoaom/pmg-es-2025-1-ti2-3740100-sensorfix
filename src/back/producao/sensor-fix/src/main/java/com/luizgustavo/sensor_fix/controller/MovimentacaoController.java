package com.luizgustavo.sensor_fix.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.luizgustavo.sensor_fix.models.Movimentacao;
import com.luizgustavo.sensor_fix.services.MovimentacaoService;

import java.util.List;
//nossobancoDados/movimentacoes/10
@RestController
@RequestMapping("/movimentacoes")
public class MovimentacaoController {

    @Autowired
    private MovimentacaoService movimentacaoService;
//create
    @PostMapping
    public Movimentacao criar(@RequestBody Movimentacao movimentacao) {
        return movimentacaoService.create(movimentacao);
    }
//gettudo
    @GetMapping
    public List<Movimentacao> listar() {
        return movimentacaoService.findAll();
    }
//get
    // Método para buscar equipamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Movimentacao> findById(@PathVariable Long id) {
        Movimentacao obj = this.movimentacaoService.findById(id);
        return ResponseEntity.ok().body(obj);
    }
    //delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        movimentacaoService.delete(id);
        return ResponseEntity.noContent().build(); // HTTP 204
    }
}
