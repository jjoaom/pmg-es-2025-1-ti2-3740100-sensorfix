package com.luizgustavo.sensor_fix.repositories;

import com.luizgustavo.sensor_fix.models.FalhaEncontrada;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FalhaEncontradaRepository extends JpaRepository<FalhaEncontrada, Long> {
    List<FalhaEncontrada> findByRevisaoId(Long revisaoId);
}