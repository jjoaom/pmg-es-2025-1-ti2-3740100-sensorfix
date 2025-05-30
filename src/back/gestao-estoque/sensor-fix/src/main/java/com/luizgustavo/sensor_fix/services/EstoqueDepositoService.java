package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.EstoqueDeposito;
import com.luizgustavo.sensor_fix.repositories.EstoqueDepositoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstoqueDepositoService {

    @Autowired
    private EstoqueDepositoRepository repository;

    public List<EstoqueDeposito> listarTodos() {
        return repository.findAll();
    }

    public Optional<EstoqueDeposito> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public EstoqueDeposito criar(EstoqueDeposito estoqueDeposito) {
        return repository.save(estoqueDeposito);
    }

    public EstoqueDeposito atualizar(Long id, EstoqueDeposito novo) {
        return repository.findById(id).map(existing -> {
            existing.setTipoDeposito(novo.getTipoDeposito());
            existing.setQuantidade(novo.getQuantidade());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Estoque não encontrado com id " + id));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }


    public Optional<EstoqueDeposito> atualizarQuantidade(Long id, int novaQuantidade) {
    return repository.findById(id).map(deposito -> {
        deposito.setQuantidade(novaQuantidade);
        return repository.save(deposito);
    });
}

}
