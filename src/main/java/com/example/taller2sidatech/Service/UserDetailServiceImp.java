package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.Entity.Usuario;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImp implements UserDetailsService {

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    @Lazy
    private BCryptPasswordEncoder bCrypt;

    @Autowired
    HttpSession session;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> optionalUsuario = usuarioService.findByEmail(username);
        if (optionalUsuario.isPresent()) {
            session.setAttribute("idusuario", optionalUsuario.get().getId());
            Usuario usuario = optionalUsuario.get();

            // Construir usuario con authorities en lugar de roles
            return User.builder()
                    .username(usuario.getEmail())
                    .password(usuario.getPassword())
                    .authorities(usuario.getTipo()) // Usar la autoridad directamente
                    .build();
        } else {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
    }
}