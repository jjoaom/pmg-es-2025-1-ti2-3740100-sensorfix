package com.luizgustavo.sensor_fix.controller;

import com.luizgustavo.sensor_fix.models.Revisao;
import com.luizgustavo.sensor_fix.services.RevisaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}