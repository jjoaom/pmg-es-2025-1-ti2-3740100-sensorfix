package com.luizgustavo.sensor_fix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.luizgustavo.sensor_fix.models.Insumo;

//para criar um repository preci passar o meu modelo e o tipo de identificador dele no caso 
//o que identifica o Insumo é o seu id que é do tipo Long//
//anotação para repositorio
@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long> {

    // Sugestões de compra: quantidade abaixo do estoque mínimo
    @Query("SELECT i FROM Insumo i WHERE i.quantidade < i.estoqueMin")
    List<Insumo> findSugestoesDeCompra();
}
