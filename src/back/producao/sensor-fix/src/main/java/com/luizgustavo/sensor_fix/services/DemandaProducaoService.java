package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.DemandaProducao;
import com.luizgustavo.sensor_fix.repositories.DemandaProducaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DemandaProducaoService {

    @Autowired
    private DemandaProducaoRepository repository;

    public List<DemandaProducao> listarTodos() {
        return repository.findAll();
    }

    public Optional<DemandaProducao> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public DemandaProducao salvar(DemandaProducao demanda) {
        if (demanda.getStatusDemanda() == null) {
            demanda.setStatusDemanda(DemandaProducao.StatusDemanda.CRIADA);
        }

        if (demanda.getDataHoraCriacao() == null) {
            demanda.setDataHoraCriacao(LocalDateTime.now());
        }

        // Vincula a demanda em cada peça defeituosa
        if (demanda.getPecasDefeituosas() != null) {
            demanda.getPecasDefeituosas().forEach(p -> p.setDemanda(demanda));
        }

        return repository.save(demanda);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public DemandaProducao atualizar(Long id, DemandaProducao novaDemanda) {
        return repository.findById(id).map(demandaExistente -> {
            novaDemanda.setId(demandaExistente.getId());

            if (novaDemanda.getPecasDefeituosas() != null) {
                novaDemanda.getPecasDefeituosas().forEach(p -> p.setDemanda(novaDemanda));
            }

            return repository.save(novaDemanda);
        }).orElseThrow(() -> new RuntimeException("Demanda não encontrada com ID: " + id));
    }

}
