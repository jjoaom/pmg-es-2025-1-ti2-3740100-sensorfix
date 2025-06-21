package com.luizgustavo.sensor_fix.services;

import com.luizgustavo.sensor_fix.models.DemandaProducao;
import com.luizgustavo.sensor_fix.models.Equipamento;
import com.luizgustavo.sensor_fix.models.PecaDefeituosa;
import com.luizgustavo.sensor_fix.repositories.DemandaProducaoRepository;
import com.luizgustavo.sensor_fix.repositories.EquipamentoRepository;
import com.luizgustavo.sensor_fix.repositories.PecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class DemandaProducaoService {

    @Autowired
    private DemandaProducaoRepository repository;

    @Autowired
    private EquipamentoRepository equipamentoRepo;

    @Autowired
    private PecaRepository pecaRepo;

    public List<DemandaProducao> listarTodos() {
        return repository.findAll();
    }

    public Optional<DemandaProducao> buscarPorId(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public DemandaProducao salvar(DemandaProducao demanda) {
        // 1) status/data
        if (demanda.getStatusDemanda() == null)
            demanda.setStatusDemanda(DemandaProducao.StatusDemanda.CRIADA);
        if (demanda.getDataHoraCriacao() == null)
            demanda.setDataHoraCriacao(LocalDateTime.now());


        if (demanda.getEquipamento() == null || demanda.getEquipamento().getId() == null)
            throw new RuntimeException("equipamento.id é obrigatório");
        Long eqId = demanda.getEquipamento().getId();
        Equipamento eq = equipamentoRepo.findById(eqId)
                .orElseThrow(() -> new RuntimeException("Equipamento não encontrado: " + eqId));
        demanda.setEquipamento(eq);


        if (demanda.getPecasDefeituosas() != null) {
            for (PecaDefeituosa pd : demanda.getPecasDefeituosas()) {
                if (pd.getPeca() == null || pd.getPeca().getId() == null)
                    throw new RuntimeException("pecasDefeituosas[].peca.id é obrigatório");
                Long pId = pd.getPeca().getId();
                pd.setPeca(pecaRepo.findById(pId)
                        .orElseThrow(() -> new RuntimeException("Peça não encontrada: " + pId)));
                pd.setDemanda(demanda);
            }
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
