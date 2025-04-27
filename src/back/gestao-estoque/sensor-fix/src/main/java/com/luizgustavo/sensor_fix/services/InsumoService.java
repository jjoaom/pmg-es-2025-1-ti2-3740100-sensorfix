package com.luizgustavo.sensor_fix.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luizgustavo.sensor_fix.models.Insumo;
import com.luizgustavo.sensor_fix.repositories.InsumoRepository;

@Service
public class InsumoService {

    @Autowired
    private InsumoRepository insumoRepository; // minúsculo o nome da variável, por boas práticas

    public List<Insumo> findAll() {
        return insumoRepository.findAll();
    }

    public Insumo findById(Long id) {
        Optional<Insumo> insumo = this.insumoRepository.findById(id);
        return insumo.orElseThrow(() -> new RuntimeException(
            "Insumo não encontrado! ID: " + id + ", Tipo: " + Insumo.class.getName()
        ));
    }

    @Transactional
    public Insumo create(Insumo obj) {
        obj.setId(null); // garantir que é inserção nova
        obj = this.insumoRepository.save(obj);
        return obj;
    }

    @Transactional
    public Insumo update(Insumo obj) {
        Insumo newObj = findById(obj.getId());

        newObj.setNome(obj.getNome());
        newObj.setPeso(obj.getPeso());
        newObj.setEstoqueMin(obj.getEstoqueMin());
        newObj.setQuantidade(obj.getQuantidade());
        newObj.setEndereco(obj.getEndereco());
        newObj.setDeposito(obj.getDeposito());

        return this.insumoRepository.save(newObj);
    }

    public void delete(Long id) {
        findById(id);
        try {
            this.insumoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir, pois há entidades relacionadas");
        }
    }
}
