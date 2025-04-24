package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.EquipamentoInsumos;
import com.luizgustavo.sensor_fix.repositories.EquipamentoInsumosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipamentoInsumosService {

    @Autowired
    private EquipamentoInsumosRepository repository;

    public List<EquipamentoInsumos> findAll() {
        return repository.findAll();
    }

    public Optional<EquipamentoInsumos> findById(Long id) {
        return repository.findById(id);
    }

    public EquipamentoInsumos save(EquipamentoInsumos equipamentoInsumos) {
        return repository.save(equipamentoInsumos);
    }

    public EquipamentoInsumos update(Long id, EquipamentoInsumos updated) {
        return repository.findById(id).map(existing -> {
            existing.setEquipamento(updated.getEquipamento());
            existing.setInsumo(updated.getInsumo());
            existing.setQuantidade(updated.getQuantidade());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("EquipamentoInsumo not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<EquipamentoInsumos> findByEquipamentoId(Long equipamentoId) {
        return repository.findByEquipamentoId(equipamentoId);
    }
}