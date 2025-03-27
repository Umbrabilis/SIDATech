package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.ProductoDao;
import com.example.taller2sidatech.Model.Entity.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductoServiceImp implements ProductoService {

    @Autowired
    private ProductoDao productoDao;

    @Override
    public Producto save(Producto producto) {
        return productoDao.save(producto);
    }

    @Override
    public Optional<Producto> get(Integer id) {
        return productoDao.findById(id);
    }

    @Override
    public void update(Producto producto) {
        productoDao.save(producto);
    }

    @Override
    public void delete(Integer id) {
        productoDao.deleteById(id);
    }
}
