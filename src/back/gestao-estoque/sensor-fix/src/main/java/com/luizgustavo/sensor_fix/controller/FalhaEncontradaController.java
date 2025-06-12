package com.luizgustavo.sensor_fix.controller;

import com.luizgustavo.sensor_fix.models.FalhaEncontrada;
import com.luizgustavo.sensor_fix.services.FalhaEncontradaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/falhas")
public class FalhaEncontradaController {

    private final FalhaEncontradaService falhaService;

    public FalhaEncontradaController(FalhaEncontradaService falhaService) {
        this.falhaService = falhaService;
    }

    @PostMapping
    public FalhaEncontrada criar(@RequestBody FalhaEncontrada falha) {
        return falhaService.salvar(falha);
    }

    @GetMapping("/revisao/{idRevisao}")
    public List<FalhaEncontrada> listarPorRevisao(@PathVariable Long idRevisao) {
        return falhaService.listarPorRevisao(idRevisao);
    }

    @GetMapping("/{id}")
    public FalhaEncontrada buscarPorId(@PathVariable Long id) {
        return falhaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public FalhaEncontrada atualizar(@PathVariable Long id, @RequestBody FalhaEncontrada novaFalha) {
        FalhaEncontrada falha = falhaService.buscarPorId(id);
        if (falha != null) {
            falha.setSintomaAcusado(novaFalha.getSintomaAcusado());
            falha.setFalhaEncontrada(novaFalha.getFalhaEncontrada());
            falha.setCausaProvavel(novaFalha.getCausaProvavel());
            falha.setAcaoASerTomada(novaFalha.getAcaoASerTomada());
            return falhaService.salvar(falha);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        falhaService.deletar(id);
    }
}