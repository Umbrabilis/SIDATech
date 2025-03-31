package com.example.taller2sidatech.Model.DAO;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICompraDao extends JpaRepository<Compra, Integer> {
    List<Compra> findByUsuario(Usuario usuario);

}
