package com.luizgustavo.sensor_fix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luizgustavo.sensor_fix.models.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}
