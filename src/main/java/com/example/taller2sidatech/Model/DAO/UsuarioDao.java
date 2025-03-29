package com.example.taller2sidatech.Model.DAO;

import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioDao extends JpaRepository<Usuario, Integer> {

}
