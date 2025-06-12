package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.Revisao;

import com.luizgustavo.sensor_fix.repositories.RevisaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevisaoService {

    private final RevisaoRepository revisaoRepository;

    public RevisaoService(RevisaoRepository revisaoRepository) {
        this.revisaoRepository = revisaoRepository;
    }

    public Revisao salvar(Revisao revisao) {
        return revisaoRepository.save(revisao);
    }

    public List<Revisao> listarTodas() {
        return revisaoRepository.findAll();
    }

    public Revisao buscarPorId(Long id) {
        return revisaoRepository.findById(id).orElse(null);
    }

    public void deletar(Long id) {
        revisaoRepository.deleteById(id);
    }
}