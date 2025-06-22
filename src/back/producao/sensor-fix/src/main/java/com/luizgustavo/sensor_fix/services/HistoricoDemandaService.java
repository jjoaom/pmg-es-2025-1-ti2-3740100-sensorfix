package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.HistoricoDemanda;
import com.luizgustavo.sensor_fix.repositories.HistoricoDemandaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HistoricoDemandaService {

    @Autowired
    private HistoricoDemandaRepository repository;

    public List<HistoricoDemanda> listarTodos() {
        return repository.findAll();
    }

    public Optional<HistoricoDemanda> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public HistoricoDemanda salvar(HistoricoDemanda demanda) {
        if (demanda.getDataHora() == null) {
            demanda.setDataHora(LocalDateTime.now());
        }
        return repository.save(demanda);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public HistoricoDemanda atualizar(Long id, HistoricoDemanda novaDemanda) {
        return repository.findById(id).map(demandaExistente -> {
            novaDemanda.setId(demandaExistente.getId());
            return repository.save(novaDemanda);
        }).orElseThrow(() -> new RuntimeException("Demanda não encontrada com ID: " + id));
    }

    public List<HistoricoDemanda> buscarPorDemandaId(Long demandaId) {
        return repository.findByDemandaIdOrderByDataHoraAsc(demandaId);
    }

}
