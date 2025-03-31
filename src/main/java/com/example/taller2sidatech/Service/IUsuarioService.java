package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.Entity.Usuario;

import java.util.Optional;

public interface IUsuarioService {
    Optional<Usuario>findById(Integer id);
    Usuario save(Usuario usuario);
    Optional<Usuario> findByEmail(String email);

}
