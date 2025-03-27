package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.Entity.Producto;

import java.util.Optional;

public interface ProductoService {
    public Producto save(Producto producto);
    public Optional<Producto> get(Integer id);
    public void update(Producto producto);
    public void delete(Integer id);
}
