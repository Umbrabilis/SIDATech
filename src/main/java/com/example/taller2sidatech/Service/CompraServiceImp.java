package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.ICompraDao;
import com.example.taller2sidatech.Model.DAO.IDetalleCompraDao;
import com.example.taller2sidatech.Model.Entity.Compra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompraServiceImp implements ICompraService {

    @Autowired
    private ICompraDao compraDao;

    @Override
    public Compra save(Compra compra) {
        return compraDao.save(compra);
    }
}
