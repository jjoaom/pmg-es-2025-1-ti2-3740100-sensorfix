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
    public List<Usuario> listar() {
        return repo.findAll();
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
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario u = repo.findById(id).orElseThrow();
        u.setUsername(usuario.getUsername());
        u.setPassword(encoder.encode(usuario.getPassword()));
        u.setRole(usuario.getRole());
        return repo.save(u);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
