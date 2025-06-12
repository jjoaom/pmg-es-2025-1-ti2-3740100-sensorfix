package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.FalhaEncontrada;
import com.luizgustavo.sensor_fix.repositories.FalhaEncontradaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FalhaEncontradaService {

    private final FalhaEncontradaRepository repository;

    public FalhaEncontradaService(FalhaEncontradaRepository repository) {
        this.repository = repository;
    }

    public FalhaEncontrada salvar(FalhaEncontrada falha) {
        return repository.save(falha);
    }

    public List<FalhaEncontrada> listarPorRevisao(Long idRevisao) {
        return repository.findByRevisaoId(idRevisao);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public FalhaEncontrada buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<FalhaEncontrada> listarTodas() {
        return repository.findAll();
    }
}
