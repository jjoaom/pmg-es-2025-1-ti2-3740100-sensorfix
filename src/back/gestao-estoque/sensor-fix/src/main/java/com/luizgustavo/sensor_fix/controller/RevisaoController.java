package com.luizgustavo.sensor_fix.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luizgustavo.sensor_fix.models.Revisao;
import com.luizgustavo.sensor_fix.services.RevisaoService;

@RestController
@RequestMapping("/revisoes")
public class RevisaoController {

    private final RevisaoService revisaoService;

    public RevisaoController(RevisaoService revisaoService) {
        this.revisaoService = revisaoService;
    }

    @PostMapping
    public Revisao criar(@RequestBody Revisao revisao) {
        return revisaoService.salvar(revisao);
    }

    @GetMapping
    public List<Revisao> listarTodas() {
        return revisaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public Revisao buscarPorId(@PathVariable Long id) {
        return revisaoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Revisao atualizar(@PathVariable Long id, @RequestBody Revisao revisaoAtualizada) {
        Revisao revisao = revisaoService.buscarPorId(id);
        if (revisao != null) {
            revisao.setEstadoHardware(revisaoAtualizada.getEstadoHardware());
            revisao.setObservacoes(revisaoAtualizada.getObservacoes());
            revisao.setTrabalhoARealizar(revisaoAtualizada.getTrabalhoARealizar());
            return revisaoService.salvar(revisao);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        revisaoService.deletar(id);
    }

    // RevisaoController.java
    @GetMapping("/com-falhas")
        public List<Revisao> listarRevisoesComFalhas() {
        return revisaoService.listarRevisoesComFalhas();
    }
}