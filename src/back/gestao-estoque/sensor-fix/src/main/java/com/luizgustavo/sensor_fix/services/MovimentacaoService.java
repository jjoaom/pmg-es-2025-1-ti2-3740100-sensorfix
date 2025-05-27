package com.luizgustavo.sensor_fix.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.luizgustavo.sensor_fix.models.Movimentacao;
import com.luizgustavo.sensor_fix.repositories.MovimentacaoRepository;

@Service
public class MovimentacaoService {
    

    //injetando dependencia
    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    //metodo para buscar movimentações via ID
    public Movimentacao findById(long id){
        //essa variavel Optional singnifica que ela pode ou não receber uma movimentação de fato, isso vai ser descoberto no nosso return 
        Optional<Movimentacao> movimentacao = this.movimentacaoRepository.findById(id);
        return movimentacao.orElseThrow(()-> new RuntimeException("Equipamento não encontrado, id:"+id+""));
    }

    @Transactional // garante que todas as operações feitas dentro do método estejam dentro de uma transação do banco de dados.
    //Se ocorrer algum erro no meio da execução, o Spring faz rollback (desfaz tudo), mantendo a consistência dos dados.
    public Movimentacao create(Movimentacao obj) {
        obj.setId(null); // Garante que será um novo registro e não sobrescreva um novo registro no caso 
        obj = this.movimentacaoRepository.save(obj);
        return obj;
    }

    @Transactional
    public Movimentacao update(Movimentacao obj) {
        Movimentacao newObj = findById(obj.getId());

        newObj.setDestino(obj.getDestino());
        newObj.setOrigem(obj.getOrigem());
        newObj.setDataMovimentacao(obj.getDataMovimentacao());
        

        return this.movimentacaoRepository.save(newObj);
    }

    // Método para excluir um equipamento
    public void delete(Long id) {
        findById(id); // Verifica se existe

        try {
            this.movimentacaoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir pois há entidades relacionadas");
        }
    }

    //metodo para retornar todas as movimentações 
    public List<Movimentacao> findAll() {
        return this.movimentacaoRepository.findAll();
    }

}
