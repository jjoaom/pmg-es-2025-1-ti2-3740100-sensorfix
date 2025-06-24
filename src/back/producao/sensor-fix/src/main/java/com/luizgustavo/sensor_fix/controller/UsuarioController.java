package com.luizgustavo.sensor_fix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Map;

import com.luizgustavo.sensor_fix.models.Usuario;
import com.luizgustavo.sensor_fix.repositories.UsuarioRepository;

@RestController
@RequestMapping("/users")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repo;

    @Autowired
    private PasswordEncoder encoder;
    @GetMapping
    public List<Map<String, Object>> listar() {
        return repo.findAll().stream()
                .map(usuario -> Map.<String, Object>of(
                        "id", usuario.getId(),
                        "username", usuario.getUsername(),
                        "role", usuario.getRole().name()
                ))
                .toList();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Usuario usuario) {
        if (repo.findByUsername(usuario.getUsername()).isPresent()) {
            return ResponseEntity.status(400).body("Nome de usuário já existe!");
        }

        usuario.setPassword(encoder.encode(usuario.getPassword()));
        return ResponseEntity.ok(repo.save(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return repo.findById(id)
                .map(u -> {
                    u.setUsername(usuario.getUsername());
                    if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
                        u.setPassword(encoder.encode(usuario.getPassword()));
                    }
                    u.setRole(usuario.getRole());
                    repo.save(u);
                    return ResponseEntity.ok(u);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return repo.findById(id)
                .map(u -> {
                    repo.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
