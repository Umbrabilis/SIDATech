package com.example.taller2sidatech.Model.DAO;

import com.example.taller2sidatech.Model.Entity.DetalleCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDetalleCompraDao extends JpaRepository<DetalleCompra, Integer> {
}
