package com.luizgustavo.sensor_fix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


import com.luizgustavo.sensor_fix.models.Peca;
import com.luizgustavo.sensor_fix.repositories.PecaRepository;

@Service
public class PecaService {
    @Autowired
    private PecaRepository pecaRepository;    

    // Buscar Peça por ID
    public Peca findById(Long id) {
    return pecaRepository.findById(id)
        .orElseThrow(() -> 
            new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Peça não encontrada (ID: " + id + ")"
            )
        );
    }
    //Criar nova Peça
    @Transactional
    public Peca create(Peca obj){
        obj.setId(null);
        obj = this.pecaRepository.save(obj);
        return obj;
    }
    //Atualizar peça existente
    @Transactional
    public Peca update(Peca obj){
        Peca newObj = findById(obj.getId());

        newObj.setNome(obj.getNome());
        newObj.setDescricao(obj.getDescricao());
        newObj.setQtd(obj.getQtd());
        return this.pecaRepository.save(newObj);
    }
    //Excluir Peça
    public void delete(Long id) {
    findById(id);
    try {
        pecaRepository.deleteById(id);
    } catch (DataIntegrityViolationException e) {
        throw new ResponseStatusException(
            HttpStatus.CONFLICT,
            "Não é possível excluir: existem entidades relacionadas."
        );
    }
}

    //Buscar todas as peças
    public List<Peca> findAll(){
        return this.pecaRepository.findAll();
    }
}
