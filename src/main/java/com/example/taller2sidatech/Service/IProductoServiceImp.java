package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.IProductoDao;
import com.example.taller2sidatech.Model.Entity.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IProductoServiceImp implements IProductoService {

    @Autowired
    private IProductoDao IProductoDao;

    @Override
    public Producto save(Producto producto) {
        return IProductoDao.save(producto);
    }

    @Override
    public Optional<Producto> get(Integer id) {
        return IProductoDao.findById(id);
    }

    @Override
    public void update(Producto producto) {
        IProductoDao.save(producto);
    }

    @Override
    public void delete(Integer id) {
        IProductoDao.deleteById(id);
    }

    @Override
    public List<Producto> findAll() {
        return IProductoDao.findAll();
    }
}
