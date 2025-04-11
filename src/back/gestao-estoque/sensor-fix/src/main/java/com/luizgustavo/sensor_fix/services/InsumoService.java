package com.luizgustavo.sensor_fix.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luizgustavo.sensor_fix.models.Insumo;
import com.luizgustavo.sensor_fix.repositories.InsumoRepository;

@Service
public class InsumoService {
    
    @Autowired //avisando que esta instanciando uma extensão e ai seria o construtor da extends
    private InsumoRepository InsumoRepository;


    public Insumo findById(Long id){
        //esse optional serve para, se eu buscar um id que não esta no banco ele não vai retornar NULL e sim "vazio"
        Optional<Insumo> insumo = this.InsumoRepository.findById(id);

        //esse retorno me diz que eu vou retornar um insumo, mas se ele estiver vazio eu retorno uma throw
        return insumo.orElseThrow(()->new RuntimeException(
            "\"Insumo não encotrado!ID: \"+id+\", Tipo\"+ Insumo.class.getName()"
            ));
    }

    //sempre que for fazer alguma alteração no banco faço essa anotation para segurança (create e update)
    //util para inserções 
    @Transactional
    public Insumo create (Insumo obj){
        //vamos setar o id como null para que nuca seja inserido um mesmo id e o create meio que vire um edit 
        obj.setId(null);
        obj = this.InsumoRepository.save(obj);
        return obj;
        

    }


    @Transactional
    public Insumo update(Insumo obj){

        //vamos garantir que esse usuáro exite e assim pegaremos ele no banco de dados e faremos somente alterações nos campos necessários , se não existir ja cai na excessão do find
        Insumo newObj = findById(obj.getId());

        newObj.setNome(obj.getNome());
        newObj.setPeso(obj.getPeso());
        newObj.setEstoqueMin(obj.getEstoqueMin());
        newObj.setQuantidade(obj.getQuantidade());
        newObj.setEndereco(obj.getEndereco());
        newObj.setDeposito(obj.getDeposito());

        return this.InsumoRepository.save(newObj);
    }

    public void delete (Long id){
        findById(id);

        // fazendo essa logica por que o usuário não pode ser deletado se estiver relacionado com outras coisas;
        try {
            this.InsumoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir pois há entidades relacionadas");
        }

    }


}
