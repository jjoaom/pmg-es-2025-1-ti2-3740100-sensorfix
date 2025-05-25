package main.java.com.luizgustavo.sensor_fix.services;

import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luizgustavo.sensor_fix.models.Peca;
import com.luizgustavo.sensor_fix.repositories.PecaRepository;

@Service
public class PecaService {
    @Autowired
    private PecaRepository pecaRepository;    

    // Buscar Peça por ID
    public Peca findById(Long id){
        Optional<Peca> peca = this.pecaRepository.findById(id);
        return peca.orElseThrow(() ->
            new RuntimeErrorException("Peça não encontrada ou não existente. ID: " + id + ", Tipo: " + Peca.class.getName()));
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
    public void delete(Long id){
        findById(id);

        try{
            this.pecaRepository.deleteById(id);
        } catch (Exception e){
            throw new RuntimeException("Não é possível excluir pois há entidades relacionadas.")
        }
    }

    //Buscar todas as peças
    public List<Peca> findAll(){
        return this.pecaRepository.findAll();
    }
}
