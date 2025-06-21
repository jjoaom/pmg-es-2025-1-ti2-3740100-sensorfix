package com.luizgustavo.sensor_fix.services;

import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import com.luizgustavo.sensor_fix.models.Role;
import java.security.Key;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Service
public class JwtService {


    private static final Key KEY;

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.KEY = Keys.hmacShaKeyFor(Base64.getEncoder().encodeToString(secret.getBytes()).getBytes());
    }


    public String generateToken(String username, Role role) {
    return Jwts.builder()
            .setSubject(username)
            .claim("role", role.name())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora
            .signWith(KEY, SignatureAlgorithm.HS256)
            .compact();
}


    public Claims extractClaims(String token) {
    try {
        return Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token).getBody();
    } catch (Exception e) {
        throw new IllegalStateException("Token inválido ou expirado.");
    }
}


    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public boolean isTokenValid(String token) {
        return !extractClaims(token).getExpiration().before(new Date());
    }
}
