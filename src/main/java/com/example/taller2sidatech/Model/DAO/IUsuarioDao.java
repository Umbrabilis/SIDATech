package com.example.taller2sidatech.Model.DAO;

import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUsuarioDao extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);


}
