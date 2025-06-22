package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.DemandaProducao;
import com.luizgustavo.sensor_fix.models.HistoricoDemanda;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

@Repository
public interface DemandaProducaoRepository extends JpaRepository<DemandaProducao, Long> {

	@Query("SELECT d FROM DemandaProducao d LEFT JOIN FETCH d.pecasDefeituosas")
	List<DemandaProducao> findAllComPecas();

	@Query("SELECT d FROM DemandaProducao d LEFT JOIN FETCH d.pecasDefeituosas WHERE d.id = :id")
	Optional<DemandaProducao> findByIdComPecas(Long id);
}
