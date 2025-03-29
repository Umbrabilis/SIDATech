package com.example.taller2sidatech.Model.DAO;

import com.example.taller2sidatech.Model.Entity.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICompraDao extends JpaRepository<Compra, Integer> {
}
