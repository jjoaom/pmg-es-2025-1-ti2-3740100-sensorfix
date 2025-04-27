package com.luizgustavo.sensor_fix.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luizgustavo.sensor_fix.models.Equipamento;
import com.luizgustavo.sensor_fix.repositories.EquipamentoRepository;

@Service
public class EquipamentoService {
    
    @Autowired
    private EquipamentoRepository equipamentoRepository;

    // Método para buscar um equipamento por ID
    public Equipamento findById(Long id) {
        Optional<Equipamento> equipamento = this.equipamentoRepository.findById(id);
        return equipamento.orElseThrow(() -> 
            new RuntimeException("Equipamento não encontrado! ID: " + id + ", Tipo: " + Equipamento.class.getName()));
    }

    // Método para criar um novo equipamento
    @Transactional
    public Equipamento create(Equipamento obj) {
        obj.setId(null); // Garante que será um novo registro
        obj = this.equipamentoRepository.save(obj);
        return obj;
    }

    // Método para atualizar um equipamento existente
    @Transactional
    public Equipamento update(Equipamento obj) {
        Equipamento newObj = findById(obj.getId());

        newObj.setNome(obj.getNome());
        newObj.setPeso(obj.getPeso());
        newObj.setEstoqueMin(obj.getEstoqueMin());
        newObj.setQuantidade(obj.getQuantidade());
        newObj.setEndereco(obj.getEndereco());
        newObj.setDeposito(obj.getDeposito());

        return this.equipamentoRepository.save(newObj);
    }

    // Método para excluir um equipamento
    public void delete(Long id) {
        findById(id); // Verifica se existe

        try {
            this.equipamentoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir pois há entidades relacionadas");
        }
    }

    // Novo método para buscar todos os equipamentos
    public List<Equipamento> findAll() {
        return this.equipamentoRepository.findAll();
    }
}
