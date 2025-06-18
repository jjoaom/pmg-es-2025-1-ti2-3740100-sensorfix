/* package com.luizgustavo.sensor_fix.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppSecurityConfig {

    @Value("${spring.security.user.name}")
    private String username;

    @Value("${spring.security.user.password}")
    private String password;

    // Getters (se quiser usar em outro lugar)
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // Você também pode usar um método @PostConstruct para testar, tipo:
    // @PostConstruct
    // public void init() {
    //     System.out.println("Usuário: " + username + ", Senha: " + password);
    // }
}
 */